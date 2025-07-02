// toast.ts
import { toast } from "react-toastify";

// Get toast messages from session to be displayed
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

// Set toast messages to session to be read on other pages
export function setToastMessage(
  type: "success" | "error" | "info" | "warning",
  text: string
) {
  sessionStorage.setItem("toastMessage", JSON.stringify({ type, text }));
}

// Display toast immediately
export function showToast(
  type: "success" | "error" | "info" | "warning",
  text: string
) {
  toast[type](text);
}
