import {
    DepartmentTemplateModel,
    getDepartmentTemplates,
} from "@/data/department-template";
import { useQuery } from "@tanstack/react-query";
import useKeyTranslation from "../helpers/useKeyTranslation";

/**
 * Custom hook to fetch department templates.
 *
 * @returns {{
 *   data: DepartmentTemplateModel[] | undefined,
 *   options: { label: string, value: string }[],
 *   ...rest: any
 * }} - An object containing the fetched data, options for select input, and other properties from `useQuery`.
 */

const useDepartmentTemplates = () => {
    const { getWord } = useKeyTranslation();
    const { data, ...rest } = useQuery({
        queryKey: ["department-templates", { page: 0, size: 1000 }],
        queryFn: () => getDepartmentTemplates({ page: 0, size: 1000 }),
        select: (response) => response.data?.result?.data,
    });

    const options = Array.isArray(data?.content)
        ? data.content.map((departmentTemplate: DepartmentTemplateModel) => ({
              label: getWord(departmentTemplate.localaziableName),
              value: departmentTemplate.id,
          }))
        : [];

    return {
        data,
        ...rest,
        options,
    };
};

export default useDepartmentTemplates;
