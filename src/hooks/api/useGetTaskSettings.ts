import { getTaskSettings } from "@/data/task-settings";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const useGetTaskSettings = (
    params: { page: number; size: number,processTemplateId:string },
    options?: Omit<UseQueryOptions, "queryKey">,
) => {
    return useQuery({
        queryKey: ["task-settings", params],
        queryFn:()=> getTaskSettings(params),
        // @ts-expect-error TODO
        ...options,
    });
};

export default useGetTaskSettings;
