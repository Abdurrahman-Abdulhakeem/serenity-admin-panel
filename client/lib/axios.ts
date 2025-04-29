import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { setCredentials, logout } from "@/redux/features/slices/authSlice";

import { getInjectedStore } from "./injectStore";
import { handleApiError } from "./error";

const baseURL = "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const store = getInjectedStore();
  const token = store?.getState().auth.accessToken;

  if (!token) return config;

  const user = jwtDecode<{ exp: number }>(token);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  const refreshToken = Cookies.get("refreshToken");
  if (!refreshToken) {
    handleLogout();
    return config;
  }

  try {
    const res = await axios.post(`${baseURL}/auth/refresh`, {
      token: refreshToken,
    });

    const newAccessToken = res.data.accessToken;
    if (newAccessToken && store?.getState().auth.userData) {
      store?.dispatch(
        setCredentials({
          userData: store.getState().auth.userData,
          accessToken: newAccessToken,
        })
      );
    }

    config.headers.Authorization = `Bearer ${newAccessToken}`;
  } catch (err) {
    handleLogout();
    console.error("Failed to refresh token:", err);
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      handleLogout();
    }

    return Promise.reject(error);
  }
);

// Use axiosInstance api to intercept redux query with credentials.
export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "get", data, params }) => {
    try {
      const result = await api({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      console.log(err);
      handleApiError(err);

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const handleLogout = () => {
  const store = getInjectedStore();
  store?.dispatch(logout());

  Cookies.remove("refreshToken");
  Cookies.remove("accessToken");

  window.location.pathname = "/login";
};

export default api;
