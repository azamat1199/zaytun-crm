import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const useQueryString = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string | number, value: string | number) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(String(name), String(value));
            return params.toString();
        },
        [searchParams],
    );

    const appendQueryString = useCallback(
        (name: string | number, value: string | number) => {
            router.push(
                pathname + "?" + createQueryString(name, value),
                undefined,
            );
        },
        [createQueryString, pathname],
    );

    const replaceQuery = (queries: Record<string, string>) => {
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
        createQueryString,
        router,
        pathname,
        searchParams,
        appendQueryString,
        replaceQuery,
    };
};

export default useQueryString;
