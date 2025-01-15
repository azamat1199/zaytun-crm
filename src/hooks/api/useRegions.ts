import { getRegions } from "@/data/region";
import { RegionModel } from "@/data/region/region.model";
import { useQuery } from "@tanstack/react-query";
import useKeyTranslation from "../helpers/useKeyTranslation";
import { selectDataWithoutPagination } from "@/utils/common";

/**
 * Custom hook to fetch regions.
 *
 * @returns {{
 *   data: RegionModel[] | undefined,
 *   isSuccess: boolean,
 *   options: { label: string, value: string }[],
 *   ...rest: any
 * }} - An object containing the fetched data, success status, options for select input, and other properties from `useQuery`.
 */

const useRegions = () => {
    const { getWord } = useKeyTranslation();
    const { data, isSuccess, ...rest } = useQuery({
        queryKey: ["regions"],
        queryFn: getRegions,
        select: selectDataWithoutPagination<RegionModel>,
        staleTime: Infinity,
    });

    const options =
        Array.isArray(data) && isSuccess
            ? data.map((region) => ({
                  label: getWord(region.localaziableName),
                  value: region.id,
              }))
            : [];

    return {
        data,
        isSuccess,
        ...rest,
        options,
    };
};

export default useRegions;
