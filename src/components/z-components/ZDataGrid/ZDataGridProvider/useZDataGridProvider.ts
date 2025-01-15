import { useDebounce } from "@uidotdev/usehooks";
import { produce } from "immer";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { DataGridColumnType } from "../DataGridCell.types";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TableState<TItem, KFilter> {
    filter: KFilter;
    keyExtractor: string;
    search: string;
    select: Record<string, boolean>;
}

export enum TABLE_ACTION_TYPES {
    TOGGLE_VISIBILITY = "toggleVisibility",
    TOGGLE_MULTIPLE_COLUMNS_VISIBILITY = "toggleMultipleColumnsVisibility",
    RESET_COLUMNS_VISIBILITY = "resetColumnsVisibility",
    SET_NEW_VALUE = "setNewValue",
    TOGGLE_ROW = "toggleRow",
}

const initialState = {
    filter: {},
    keyExtractor: "",
    search: "",
    select: {},
};

export type ToggleColumnVisibilityAction = {
    type: TABLE_ACTION_TYPES.TOGGLE_VISIBILITY;
    payload: string;
};

export type SetNewValueAction = {
    type: TABLE_ACTION_TYPES.SET_NEW_VALUE;
    payload: Partial<TableState<any, any>>;
};

export type ToggleMultipleColumnsVisibility = {
    type: TABLE_ACTION_TYPES.TOGGLE_MULTIPLE_COLUMNS_VISIBILITY;
    payload: Record<string, DataGridColumnType>;
};

export type ResetColumnsVisibility = {
    type: TABLE_ACTION_TYPES.RESET_COLUMNS_VISIBILITY;
    payload: any;
};

export type ToggleRowAction = {
    type: TABLE_ACTION_TYPES.TOGGLE_ROW;
    payload: {
        id: string;
    };
};

export type TableActions =
    | ToggleColumnVisibilityAction
    | ToggleMultipleColumnsVisibility
    | ResetColumnsVisibility
    | SetNewValueAction
    | ToggleRowAction;

const reducer = (state: TableState<any, any>, action: TableActions) => {
    switch (action.type) {
        case TABLE_ACTION_TYPES.SET_NEW_VALUE:
            return produce(state, (draft) => {
                Object.entries(action.payload).forEach(([key, value]) => {
                    // @ts-expect-error TODO
                    draft[key] = value;
                });
            });
        default:
            return state;
    }
};

const useZDataGridProvider = <TItem, KFilter = any>({
    // @ts-expect-error TODO
    filter = {},
    keyExtractor = "",
    exportRequest,
}: Partial<TableState<TItem, KFilter>> & {
    exportRequest?: () => Promise<AxiosResponse<any, any>>;
}) => {
    const [modal, setModal] = useState<"filter" | "closed">("closed");
    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) || 0;
    const size = Number(searchParams.get("size")) || 10;

    const exportQuery = useQuery({
        queryFn: () => {
            if (!exportRequest) {
                return;
            }
            return exportRequest();
        },
        queryKey: ["export-request"],
        enabled: false,
    });

    const openFilterModal = () => setModal("filter");

    const closeModal = () => setModal("closed");

    useEffect(() => {
        if (!exportQuery.isSuccess) {
            return;
        }

        // Create a blob URL and create a link element to trigger the download
        const blobUrl = URL.createObjectURL(new Blob([exportQuery.data?.data]));
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = blobUrl;
        a.download = "translation.xlsx"; // Set the desired file name with .xls extension
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl);
    }, [exportQuery.data, exportQuery.isSuccess]);

    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        filter: filter,
        keyExtractor,
        search: "",
    });

    const debouncedSearch = useDebounce(state.search, 300);

    const setNewValues = useCallback(
        (values: Partial<TableState<any, any>>) =>
            dispatch({
                type: TABLE_ACTION_TYPES.SET_NEW_VALUE,
                payload: values,
            }),
        [],
    );

    const handleExport = useCallback(() => exportQuery.refetch(), []);

    return {
        ...state,
        dispatch,
        setNewValues,
        debouncedSearch,
        page,
        size,
        handleExport,
        exportQuery,
        openFilterModal,
        closeModal,
        modal,
        setModal,
  
    };
};

export default useZDataGridProvider;
