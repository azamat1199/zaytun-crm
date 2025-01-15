import { useQuery } from "@tanstack/react-query";
import useKeyTranslation from "../helpers/useKeyTranslation";
import { PositionModel, getPositions } from "@/data/position";

/**
 * Custom hook to fetch department templates.
 *
 * @returns {{
 *   data: DepartmentTemplateModel[] | undefined,
 *   options: { label: string, value: string }[],
 *   ...rest: any
 * }} - An object containing the fetched data, options for select input, and other properties from `useQuery`.
 */

const usePositions = () => {
    const { getWord } = useKeyTranslation();
    const { data, ...rest } = useQuery({
        queryKey: ["positions", { page: 0, size: 1000 }],
        queryFn: () => getPositions({ page: 0, size: 1000 }),
        select: (response) => response.data?.result?.data,
    });

    const options = Array.isArray(data?.content)
        ? data.content.map((position: PositionModel) => ({
              label: getWord(position.localaziableName),
              value: position.id,
          }))
        : [];

    return {
        data,
        ...rest,
        options,
    };
};

export default usePositions;
