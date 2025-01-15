import { RegionModel } from "@/data/region/region.model";
import { useQuery } from "@tanstack/react-query";
import useKeyTranslation from "../helpers/useKeyTranslation";
import { selectDataWithoutPagination } from "@/utils/common";
import { getDepartmentsByBranchId } from "@/data/department";

const useDepartmentsByBranchId = (branchId: null | string) => {
    const { getWord } = useKeyTranslation();
    const { data, isSuccess, ...rest } = useQuery({
        queryKey: ["departments", { branchId }],
        queryFn: () => getDepartmentsByBranchId(branchId as string),
        select: selectDataWithoutPagination<RegionModel>,
        staleTime: Infinity,
        enabled: Boolean(branchId),
    });

    const options =
        Array.isArray(data) && isSuccess
            ? data.map((department: any) => ({
                  label: getWord(
                      department?.departmentTemplate.localaziableName,
                  ),
                  value: department.id,
              }))
            : [];

    return {
        data,
        isSuccess,
        ...rest,
        options,
    };
};

export default useDepartmentsByBranchId;
