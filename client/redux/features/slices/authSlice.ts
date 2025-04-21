import { RootState } from "@/store/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  userData : {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    } | null;
  }

  accessToken: string | null;
}

const initialState: AuthState = {
  userData:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user-serenity") || "null")
      : null,
  accessToken:
    typeof window !== "undefined"
      ? localStorage.getItem("serenity-accessToken")
      : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.userData = action.payload.userData;
      state.accessToken = action.payload.accessToken;

      localStorage.setItem(
        "user-serenity",
        JSON.stringify(action.payload.userData)
      );
      localStorage.setItem(
        "serenity-accessToken",
        action.payload.accessToken as string
      );
    },
    logout: (state) => {
      state.userData.user = null;
      state.accessToken = null;

      localStorage.removeItem("user-serenity");
      localStorage.removeItem("serenity-accessToken");
    },
  },
});


export const getAuthState = (state: RootState) => state.auth;
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
