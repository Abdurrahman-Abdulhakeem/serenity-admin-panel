import { axiosBaseQuery } from "@/lib/axios";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
