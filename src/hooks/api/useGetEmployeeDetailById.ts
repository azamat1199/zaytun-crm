import { getEmployeeDetailById } from "@/data/employee";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

const useGetEmployeeDetailById = (
    id: string,
    options?: Omit<UseQueryOptions<any>, "queryKey">,
) => {
    const state = useQuery({
        queryKey: ["employee", { id }],
        queryFn: () => getEmployeeDetailById(id),
        select: (res) => res.data?.result?.data,
        enabled: Boolean(id),
        ...options,
    });

    return {
        ...state,
        employee: state.data || {},
    };
};

export default useGetEmployeeDetailById;
