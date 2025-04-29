import { toast } from "react-toastify";

export const showSuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
  });
};
