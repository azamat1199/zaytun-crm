import { getDocumentTemplateById } from "@/data/document-template";
import { QueryOptions, useQuery } from "@tanstack/react-query";
import get from "lodash.get";

const useGetDocumentTemplateById = (id: string, options?: QueryOptions) => {
    const state = useQuery({
        queryKey: ["document-template", { id }],
        queryFn: () => getDocumentTemplateById(id),
        enabled: Boolean(id),
        ...options,
    });

    const documentTemplate = get(state, "data.data.result.data", {});

    return {
        ...state,
        documentTemplate,
    };
};

export default useGetDocumentTemplateById;
