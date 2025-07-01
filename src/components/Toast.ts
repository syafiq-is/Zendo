// toast.ts
import { toast } from "react-toastify";

export function displayToastMessage() {
  const raw = sessionStorage.getItem("toastMessage");
  if (raw) {
    const { type, text } = JSON.parse(raw);

    if (type === "success") toast.success(text);
    else if (type === "error") toast.error(text);
    else toast(text);

    sessionStorage.removeItem("toastMessage");
  }
}

export function setToastMessage(
  type: "success" | "error" | "info" | "warning",
  text: string
) {
  sessionStorage.setItem("toastMessage", JSON.stringify({ type, text }));
}

export function showToast(
  type: "success" | "error" | "info" | "warning",
  text: string
) {
  toast[type](text);
}
