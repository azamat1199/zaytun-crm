import { DocumentTemplateFormValuesType } from "./department-template.form.types";

export const prepareDocTemplateFormValuesToDto = (
    values: DocumentTemplateFormValuesType,
) => {
    return {
        ...values,
        localaziableName: {
            uzLat: values.uzCr,
            ru: values.ru,
            en: values.en,
            uzCr: values.uzCr,
        },
        attachmentUzLat: {
            id: values.attachmentUzLat?.id,
        },
        attachmentRu: {
            id: values.attachmentRu?.id,
        },
        attachmentUzCr: {
            id: values.attachmentUzCr?.id,
        },
        attachmentEn: {
            id: values.attachmentEn?.id,
        },
        inputFormatType: values.inputFormatType?.value,
        outputFormatType: values.outputFormatType?.value,
        documentTemplateParameters: values.documentTemplateParameters.map(
            (templateParam) => ({
                ...templateParam,
                transformationType: templateParam.transformationType?.value,
            }),
        ),
    };
};

export const prepareDocTemplateDtoToFormValues = ({
    inputFormatType,
    outputFormatType,
    documentTemplateParameters,
    ...rest
}: any) => ({
    ...rest,
    ...rest?.localaziableName,
    inputFormatType: {
        label: inputFormatType,
        value: inputFormatType,
    },
    outputFormatType: {
        label: outputFormatType,
        value: outputFormatType,
    },
    documentTemplateParameters: (Array.isArray(documentTemplateParameters)
        ? documentTemplateParameters
        : []
    ).map((item,i:number) => ({
        ...item,
        id:i,
        transformationType: {
            label: item.transformationType,
            value: item.transformationType,
        },
    })),
});
