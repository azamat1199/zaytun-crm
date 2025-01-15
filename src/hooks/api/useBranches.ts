import { getBranchesList } from "@/data/hr/employee";
import { RegionModel } from "@/data/region/region.model";
import { selectDataWithoutPagination } from "@/utils/common";
import { useQuery } from "@tanstack/react-query";
import useKeyTranslation from "../helpers/useKeyTranslation";

const useBranches = () => {
    const { getWord } = useKeyTranslation();
    const { data, isSuccess, ...rest } = useQuery({
        queryKey: ["branches"],
        queryFn: () => getBranchesList({}),
        select: selectDataWithoutPagination<RegionModel>,
        staleTime: Infinity,
    });

    const options =
        Array.isArray(data) && isSuccess
            ? data.map((branch) => ({
                  label: getWord(branch.localaziableName),
                  value: branch.id,
              }))
            : [];

    return {
        data,
        isSuccess,
        ...rest,
        options,
    };
};

export default useBranches;
