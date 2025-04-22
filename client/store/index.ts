import { configureStore } from "@reduxjs/toolkit";

import { staffApi } from "@/redux/features/staffApi";
import { authApi } from "@/redux/features/authApi";

import authReducer from "@/redux/features/slices/authSlice";
import { departmentApi } from "@/redux/features/departmentApi";

export const rootReducer = {
  auth: authReducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [departmentApi.reducerPath]: departmentApi.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      staffApi.middleware,
      authApi.middleware,
      departmentApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
