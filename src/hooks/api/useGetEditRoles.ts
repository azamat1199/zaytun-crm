import { getEditRoles } from "@/data/roles";
import { ModuleType } from "@/providers/redux/slices/userSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import get from "lodash.get";

const useGetEditRoles = (id: string) => {
    const queryClient = useQueryClient();

    const queryKey = ["edit-role", { id }];
    const res = useQuery({
        queryFn: () => getEditRoles(id),
        queryKey,
        select: (res) => {
            const modules = get(res, "data.result.data.modules", []);

            return {
                modules: Array.isArray(modules)
                    ? modules
                    : ([] as ModuleType[]),
                ...res?.data?.result?.data,
            };
        },
    });

    const inValidateQuery = () => {
        queryClient.invalidateQueries({ queryKey });
    };

    return {
        ...res,
        modules: res.data?.modules as ModuleType[],
        inValidateQuery,
    };
};

export default useGetEditRoles;
