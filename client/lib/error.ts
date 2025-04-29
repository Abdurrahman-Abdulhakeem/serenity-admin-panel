import { AxiosError } from "axios";
import { showError } from "./toastUtils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleApiError(error: AxiosError<any>) {
  let errorMsg = "";
  if (error.response && error.response.data.error) {
    errorMsg = error.response.data.error[0];
  } else if (error.response && error.response.data.message) {
    errorMsg = error.response.data.message;
  } else if (error.response && error.response.data.detail) {
    errorMsg = error.response.data.detail;
  } else {
    errorMsg = error.message;
  }

  showError(errorMsg);
  return errorMsg;
}
