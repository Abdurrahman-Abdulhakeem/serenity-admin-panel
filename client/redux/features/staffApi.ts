import { createApi } from "@reduxjs/toolkit/query/react";
import { Staff, StaffResponse } from "../../types/staff";
import { axiosBaseQuery } from "@/lib/axios";

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Staff"],
  endpoints: (builder) => ({
    getStaff: builder.query<StaffResponse, { page?: number; keyword?: string }>({
      query: ({ page = 1, keyword = ""}) => ({
        url: "/staffs",
        method: "get",
        params: { page, keyword }
      }),
      providesTags: ["Staff"],
    }),
    addStaff: builder.mutation<void, Partial<Staff>>({
      query: (data) => ({
        url: "staffs",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Staff"],
    }),
    updateStaff: builder.mutation<void, { id: string; data: Partial<Staff> }>({
      query: ({ id, data }) => ({
        url: `staffs/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Staff"],
    }),
    deleteStaff: builder.mutation<void, string>({
      query: (id) => ({
        url: `staffs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff"],
    }),
  }),
});

export const {
  useGetStaffQuery,
  useAddStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = staffApi;
