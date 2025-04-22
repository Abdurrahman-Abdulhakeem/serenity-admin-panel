import { setCredentials } from "@/redux/features/slices/authSlice";
import { getInjectedStore } from "./injectStore";

export const rehydrateAuth = () => {
  const store = getInjectedStore();

  if (typeof window === "undefined") return;

  const user = localStorage.getItem("user-serenity");
  const accessToken = localStorage.getItem("serenity-accessToken");

  if (store) {
    // if it's already set in Redux, skip it
    const state = store.getState().auth;
    if (state.userData && state.accessToken) return;

    if (user && accessToken) {
      store.dispatch(
        setCredentials({
          userData: JSON.parse(user),
          accessToken,
        })
      );
    }
  }
};
