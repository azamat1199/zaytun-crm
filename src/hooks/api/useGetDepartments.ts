import { getDepartments } from "@/data/department";
import { selectDataWithPagination } from "@/utils/common";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const useGetDepartments = (
    params?: any,
    options?: Omit<UseQueryOptions, "queryKey">,
) => {
    return useQuery({
        queryKey: ["get-departments"],
        queryFn: () => getDepartments(params),
        // @ts-expect-error TODO
        select: selectDataWithPagination,
        ...options,
    });
};

export default useGetDepartments;
