import DeleteConfirmation from "@/components/DeleteConfirmation";
import { openToast } from "@/components/notification";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import useZDataGridContext from "@/components/z-components/ZDataGrid/ZDataGridProvider/useZDataGridContext";
import { deleteRole } from "@/data/roles";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import {
    getErrorMessages,
    getSuccessMessage,
} from "@/utils/common";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import moment from "moment";
import { usePathname, useRouter } from "next/navigation";
import useGetRoles from "@/hooks/api/useGetRoles";
import React, { useMemo, useState } from "react";

const RoleDataGrid = () => {
    const { t } = useAppTranslations();
    const [selectedRoleId, setSelectedRoleId] = useState<null | string>(null);
    const pathname = usePathname();
    const router = useRouter();
    const { getWord } = useKeyTranslation();
    const { debouncedSearch, page, size } = useZDataGridContext();

    const { data, refetch, isLoading } = useGetRoles({
        page,
        size,
        search: debouncedSearch,
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

    const columns = useMemo(
        () => [
            {
                label: t("Название роли"),
                key: "type",
                cellRender: (row) => {
                    return (
                        <span className="text-b-2-m line-clamp-1 overflow-hidden overflow-ellipsis break-all font-medium text-c_neutral-600">
                            {getWord(row.localaziableName)}
                        </span>
                    );
                },
                width: "w-[15%]",
            },
            {
                label: t("Описание роли"),
                key: "description",
                width: "w-[27%]",
            },
            {
                label: t("Кол-во пользователей"),
                key: "countUsers",
                width: "w-[20%]",
            },
            {
                label: t("Дата создания"),
                key: "createdAt",
                cellRender: (row) => {
                    return (
                        <div className="flex flex-col">
                            <span>
                                {" "}
                                {moment(row?.createdAt).format("HH:MM")}
                            </span>
                            <span>
                                {" "}
                                {moment(row.createdAt).format("DD.MM.YYYY")}
                            </span>
                        </div>
                    );
                },
                width: "w-[15%]",
            },

            {
                label: t("Кем создан"),
                key: "initialPage",
                width: "w-[20%]",
                cellRender: (row) => {
                    return (
                        <div className="flex flex-col">
                            <span>{row.createdByFullName}</span>
                            <span>{getWord(row.localaziableName)}</span>
                        </div>
                    );
                },
            },
        ],
        [],
    );

    const contextMenu = [
        {
            label: t("Клонировать"),
            onClick: (id: string) => {
                router.push(`${pathname}/clone/${id}`);
            },
        },
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

    return (
        <>
            <ZDataGrid
                contextMenu={contextMenu}
                buttons={[]}
                columns={columns}
                rows={data?.list || []}
                pagination={{
                    totalPages: data?.totalPages,
                }}
                buttonKey="tab"
                loading={isLoading}
                // handleRowDoubleClick={(id: string) => router.push(`${pathname}/${id}`)}
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

export default RoleDataGrid;
