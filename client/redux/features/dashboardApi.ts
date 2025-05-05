import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/axios";
import { DashboardStats } from "@/types/dashboard";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => ({
        url: "/analytics/dashboard",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
