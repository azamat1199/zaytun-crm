import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type Filters = {
    [key: string]: string;
};

function convertSearchParams(searchParams: URLSearchParams): Filters {
    const params: Filters = {};
    searchParams.forEach((value: string, key: string) => {
        params[key] = value;
    });
    return params;
}

function useFilter({ initialFilters = {} }: { initialFilters?: Filters } = {}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [filters, setFilters] = useState<Filters>(
        searchParams.size ? convertSearchParams(searchParams) : initialFilters,
    );
    const isThereAnyParams = searchParams.size;

    // useEffect(() => {
    //   setFilters((prev) => convertSearchParams(searchParams));
    // }, [searchParams]);

    useEffect(() => {
        // Check if searchParams has changed before updating state
        const newFilters = convertSearchParams(searchParams);
        if (!isEqual(newFilters, filters)) {
            setFilters(newFilters);
        }
    }, [searchParams, filters]);

    const replaceQuery = (queries: Filters) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        for (const item in queries) {
            current.set(`${item}`, `${queries[item]}`);
            // setFilters((prev) => ({ ...prev, [item]: queries[item] }));
        }
        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`);
    };

    return {
        filters:
            filters && Object.keys(filters).length && isThereAnyParams
                ? filters
                : null,
        replaceQuery,
    };
}
function isEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export default useFilter;
