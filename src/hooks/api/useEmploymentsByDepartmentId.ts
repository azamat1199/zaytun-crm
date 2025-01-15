import { RegionModel } from "@/data/region/region.model";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import useKeyTranslation from "../helpers/useKeyTranslation";
import { selectDataWithoutPagination } from "@/utils/common";
import { getEmploymentsByDepartmentId } from "@/data/employment";

const useEmploymentsByDepartmentId = (
    params: { page: number; size: number; departmentId: string | null },
    queryOptions?: Omit<UseQueryOptions, "queryKey">,
) => {
    const { getWord } = useKeyTranslation();
    const { data, isSuccess, ...rest } = useQuery({
        queryKey: ["employments", params],
        queryFn: () =>
            getEmploymentsByDepartmentId({
                ...params,
                departmentId: params.departmentId as string,
            }),
        // @ts-expect-error TODO
        select: selectDataWithoutPagination<RegionModel>,
        staleTime: Infinity,
        enabled: Boolean(params.departmentId),
        ...queryOptions,
    });

    const options =
        Array.isArray(data) && isSuccess
            ? data.map((employment: any) => ({
                  label: getWord(employment?.position?.localaziableName),
                  value: employment.id,
              }))
            : [];

    return {
        data,
        isSuccess,
        ...rest,
        options,
    };
};

export default useEmploymentsByDepartmentId;
