import { axiosBaseQuery } from "@/lib/axios";
import { Department, DepartmentResponse } from "@/types/department";
import { createApi } from "@reduxjs/toolkit/query/react";

export const departmentApi = createApi({
  reducerPath: "departmentApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Department"],
  endpoints: (builder) => ({
    getDepartments: builder.query<
      DepartmentResponse,
      { page: number; keyword: string }
    >({
      query: ({ page = 1, keyword = "" }) => ({
        url: "departments",
        method: "GET",
        params: { page, keyword },
      }),
      providesTags: ["Department"],
    }),
    createDepartment: builder.mutation<void, Partial<Department>>({
      query: (data) => ({
        url: "departments",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Department"],
    }),
    updateDepartment: builder.mutation<
      void,
      { id: string; data: Partial<Department> }
    >({
      query: ({ id, ...data }) => ({
        url: `departments/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: ["Department"],
    }),
    deleteDepartment: builder.mutation<void, string>({
      query: (id) => ({
        url: `departments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Department"],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentApi;
