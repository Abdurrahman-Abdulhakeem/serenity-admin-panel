import { configureStore } from "@reduxjs/toolkit";

import { staffApi } from "@/app/redux/features/staffApi";
import { authApi } from "@/app/redux/features/authApi";

import authReducer from "../app/redux/features/slices/authSlice";

export const rootReducer = {
  auth: authReducer,
  [staffApi.reducerPath]: staffApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(staffApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
