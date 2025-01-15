import { ReactNode, createContext } from "react";
import useZDataGridProvider from "./useZDataGridProvider";

export const TableContext = createContext<ReturnType<
    typeof useZDataGridProvider
> | null>(null);

type UseZDataGridProviderArgsType<TItem, KFilter> = Parameters<
    typeof useZDataGridProvider<TItem, KFilter>
>;

interface ZDataGridProviderProps<TItem, KFilter> {
    children: ReactNode;
    values: Partial<UseZDataGridProviderArgsType<TItem, KFilter>[0]>;
}

function ZDataGridProvider<TItem, KFilter extends Record<string, any>>({
    children,
    values,
}: ZDataGridProviderProps<TItem, KFilter>) {
    const value = useZDataGridProvider<TItem, KFilter>(values);

    return (
        <TableContext.Provider value={value}>{children}</TableContext.Provider>
    );
}

export default ZDataGridProvider;
