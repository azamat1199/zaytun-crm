import { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { selectDataWithPagination } from "@/utils/common";
import { getRoleList } from "@/data/admin/admin.requests";
import useKeyTranslation from "../helpers/useKeyTranslation";

const useGetRoles = (
    params: { page: number; size: number; search: string },
    options?: Omit<UseQueryOptions, "queryKey">,
    enableSelect?: boolean,
) => {
    const { getWord } = useKeyTranslation();
    const { data, isLoading, isSuccess, ...rest } = useQuery({
        queryKey: ["admin-role", params],
        queryFn: () => getRoleList(params),
        // @ts-expect-error TODO
        select: selectDataWithPagination,
        ...options,
    });

    const selectOptions =
        isSuccess && enableSelect && Array.isArray(data?.list)
            ? data.list.map((item) => ({
                  label: getWord(item.localaziableName),
                  value: item.id,
              }))
            : [];

    return {
        data,
        isLoading,
        isSuccess,
        options: selectOptions,
        ...rest,
    };
};

export default useGetRoles;
