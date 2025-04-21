import { configureStore } from "@reduxjs/toolkit";

import { staffApi } from "@/redux/features/staffApi";
import { authApi } from "@/redux/features/authApi";

import authReducer from "@/redux/features/slices/authSlice";

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
