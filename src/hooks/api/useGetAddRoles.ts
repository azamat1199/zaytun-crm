import { getAddRoles } from "@/data/roles";
import { ModuleType } from "@/providers/redux/slices/userSlice";
import { useQuery } from "@tanstack/react-query";
import get from "lodash.get";

const useGetAddRoles = () => {
    const res = useQuery({
        queryFn: getAddRoles,
        queryKey: ["add-roles"],
        select: (res) => {
            const modules = get(res, "data.result.data.modules", []);

            return Array.isArray(modules) ? modules : ([] as ModuleType[]);
        },
    });

    return {
        ...res,
        data: res.data as ModuleType[],
    };
};

export default useGetAddRoles;
