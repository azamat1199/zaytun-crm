import { useState } from "react";
import { EmployeeModel, getEmployeeList } from "@/data/hr/employee";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch employee list and manage search state.
 *
 * @returns {{
 *   data: EmployeeModel[] | undefined,
 *   options: { label: string, value: string }[],
 *   handleSearch: (search: string) => void,
 *   search: string,
 *   ...rest: any
 * }} - An object containing the fetched data, options for select input, search handler, search state, and other properties from `useQuery`.
 */

const useEmployeeList = () => {
    const [search, setSearch] = useState("");
    const { data, ...rest } = useQuery({
        queryKey: ["employees", { page: 0, size: 1000 }],
        queryFn: () => getEmployeeList({ page: 0, size: 1000 }),
        select: (response) => response.data?.result?.data,
    });

    const options = Array.isArray(data?.content)
        ? data.content.map((employee: EmployeeModel) => ({
              label: `${employee.firstNameLat || ""} ${employee.lastNameLat}`,
              value: employee.employment?.id,
          }))
        : [];

    const handleSearch = (search: string) => setSearch(search);

    return {
        data,
        ...rest,
        options,
        handleSearch,
        search,
    };
};

export default useEmployeeList;
