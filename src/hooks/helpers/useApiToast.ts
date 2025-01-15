import { openToast } from "@/components/notification";
import { getErrorMessages, getSuccessMessage } from "@/utils/common";
import { AxiosError, AxiosResponse } from "axios";

const useApiToast = () => {
    const successToast = (res: AxiosResponse) => {
        openToast({ variant: "success", message: getSuccessMessage(res) });
    };

    const errorToast = (err: AxiosError, asArray = true) =>
        openToast({
            variant: "error",
            message: getErrorMessages(err, asArray),
        });

    return {
        successToast,
        errorToast,
    };
};

export default useApiToast;
