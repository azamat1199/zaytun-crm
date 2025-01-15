import { toast } from "react-toastify";
import { NotificationPropsWithVariant } from "./Notification.types";
import SuccessNotification from "./SuccessNotification";
import ErrorNotification from "./ErrorNotification";
import WarningNotification from "./WarningNotification";

/**
 * Opens a toast notification based on the provided variant.
 *
 * @param {{
 *   variant: 'success' | 'error' | 'warning',
 *   options?: Record<string, any>,
 *   ...rest: any
 * }} notificationProps - The properties for the notification.
 * @returns {React.ReactText | null} - The ID of the toast or null if variant is not recognized.
 */

export const openToast = ({
    variant,
    options,
    ...rest
}: NotificationPropsWithVariant) => {
    const defaultOptions = {
        autoClose: 3500,
        ...options,
    };

    switch (variant) {
        case "success":
            return toast(<SuccessNotification {...rest} />, defaultOptions);
        case "error":
            return toast.info(<ErrorNotification {...rest} />, defaultOptions);
        case "warning":
            return toast(<WarningNotification {...rest} />, defaultOptions);
        default:
            return null;
    }
};
