import { FileModel } from "../file-upload";

export type DocumentTemplateFormValuesType = {
    uzCr: string;
    ru: string;
    en: string;
    uzLat: string;
    description: string;
    inputFormatType: { label: string; value: string };
    outputFormatType: { label: string; value: string };
    code: string;
    attachmentUzCr: FileModel;
    attachmentUzLat: FileModel;
    attachmentRu: FileModel;
    attachmentEn: FileModel;
    documentTemplateParameters: Array<{
        name: string;
        defaultValue: string;
        regex: string;
        transformationType: { label: string; value: string };
        required: boolean;
    }>;
};
