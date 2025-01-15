"use client";
import ArrowDown2 from "@/components/icons/ArrowDown2";
import ContentLayout from "@/components/layouts/ContentLayout";
import StatusTag from "@/components/status-tag/StatusTag";
import ZButton from "@/components/z-components/ZButton";
import ZContextMenu from "@/components/z-components/ZContextMenu";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import { getProcessList } from "@/data/process/process.requests";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import useFilter from "@/hooks/useFilter";
import { selectDataWithPagination } from "@/utils/common";
import {
    formatCreatedAtDate,
    formatCreatedAtTime,
} from "@/utils/timeFormatter";
import { useQuery } from "@tanstack/react-query";
import { RefreshIcon } from "@zaytun/components";
import cx from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const contextMenu = [
    {
        label: <Link href={""}>Отправить смс</Link>,
    },
    {
        label: <Link href={""}> Запустить процесс</Link>,
    },
    {
        label: <Link href={""}> Создать заявку </Link>,
    },
    {
        label: <Link href={""}> Создать лид </Link>,
    },
    {
        label: <Link href={""}> Отправить документ </Link>,
    },
];

const Page = () => {
    const { filters } = useFilter({});
    const pathname = usePathname();
    const router = useRouter();
    const { getWord } = useKeyTranslation();

    const { data, isLoading } = useQuery({
        queryKey: ["getProcesses", filters],
        queryFn: () =>
            getProcessList({
                page: filters?.page,
                size: filters?.size,
                search: filters?.query,
            }),
        select: selectDataWithPagination,
    });

    const buttons = [
        {
            value: "1",
            children: "Все",
        },
        {
            value: "2",
            children: "За день",
        },
        {
            value: "3",
            children: "За неделю",
        },
        {
            value: "4",
            children: "За месяц",
        },
        {
            value: "5",
            children: "За квартал",
        },
    ];
    const columns = [
        {
            label: "Дата создания",
            key: "created_data",
            cellRender: (row) => {
                return (
                    <div className="flex items-center">
                        <div className="flex flex-col">
                            <span>
                                {" "}
                                {formatCreatedAtTime(row?.creator?.createdAt)}
                            </span>
                            <span>
                                {" "}
                                {formatCreatedAtDate(
                                    row?.creator?.createdAt,
                                )}{" "}
                            </span>
                        </div>
                    </div>
                );
            },
            width: "w-[15%]",
        },
        {
            label: "Код ЦБУ",
            key: "codeCBU",
            width: "w-[12%]"
        },
        {
            label: "ID",
            key: "uniqueNumber",
            width: "w-[15%]",
            cellRender: (row) => {
                return (
                    <div>
                        <span>{row?.uniqueNumber}</span>
                    </div>
                );
            },
        },
        {
            label: "Инициатор",
            key: "employee",
            width: "w-[25%]",
            cellRender: (row) => {
                return (
                    <div className="flex flex-col gap-1">
                        <span>{row?.creator?.firstNameLat}</span>
                        <span>{row?.creator?.lastNameLat}</span>
                    </div>
                );
            },
        },
        {
            label: "Название процесса",
            key: "process",
            width: "w-[15%]",
            cellRender: (row) => {
                return (
                    <div className="flex flex-col gap-1">
                        {getWord(row?.processTemplate?.localaziableName)}
                    </div>
                );
            },
        },
        {
            label: "Статус",
            key: "status",
            width: "w-[8%]",
            cellRender: (row) => {
                return (
                    <div>
                        <StatusTag
                            variant={cx({
                                success: "NEW" === row.status,
                                process: "В обработке" === row.status,
                                passive: "Завершен" === row.status,
                            })}
                            value={row.status}
                        />
                    </div>
                );
            },
        },
        {
            label: "Перезапустить процесс",
            key: "action",
            width: "w-[5%]",
            cellRender: () => (
                <div className="flex justify-center">
                    <RefreshIcon color="#039855" />
                </div>
            ),
        },
    ];

    return (
        <ContentLayout
            title="Процессы"
            rightActions={
                <>
                    <ZContextMenu list={contextMenu}>
                        <span>
                            <ZButton endIcon={<ArrowDown2 />} size="md">
                                Действия
                            </ZButton>
                        </span>
                    </ZContextMenu>
                </>
            }
        >
            <div>
                {/* <Table
          columns={columns}
          // list={fakeData}
          request={request}
          onSearch={(ev) => replaceQuery({ query: ev })}
          onTabChange={(ev) => replaceQuery({ tab: ev })}
          onRowClick={(row) => router.push(`processes/${row.id}`)}
          withHeader={true}
          withSearch={true}
          withConfig={true}
          onFilter
          withExport
          tabs={['Все', 'За день', 'За неделю', 'За месяц', 'За квартал']}
          searchPlaceholder={'Поиск'}
          useFilter={useFilter}
        /> */}
                <ZDataGridProvider values={{ filter: {}, keyExtractor: "id" }}>
                    <ZDataGrid
                        hasCheckbox
                        hasActions={false}
                        // contextMenu={contextMenu}
                        buttons={buttons}
                        columns={columns}
                        rows={data?.list || []}
                        pagination={{
                            totalPages: data?.totalPages,
                        }}
                        buttonKey="tab"
                        loading={isLoading}
                        handleRowDoubleClick={(id) =>
                            router.push(`${pathname}/${id}`)
                        }
                    />
                </ZDataGridProvider>
            </div>
        </ContentLayout>
    );
};

export default Page;
