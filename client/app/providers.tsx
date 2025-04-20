"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import { injectStore } from "@/libs/injectStore";

injectStore(store); // inject store for axios access

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {" "}
        {children}
    </Provider>
  );
}
