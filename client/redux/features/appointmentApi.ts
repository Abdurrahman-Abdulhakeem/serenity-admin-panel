import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/lib/axios';
import { Appointment, AppointmentResponse } from '@/types/appointment';

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Appointment'],
  endpoints: (builder) => ({
    getAppointments: builder.query<
      AppointmentResponse,
      { page?: number; keyword?: string; status?: string }
    >({
      query: ({ page = 1, keyword = '', status = '' }) => ({
        url: '/appointments',
        method: 'GET',
        params: { page, keyword, status },
      }),
      providesTags: ['Appointment'],
    }),

    createAppointment: builder.mutation<void, Partial<Appointment>>({
      query: (data) => ({
        url: '/appointments',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Appointment'],
    }),

    updateAppointmentStatus: builder.mutation<
      void,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/appointments/${id}`,
        method: 'PUT',
        data: { status },
      }),
      invalidatesTags: ['Appointment'],
    }),

    deleteAppointment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Appointment'],
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentStatusMutation,
  useDeleteAppointmentMutation,
} = appointmentApi;
