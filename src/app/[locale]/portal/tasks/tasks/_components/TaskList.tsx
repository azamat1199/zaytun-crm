import DeleteConfirmation from "@/components/DeleteConfirmation";
import { openToast } from "@/components/notification";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import useZDataGridContext from "@/components/z-components/ZDataGrid/ZDataGridProvider/useZDataGridContext";
import ZStatusTag from "@/components/z-components/ZStatusTag";
import { deleteRole } from "@/data/roles";
import { TASK_PRIORITY, TaskModel } from "@/data/task";
import { getTasks } from "@/data/task/task.requests";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import {
    calculateTimeDifference,
    formatDate,
    formatDateTime,
} from "@/services/time";
import {
    getErrorMessages,
    getSuccessMessage,
    selectDataWithPagination,
} from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StatusTag } from "@zaytun/components";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";

import { useMemo, useState } from "react";

const TaskList = () => {
    const { t } = useAppTranslations();
    const [selectedRoleId, setSelectedRoleId] = useState<null | string>(null);
    const pathname = usePathname();
    const router = useRouter();
    const { getWord, getWord2 } = useKeyTranslation();
    const { debouncedSearch, page, size } = useZDataGridContext();

    const { data, refetch, isLoading } = useQuery({
        queryKey: ["task-list", { page, size, search: debouncedSearch }],
        queryFn: () =>
            getTasks({
                page,
                size,
                search: debouncedSearch || "",
            }),
        select: selectDataWithPagination<TaskModel>,
    });
    const deleteMutation = useMutation({
        mutationFn: deleteRole,
        mutationKey: ["delete", { selectedRoleId }],
        onSuccess: (res) => {
            refetch();
            openToast({ variant: "success", message: getSuccessMessage(res) });
            setSelectedRoleId(null);
        },
        onError: (err: AxiosError) => {
            openToast({ variant: "error", message: getErrorMessages(err) });
        },
    });

    const handleDelete = () => deleteMutation.mutate(selectedRoleId as string);

    const priorityVariants: Record<TASK_PRIORITY, string> = {
        [TASK_PRIORITY.LOW]: "warning",
        [TASK_PRIORITY.HIGH]: "high",
        [TASK_PRIORITY.MEDIUM]: "medium",
    };

    const columns = useMemo(
        () => [
            {
                label: t("Дата создания"),
                key: "createdAt",
                width: "w-[7%]",
                cellRender: (row: any) => {
                    const { time, date } = formatDateTime(row.createdAt);
                    return (
                        <div className="flex flex-col">
                            <span>{time}</span>
                            <span>{date}</span>
                        </div>
                    );
                },
            },
            {
                label: t("Код ЦБУ"),
                key: "codeCBU",
                width: "w-[7%]",
            },
            {
                label: t("ID"),
                key: "uniqueNumber",
                width: "w-[10%]",
            },
            {
                label: t("Название задачи"),
                key: "createdAt",
                cellRender: (row: any) => (
                    <span className="break-all">
                        {t(row.taskTemplate?.type)}
                    </span>
                ),
                width: "w-[15%]",
            },

            {
                label: t("Процесс"),
                key: "createdAt",
                cellRender: (row: any) => (
                    <span className="break-all">
                        {t(row.actualProcess?.processTemplate?.type)}
                    </span>
                ),
                width: "w-[10%]",
            },
            {
                label: t("Отвественный"),
                key: "",
                width: "w-[12%]",
                cellRender: (row: any) => (
                    <>
                        <span>
                            {getWord2(row.assignedEmployee, "firstName")}{" "}
                            {getWord2(row.assignedEmployee, "lastName")}
                        </span>
                        <span>
                            {getWord2(row.assignedEmployee, "middleName")}
                        </span>
                    </>
                ),
                className: "flex flex-col items-baseline",
            },
            {
                label: t("Крайний срок"),
                key: "deadline",
                width: "w-[10%]",
                cellRender: (_row: any, _i: number, value: any) =>
                    formatDate(value),
            },
            {
                label: t("Приоритет задачи"),
                key: "priority",
                width: "w-[6%]",
                cellRender: (_row: any, _i: any, value: TASK_PRIORITY) => (
                    <StatusTag
                        value={value}
                        variant={priorityVariants?.[value] || "blue"}
                    />
                ),
            },
            {
                label: t("SLA"),
                key: "deadline",
                width: "w-[9%]",
                cellRender: (_row: any, _i: any, value: any) => {
                    if (!value) {
                        return "-";
                    }
                    const { renderValue, days } =
                        calculateTimeDifference(value);

                    return (
                        <ZStatusTag
                            className="w-full"
                            color={Number(days) > 1 ? "success" : "danger"}
                        >
                            {renderValue}
                        </ZStatusTag>
                    );
                },
            },
            {
                label: t("Статус"),
                key: "status",
                width: "w-[6%]",
                cellRender: (row: any) => (
                    <StatusTag
                        variant={row.status === "NEW" ? "success" : "warning"}
                        value={row.status}
                    />
                ),
            },
        ],
        [t],
    );

    const buttons = [
        {
            value: "1",
            children: t("Все"),
        },
        {
            value: "2",
            children: t("За день"),
        },
        {
            value: "3",
            children: t("За неделю"),
        },
        {
            value: "4",
            children: t("За месяц"),
        },
        {
            value: "5",
            children: t("За квартал"),
        },
    ];

    const contextMenu = [
        {
            label: t("Редактировать"),
            onClick: (id: string) => {
                router.push(`${pathname}/edit/${id}`);
            },
        },
        {
            label: t("Удалить"),
            onClick: (id: string) => {
                setSelectedRoleId(id);
            },
            rootClassName: "text-c_error-600",
        },
    ];

    const handleRowDoubleClick = (id: string, i: number) => {
        const row = data?.list[i];
        router.push(
            `${pathname}/${row?.id}?task-code=${row?.taskTemplate?.type}`,
        );
    };

    return (
        <>
            <ZDataGrid
                hasCheckbox={true}
                hasActions={true}
                contextMenu={contextMenu}
                buttons={buttons}
                columns={columns}
                rows={data?.list || []}
                pagination={{
                    totalPages: data?.totalPages,
                }}
                buttonKey="tab"
                loading={isLoading}
                handleRowDoubleClick={handleRowDoubleClick}
                
            />
            <DeleteConfirmation
                subTitle={t("Вы хотите удалить роль")}
                handleCloseModal={() => setSelectedRoleId(null)}
                handleDelete={handleDelete}
                open={Boolean(selectedRoleId)}
                pending={deleteMutation.isPending}
            />
        </>
    );
};

export default TaskList;
