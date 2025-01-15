import { frontOfficeRequest } from "@/services/requests/basRequests";
import { TranslationCreateDto, TranslationKeyModel } from ".";
import { TranslationUpdateDto } from "./dtos/translation.update-dto";
import { AxiosProgressEvent } from "axios";

export const addKeyTranslation = (
    dto: Array<Pick<TranslationCreateDto, "key">>,
) => frontOfficeRequest.post("/key-translation", dto);

export const getAllKeyTranslation = () =>
    frontOfficeRequest.get("/key-translation");

export const updateKeyTranslation = ({
    id,
    data,
}: {
    id: TranslationKeyModel["id"];
    data: TranslationUpdateDto;
}) => frontOfficeRequest.put(`/key-translation/${id}`, data);

export const exportTranslationFile = () =>
    frontOfficeRequest.get("/key-translation/export", {
        responseType: "blob",
    });

export const importTranslationFile = ({
    formData,
    onUploadProgress,
}: {
    formData: any;
    onUploadProgress?: (event: AxiosProgressEvent) => void;
}) =>
    frontOfficeRequest.post("/key-translation/import", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event:AxiosProgressEvent) =>
            onUploadProgress && onUploadProgress(event),
    });
