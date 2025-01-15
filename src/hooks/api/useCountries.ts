import { RegionModel } from "@/data/region/region.model";
import { useQuery } from "@tanstack/react-query";
import useKeyTranslation from "../helpers/useKeyTranslation";
import { selectDataWithoutPagination } from "@/utils/common";
import { getCountries } from "@/data/country";

const useCountries = () => {
    const { getWord } = useKeyTranslation();
    const { data, isSuccess, ...rest } = useQuery({
        queryKey: ["countries"],
        queryFn: getCountries,
        select: selectDataWithoutPagination<RegionModel>,
        staleTime: Infinity,
    });

    const options =
        Array.isArray(data) && isSuccess
            ? data.map((country) => ({
                  label: getWord(country.localaziableName),
                  value: country.id,
              }))
            : [];

    return {
        data,
        isSuccess,
        ...rest,
        options,
    };
};

export default useCountries;
