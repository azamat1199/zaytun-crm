import { getProcessTemplateById } from "@/data/process-templates";
import { QueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import get from "lodash.get";

const useGetProcessTemplateById = (id: string, options?: QueryOptions) => {
    return useQuery({
        queryFn: () => getProcessTemplateById(id),
        queryKey: ["process-template", { id }],
        enabled: Boolean(id),
        ...options,
    });
};

export const useGetProcessTemplateByIdFromQuery = (id: string) => {
    const queryClient = useQueryClient();

    const state = queryClient.getQueryState(["process-template", { id }]);
    const processTemplate = get(state, "data.data.result.data", {});


    return {
        processTemplate,
        ...state,
    };
};

export default useGetProcessTemplateById;
