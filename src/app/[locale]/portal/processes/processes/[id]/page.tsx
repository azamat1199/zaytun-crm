"use client";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { TButton } from "@zaytun/components";
import cx from "classnames";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import { SimpleMainInfo } from "@/components/simple-main-info/SimpleMainInfo";
import { InfoCircleIcon } from "@/components/icons/info-circle-icon";
import { getProcessListId } from "@/data/process/process.requests";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import ContentLayout from "@/components/layouts/ContentLayout";
import { ReloadIcon } from "@/components/icons/reload-icon";
import UnderlineTabs from "@/components/tabs/UnderlineTabs";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import StatusTag from "@/components/status-tag/StatusTag";
import { Checkbox } from "@/components/checkbox/Checkbox";
import Comments from "@/components/comments/Comments";
import useFilter from "@/hooks/useFilter";
import {
    formatCreatedAtTime,
    formatCreatedAtDate,
} from "@/utils/timeFormatter";

const tabsData = [
    { label: "Задачи", value: "task" },
    { label: "История", value: "history" },
];

const historyColumns: any[] = [
    {
        headerName: (
            <div className="flex items-center">
                <Checkbox label={null} name={"created"} checked={null} />
                <span>Дата создания</span>
            </div>
        ),
        field: "created_data",
        width: 600,
        renderCell: (row: any) => {
            return (
                <div className="flex items-center">
                    <Checkbox label={null} name={"created"} checked={null} />
                    <div className="flex flex-col">
                        <span>{row.assignedDate}</span>
                        <span>{row.assignedDate}</span>
                    </div>
                </div>
            );
        },
    },
    {
        headerName: "Действие",
        field: "act",
        width: 1150,
    },
];

export default function Page() {
    const { filters, replaceQuery } = useFilter({});
    const individualTab = filters?.tab === "history";
    const pathname = usePathname();
    const { getWord } = useKeyTranslation();

    const listId = pathname.split("processes/")[2];

    const { data, isLoading } = useQuery({
        queryKey: ["appeals-list-id", filters],
        queryFn: () => getProcessListId(listId),
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
    const taskColumns = [
        {
            label: "Дата создания",
            width: "15%",
            key: "createdAt",
            cellRender: (row: any) => {
                return (
                    <div className="flex items-center">
                        <div className="flex flex-col">
                            <span> {formatCreatedAtTime(row?.createdAt)}</span>
                            <span> {formatCreatedAtDate(row?.createdAt)} </span>
                        </div>
                    </div>
                );
            },
        },
        {
            width: "15%",
            label: (
                <div className="flex items-center">
                    <span>ID</span>
                </div>
            ),
            key: "uniqueNumber",
            cellRender: (row) => {
                return (
                    <div className="flex">
                        <div className="flex flex-col">
                            <span>{row.uniqueNumber}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            label: "Название задачи",
            width: "15%",
            key: "taskTemplate",
            cellRender: (row) => {
                return (
                    <div className="flex">
                        <div className="flex flex-col">
                            <span>
                                {getWord(
                                    row.taskTemplate?.processTemplate
                                        ?.localaziableName,
                                )}
                            </span>
                        </div>
                    </div>
                );
            },
        },
        {
            label: "Ответственный",
            width: "15%",
            key: "assignedEmployee",
            cellRender: (row) => {
                return (
                    <div className="flex">
                        <div className="flex flex-col">
                            <span>{row?.assignedEmployee?.firstNameLat}</span>
                            <span>{row?.assignedEmployee?.lastNameLat}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            label: "Крайний срок",
            width: "15%",
            key: "updatedAt",
            cellRender: (row: any) => {
                return (
                    <div className="flex items-center">
                        <div className="flex flex-col">
                            <span> {formatCreatedAtTime(row?.updatedAt)}</span>
                            <span> {formatCreatedAtDate(row?.updatedAt)} </span>
                        </div>
                    </div>
                );
            },
        },
        {
            label: "Приоритет задачи ",
            width: "15%",
            key: "priority",
            cellRender: (row) => {
                return (
                    <div>
                        <StatusTag
                            variant={cx({
                                canceled: "LOW" === row?.priority,
                                success: "NEW" === row?.priority,
                                passive: "Обычный" === row?.priority,
                            })}
                            value={row.priority}
                        />
                    </div>
                );
            },
        },
        {
            label: "SLA",
            width: "15%",
            key: "sla",
            cellRender: (row) => {
                return (
                    <div>
                        <StatusTag
                            variant={cx({
                                canceled: "20 часов" === row?.sla,
                                success: "2 дня" === row?.sla,
                            })}
                            value={row.sla}
                        />
                    </div>
                );
            },
        },
        {
            label: "Статус",
            width: "15%",
            key: "status",
            cellRender: (row) => {
                return (
                    <div>
                        <StatusTag
                            variant={cx({
                                success: "NEW" === row.status,
                                process: "В обработке" === row.status,
                                passive: "FINISH" === row.status,
                            })}
                            value={row.status}
                        />
                    </div>
                );
            },
        },
        {
            label: "",
            width: "15%",
            key: "action",
            cellRender: () => (
                <div className="flex gap-3">
                    <InfoCircleIcon />
                    <ReloadIcon className={undefined} />
                </div>
            ),
        },
    ];

    return (
        <ContentLayout
            title="Карточка процесса"
            rightActions={
                <TButton variant="filled" bgColor={"primary"}>
                    Массовые действия
                </TButton>
            }
        >
            <UnderlineTabs
                data={tabsData}
                className={"mb-5"}
                onChange={(item: { label: string; value: string }) =>
                    replaceQuery({ tab: item.value })
                }
            />
            <div className="flex gap-8">
                <div className=" w-3/4">
                    <ZDataGridProvider
                        values={{ filter: {}, keyExtractor: "id" }}
                    >
                        <ZDataGrid
                            hasCheckbox
                            hasActions={false}
                            buttons={buttons}
                            columns={
                                individualTab ? historyColumns : taskColumns
                            }
                            rows={data?.data?.result?.data?.tasks || []}
                            buttonKey="tab"
                            loading={isLoading}
                            pagination={{
                                totalPages: undefined,
                                defaultPage: undefined,
                            }}
                        />
                    </ZDataGridProvider>
                </div>
                <div className="flex flex-col gap-6">
                    <SimpleMainInfo />
                    <Comments
                        commentedText={data?.data?.result?.data?.comments}
                    />
                </div>
            </div>
        </ContentLayout>
    );
}
