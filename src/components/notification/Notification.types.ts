import { ReactNode } from "react";
import { ToastOptions } from "react-toastify";

export interface NotificationProps {
    message?: ReactNode;
    text?: ReactNode;
    options?: ToastOptions;
}

export interface NotificationPropsWithVariant extends NotificationProps {
    variant: "success" | "error" | "warning";
    toastId?: string | number;
}
