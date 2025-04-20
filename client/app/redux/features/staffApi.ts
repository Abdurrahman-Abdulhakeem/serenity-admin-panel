import { createApi } from "@reduxjs/toolkit/query/react";
import { Staff } from "./slices/staffSlice";
import { axiosBaseQuery } from "@/libs/axios";

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Staff"],
  endpoints: (builder) => ({
    getStaff: builder.query<Staff[], void>({
      query: () => ({
        url: "/staff",
        method: "get",
      }),
      providesTags: ["Staff"],
    }),
    addStaff: builder.mutation<void, Partial<Staff>>({
      query: (data) => ({
        url: "staff",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Staff"],
    }),
    updateStaff: builder.mutation<void, { id: string; data: Partial<Staff> }>({
      query: ({ id, data }) => ({
        url: `staff/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Staff"],
    }),
    deleteStaff: builder.mutation<void, string>({
      query: (id) => ({
        url: `staff/${id}`,
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
