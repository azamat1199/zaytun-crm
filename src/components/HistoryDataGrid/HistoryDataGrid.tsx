"use client";
import { FC } from "react";
import { useSearchParams } from "next/navigation";
import useZDataGridContext from "@/components/z-components/ZDataGrid/ZDataGridProvider/useZDataGridContext";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import { getHistoryList } from "@/data/admin/admin.requests";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import {
    formatCreatedAtDate,
    formatCreatedAtTime,
} from "@/utils/timeFormatter";
import { useQuery } from "@tanstack/react-query";
import { ZDataGridProps } from "../z-components/ZDataGrid/ZDataGrid";
import dynamic from "next/dynamic";
import { formatDate } from "@/services/time";

const FilterFields = dynamic(() => import("./FilterFields"));

interface HistoryDataGridProps {
    entityId?: string;
    dataGridProps?: Partial<ZDataGridProps>;
    entityName?: string;
}

const HistoryDataGrid: FC<HistoryDataGridProps> = ({
    entityId,
    dataGridProps,
    entityName,
}) => {
    const { t } = useAppTranslations();
    const { getWord } = useKeyTranslation();
    const searchParams = useSearchParams();

    const columns = [
        {
            label: t("Дата создания"),
            key: "created_data",
            width: "w-[10%]",
            cellRender: (row: { createdAt: string }) => {
                return (
                    <div className="flex flex-col">
                        <span> {formatCreatedAtTime(row?.createdAt)}</span>
                        <span> {formatCreatedAtDate(row?.createdAt)} </span>
                    </div>
                );
            },
        },
        {
            label: "Кем создан",
            width: "w-[10%]",
            key: "author",
        },
        {
            label: t("Тип обьекта"),
            width: "w-[15%]",
            key: "entityName",
        },
        {
            label: t("Для обьекта"),
            width: "w-[13%]",
            key: "authorId",
        },
        {
            header: t("Действие"),
            key: "module",
            // headerClassName:'min-w-[400px]',
            width: "w-[45%]",
            cellRender: (row: any) => {
                return (
                    <div>
                        {row?.operation === "CREATE" && (
                            <div>
                                <div className="flex gap-[6px] items-center">
                                    <p className="text-secondary font-medium">
                                        {row?.author}
                                    </p>
                                    <p>добавил(а) новый</p>
                                    <p>{row?.entityName}</p>
                                    <p className="text-secondary font-medium">
                                        "{row?.exactObjectName}".
                                    </p>
                                </div>
                                <p>Параметры:</p>
                            </div>
                        )}
                        {row?.operation === "DELETE" && (
                            <div>
                                <div className="flex gap-[6px] items-center">
                                    <p className="text-secondary font-medium">
                                        {row?.author}
                                    </p>
                                    <p>удалил(а)</p>
                                    <p>{row?.entityName}</p>
                                    <p className="text-secondary font-medium">
                                        "{row?.exactObjectName}".
                                    </p>
                                </div>
                                <p>Параметры:</p>
                            </div>
                        )}
                        {row?.operation === "UPDATE" && (
                            <div>
                                <div className="flex gap-[6px] items-center">
                                    <p className="text-secondary font-medium">
                                        {row?.author}
                                    </p>
                                    <p>изменил(а) </p>
                                    <p>{row?.entityName}</p>
                                    <p className="text-secondary font-medium">
                                        "{row?.exactObjectName}"
                                    </p>
                                </div>
                                <p>Параметры:</p>
                            </div>
                        )}
                        {row?.changes?.map((item: any, j: any) => {
                            const { entryChanges } = item;
                            return (
                                <div key={j} className="flex flex-col gap-1">
                                    {entryChanges?.map(
                                        (changes: any, indx: any) => {
                                            const { entryChangeType } = changes;
                                            return (
                                                <div key={indx}>
                                                    {entryChangeType ===
                                                        "EntryAdded" && (
                                                        <li className="list-item gap-[6px]">
                                                            {changes?.key}:
                                                            &nbsp;
                                                            <span className="text-secondary font-medium">
                                                                {typeof changes?.value ===
                                                                "object"
                                                                    ? `"${getWord(
                                                                          changes?.value,
                                                                      )}"`
                                                                    : `"${changes?.value}"`}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {entryChangeType ===
                                                        "EntryRemoved" && (
                                                        <li className="list-item gap-[6px]">
                                                            {changes?.key}:
                                                            &nbsp;
                                                            <span className="text-secondary font-medium">
                                                                {typeof changes?.value ===
                                                                "object"
                                                                    ? `"${getWord(
                                                                          changes?.value,
                                                                      )}"`
                                                                    : `"${changes?.value}"`}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {entryChangeType ===
                                                        "EntryValueChange" && (
                                                        <li className="gap-[6px] list-item">
                                                            {changes?.key}:
                                                            с&nbsp;
                                                            <span className="text-secondary font-medium">
                                                                "
                                                                {typeof changes?.leftValue ===
                                                                "object"
                                                                    ? getWord(
                                                                          changes?.leftValue,
                                                                      )
                                                                    : changes?.leftValue}
                                                                "
                                                            </span>
                                                            &nbsp; на &nbsp;
                                                            <span className="text-secondary font-medium">
                                                                "
                                                                {typeof changes?.rightValue ===
                                                                "object"
                                                                    ? getWord(
                                                                          changes?.rightValue,
                                                                      )
                                                                    : changes?.rightValue}
                                                                "
                                                            </span>
                                                        </li>
                                                    )}
                                                </div>
                                            );
                                        },
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            },
        },
        {
            label: t("IP"),
            key: "ipAddress",
            width: "w-[7%]",
        },
    ];

    const buttons = [
        {
            value: t("ALL"),
            children: "ALL",
        },
        {
            value: t("CREATE"),
            children: "CREATE",
        },
        {
            value: t("UPDATE"),
            children: "UPDATE",
        },
        {
            value: t("DELETE"),
            children: "DELETE",
        },
        {
            value: t("SHOW"),
            children: "SHOW",
        },
    ];

    const operation = (searchParams.get("priority") || "").toUpperCase();
    const { debouncedSearch, page, size } = useZDataGridContext();

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("startDate");

    const filters = {
        page,
        size,
        search: debouncedSearch,
        ...(operation !== "ALL" && operation && { operation }),
        ...(entityId && { entityId }),
        ...(startDate && {
            startDate: formatDate(startDate, "DD.MM.YYYY HH:mm:ss"),
        }),
        ...(endDate && { endDate: formatDate(endDate, "DD.MM.YYYY HH:mm:ss") }),
        entityName: searchParams.get("entityName") || entityName,
        // ...(entityName && { entityName }),
        author: searchParams.get("author"),
        ipAddress: searchParams.get("ipAddress"),
    };

    const { data, isLoading, isRefetching } = useQuery({
        queryKey: ["history", filters],
        queryFn: () => getHistoryList(filters),
        select: (res) => res?.data?.result?.data,
    });

    return (
        <ZDataGrid
            loading={isLoading || isRefetching}
            rows={data?.content}
            columns={columns}
            buttonKey={"priority"}
            pagination={{
                totalPages: data?.totalPages,
            }}
            hasActions={false}
            buttons={buttons}
            filter={{
                FilterComponent: FilterFields,
            }}
            {...dataGridProps}
        />
    );
};

export default HistoryDataGrid;
