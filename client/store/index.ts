import { configureStore } from "@reduxjs/toolkit";

import { staffApi } from "@/redux/features/staffApi";
import { authApi } from "@/redux/features/authApi";

import authReducer from "@/redux/features/slices/authSlice";
import { departmentApi } from "@/redux/features/departmentApi";
import { appointmentApi } from "@/redux/features/appointmentApi";
import { dashboardApi } from "@/redux/features/dashboardApi";

export const rootReducer = {
  auth: authReducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [departmentApi.reducerPath]: departmentApi.reducer,
  [appointmentApi.reducerPath]: appointmentApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      staffApi.middleware,
      authApi.middleware,
      departmentApi.middleware,
      appointmentApi.middleware,
      dashboardApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
