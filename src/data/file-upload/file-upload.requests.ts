import {
    fileRequest,
    frontOfficeRequest,
    hrRequest,
} from "@/services/requests/basRequests";
import { extractPathname } from "@/utils/common";
import { AxiosProgressEvent } from "axios";

export const frontOfficeUploadFileRequest = ({
    formData,
    onUploadProgress,
}: {
    formData: any;
    onUploadProgress: (event: AxiosProgressEvent) => void;
}) =>
    frontOfficeRequest.post(
        "/attachments/upload?attachmentType=DEFAULT_TYPE",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        },
    );

export const hrUploadFileRequest = ({
    formData,
    onUploadProgress,
}: {
    formData: any;
    onUploadProgress: (event: AxiosProgressEvent) => void;
}) =>
    hrRequest.post(
        "/attachments/upload?attachmentType=DEFAULT_TYPE",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        },
    );

export const getFile = (url: string) =>
    fileRequest.get(extractPathname(url), {
        responseType: "arraybuffer",
        headers: {
            Accept: "application/pdf",
        },
    });
