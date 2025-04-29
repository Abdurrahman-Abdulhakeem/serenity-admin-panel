import type { AppDispatch, RootState } from "@/store/types";

let _store: {
  getState: () => RootState;
  dispatch: AppDispatch;
} | null = null;

export const injectStore = (store: typeof _store) => {
  _store = store;
};

export const getInjectedStore = () => _store;

