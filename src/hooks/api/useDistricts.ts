import { getDistrictsByRegionId } from "@/data/district";
import { RegionModel } from "@/data/region/region.model";
import { useQuery } from "@tanstack/react-query";
import useKeyTranslation from "../helpers/useKeyTranslation";
import { selectDataWithoutPagination } from "@/utils/common";
import { DistrictModel } from "@/data/district";

/**
 * Custom hook to fetch districts by region ID.
 *
 * @param {string|null} regionId - The ID of the region to fetch districts for.
 * @returns {{
 *   data: DistrictModel[] | undefined,
 *   isSuccess: boolean,
 *   options: { label: string, value: string }[],
 *   ...rest: any
 * }} - An object containing the fetched data, success status, options for select input, and other properties from `useQuery`.
 */

const useDistricts = (regionId: RegionModel["id"] | null) => {
    const { getWord } = useKeyTranslation();

    const { data, isSuccess, ...rest } = useQuery({
        queryKey: ["districts", { regionId }],
        queryFn: () => getDistrictsByRegionId(regionId || ""),
        select: selectDataWithoutPagination<DistrictModel>,
        enabled: Boolean(regionId),
        staleTime: Infinity,
    });

    const options =
        Array.isArray(data) && isSuccess
            ? data.map(({ localaziableName, id }) => ({
                  label: getWord(localaziableName),
                  value: id,
              }))
            : [];

    return {
        data,
        isSuccess,
        ...rest,
        options,
    };
};

export default useDistricts;
