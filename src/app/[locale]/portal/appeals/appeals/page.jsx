"use client";
import React, { useState } from "react";
import ContentLayout from "@/components/layouts/ContentLayout";
import { TButton, ArrowRightIcon } from "@zaytun/components";
import { Table } from "@/components/table/table";
import cx from "classnames";
import { usePathname } from "next/navigation";
import useFilter from "@/hooks/useFilter";
import FormInput from "@/components/form-input/formInput";
import { Checkbox } from "@/components/checkbox/Checkbox";
import { Formik } from "formik";
import StatusTag from "@/components/status-tag/StatusTag";
import { useQuery } from "@tanstack/react-query";
import { getAppealsList } from "@/data/portal/portal.requests";
import {
    formatCreatedAtTime,
    formatCreatedAtDate,
} from "@/utils/timeFormatter";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import { useRouter } from "next/navigation";

function Applications() {
    const { filters, replaceQuery } = useFilter({});
    const pathname = usePathname();
    const { getWord } = useKeyTranslation();
    const router = useRouter();

    const [createRequest, setCreateRequest] = useState(false);

    const tableTabs = [
        { value: "ALL", label: "Все" },
        { value: "IN_DAY", label: "За день" },
        { value: "IN_WEEK", label: "За неделю" },
        { value: "IN_MONTH", label: "За месяц" },
        { value: "FOR_QUARTER", label: "За квартал" },
    ];
    const request = useQuery({
        queryKey: ["getAppeals", filters],
        queryFn: () =>
            getAppealsList({
                page: filters?.page,
                size: filters?.size,
                search: filters?.search,
            }),
    });
    console.log(request?.data?.data?.result?.data?.content);
    const columns = [
        {
            headerName: (
                <div className="flex items-center">
                    <Checkbox label={null} name={"created"} checked={null} />
                    <span>Дата</span>
                </div>
            ),
            field: "created_data",
            width: 212,
            renderCell: (row) => {
                return (
                    <div className="flex items-center">
                        <Checkbox
                            label={null}
                            name={"created"}
                            checked={null}
                        />
                        <div className="flex flex-col gap-1">
                            <span> {formatCreatedAtTime(row.createdAt)}</span>
                            <span> {formatCreatedAtDate(row.createdAt)} </span>
                        </div>
                    </div>
                );
            },
        },
        {
            headerName: "Код ЦБУ",
            field: "code",
            width: 212,
            // renderCell: (row) => {
            //   return (
            //     <div className="flex flex-col">
            //       <span>{row.code}</span>
            //     </div>
            //   );
            // },
        },
        {
            headerName: "ID",
            field: "clientId",
            width: 212,
        },
        {
            headerName: "Тема",
            field: "description",
            width: 212,
        },
        {
            headerName: "Инициатор",
            field: "clientMiddleName",
            width: 212,
            renderCell: (row) => {
                return (
                    <div className="flex gap-1">
                        <span>{row.clientFirstName}</span>
                        <span>{row.clientLastName}</span>
                        <span>{row.clientMiddleName}</span>
                    </div>
                );
            },
        },

        {
            headerName: "Ответственный отдел",
            field: "responsibleDepartment",
            width: 220,
        },
        {
            headerName: "Ответственный",
            field: "responsible",
            width: 220,
        },
        {
            headerName: "SLA",
            field: "sla",
            width: 200,
            renderCell: () => {
                return (
                    <div>
                        {/* <StatusTag
              variant={cx({
                canceled: '20 часов' === row?.sla,
                success: '2 дня' === row?.sla,
              })}
              value={row.sla}
            /> */}
                    </div>
                );
            },
        },
        {
            headerName: "Статус",
            field: "status",
            width: 200,
            renderCell: (row) => {
                return (
                    <div>
                        <StatusTag
                            variant={cx({
                                process:
                                    "IN_PROGRESS" ===
                                    getWord(row.status.localaziableName),
                                success:
                                    "NEW" ===
                                    getWord(row.status.localaziableName),
                            })}
                            value={getWord(row.status.localaziableName)}
                        />
                    </div>
                );
            },
        },
        {
            headerName: "",
            field: "action",
            width: 82,
            renderCell: (row) => (
                <ArrowRightIcon
                    handleEdit={() => router.push(`${pathname}/${row.id}`)}
                    color="#667085"
                />
            ),
        },
    ];

    return (
        <ContentLayout
            title="Заявки"
            rightActions={
                <TButton
                    variant="filled"
                    bgColor={"primary"}
                    onClick={() => setCreateRequest(true)}
                >
                    Создать заявку
                </TButton>
            }
        >
            <div>
                {createRequest && (
                    <Formik>
                        <div className="flex flex-col gap-8 items-start">
                            <FormInput
                                label="ПИНФЛ"
                                variant="outlined"
                                placeholder="697256927598"
                                name="pinfl"
                                type="text"
                                className={"!w-[320px]"}
                            />
                            <TButton
                                variant="filled"
                                bgColor={"primary"}
                                className="bg-[#039855]"
                            >
                                Далее
                            </TButton>
                        </div>
                    </Formik>
                )}
                {!createRequest && (
                    <Table
                        columns={columns}
                        request={request}
                        onSearch={(ev) => replaceQuery({ query: ev })}
                        onTabChange={(ev) => replaceQuery({ tab: ev })}
                        withHeader={true}
                        withSearch={true}
                        withConfig={true}
                        onFilter
                        withExport
                        tabs={tableTabs}
                        searchPlaceholder={"Поиск"}
                        useFilter={useFilter}
                    />
                )}
            </div>
        </ContentLayout>
    );
}

export default Applications;
