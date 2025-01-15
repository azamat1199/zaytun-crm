import { useQuery } from "@tanstack/react-query";
import useKeyTranslation from "../helpers/useKeyTranslation";
import { getDegreeType } from "@/data/hr/employee";

/**
 * Custom hook to fetch department templates.
 *
 * @returns {{
 *   data: DepartmentTemplateModel[] | undefined,
 *   options: { label: string, value: string }[],
 *   ...rest: any
 * }} - An object containing the fetched data, options for select input, and other properties from `useQuery`.
 */

const useAcademicTitle = () => {
    const { getWord } = useKeyTranslation();
    const { data, ...rest } = useQuery({
        queryKey: ["academic-title-type"],
        queryFn: () =>
            getDegreeType({
                type: "ACADEMIC_LEVEL",
            }),
        select: (response) => response.data?.result?.data,
    });

    const optionsAcademicTitle = Array.isArray(data)
        ? data.map((position: any) => ({
              label: getWord(position.localaziableName),
              value: position.id,
          }))
        : [];

    return {
        data,
        ...rest,
        optionsAcademicTitle,
    };
};

export default useAcademicTitle;
