import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { setCredentials, logout } from "@/app/redux/features/slices/authSlice";

import { getInjectedStore } from "./injectStore";

const baseURL = "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getInjectedStore()?.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refreshToken");
        const res = await api.post(`/auth/refresh`, {
          token: refreshToken,
        });

        const store = getInjectedStore();
        if (store) {
          store.dispatch(
            setCredentials({
              user: store.getState().auth.user!,
              accessToken: res.data.accessToken,
            })
          );
        }

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${res.data.accessToken}`,
        };

        return api(originalRequest);
      } catch (err) {
        handleLogout();
        console.log(err);
      }
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
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// Call this function when logging out
export const handleLogout = () => {
  const store = getInjectedStore();
  store?.dispatch(logout());

  Cookies.remove("refreshToken");
  Cookies.remove("accessToken");

  window.location.pathname = "/login";
};

export default api;
