import { getDocumentTemplateOptions } from "@/data/document-template";
import { useQuery } from "@tanstack/react-query";

const useGetDocumentTemplateOptions = () => {
    const { data, isSuccess, ...rest } = useQuery({
        queryKey: ["document-template-options"],
        queryFn: getDocumentTemplateOptions,
        select: (res) => res.data?.result?.data,
    });

    const formatTypeOptions = isSuccess ? data?.documentTemplateFormatType : [];
    const transformationTypeOptions = isSuccess
        ? data?.documentTemplateTransformationType
        : [];

    return {
        ...rest,
        isSuccess,
        formatTypeOptions,
        transformationTypeOptions,
        data,
    };
};

export default useGetDocumentTemplateOptions;
