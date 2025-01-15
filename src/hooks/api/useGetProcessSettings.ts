import { getProcessSettings } from "@/data/process-settings";
import { selectDataWithPagination } from "@/utils/common";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const useGetProcessSettings = (
    params: { page: number; size: number },
    options?: Omit<UseQueryOptions, "queryKey">,
) => {
    return useQuery({
        queryKey: ["process-settings", params],
        queryFn:()=> getProcessSettings(params),
        // @ts-expect-error TODO
        select: selectDataWithPagination,
        ...options,
    });
};

export default useGetProcessSettings;
