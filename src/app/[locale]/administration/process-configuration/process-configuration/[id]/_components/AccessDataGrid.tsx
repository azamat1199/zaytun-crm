import TableEdit from "@/components/icons/TableEdit";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import React, { useCallback, useState } from "react";
import AccessFormModal from "./AccessFormModal";
import { useMutation } from "@tanstack/react-query";
import {
    ProcessSettingsCreateDto,
    createProcessSettings,
    deleteProcessSettings,
    updateProcessSettings,
} from "@/data/process-settings";
import { openToast } from "@/components/notification";
import { getErrorMessages, getSuccessMessage } from "@/utils/common";
import { useParams } from "next/navigation";
import TableTrash from "@/components/icons/TableTrash";
import useGetProcessSettings from "@/hooks/api/useGetProcessSettings";
import useZDataGridContext from "@/components/z-components/ZDataGrid/ZDataGridProvider/useZDataGridContext";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import { ZCheckbox } from "@/components/z-components/FormElements";
import { formatDateTime } from "@/services/time";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import get from "lodash.get";
import { AxiosError, AxiosResponse } from "axios";

const AccessDataGrid = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useAppTranslations();
    const { getWord } = useKeyTranslation();
    const [selectedProcessSettings, setSelectedProcessSettings] =
        useState<any>(null);
    const [modal, setModal] = useState<"delete" | "edit" | "create" | "closed">(
        "closed",
    );
    const { page, size } = useZDataGridContext();

    const { data, isLoading, refetch, isRefetching } = useGetProcessSettings({
        page,
        size,
    });

    const handleClose = useCallback(() => setModal("closed"), []);

    const handleSuccess = (res: AxiosResponse) => {
        refetch();
        setModal("closed");
        openToast({ variant: "success", text: getSuccessMessage(res) });
    };

    const handleError = (err: AxiosError) =>
        openToast({ variant: "error", text: getErrorMessages(err, false) });

    const deleteMutation = useMutation({
        mutationFn: deleteProcessSettings,
        mutationKey: ["delete-mutation"],
        onSuccess: handleSuccess,
        onError: handleError,
    });

    const updateMutation = useMutation({
        mutationFn: updateProcessSettings,
        mutationKey: ["update-process-settings"],
        onSuccess: handleSuccess,
        onError: handleError,
    });

    const accessColumns = [
        {
            label: t("Роль"),
            key: "role",
            cellRender: ({ role }: any) => getWord(role?.localaziableName),
            width: "w-[10%]",
        },
        {
            label: t("Разрешения"),
            key: "",
            cellRender: ({ canCreate, canPause, canStop }: any) => (
                <div className="flex gap-4">
                    <div className="flex items-center gap-3">
                        <ZCheckbox readOnly checked={canCreate} />{" "}
                        <span>{t("Запуск")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ZCheckbox readOnly checked={canPause} />{" "}
                        <span>{t("Пауза")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ZCheckbox checked={canStop} />{" "}
                        <span>{t("Отмена")}</span>
                    </div>
                </div>
            ),
            width: "w-[30%]",
        },
        {
            label: t("Кем добавлен"),
            key: "createdByUser",
            width: "w-[25%]",
        },
        {
            label: t("Дата добавления"),
            key: "createdAt",
            width: "w-[20%]",
            cellRender: (row: any) => {
                const { date, time } = formatDateTime(row.createdAt);

                return (
                    <div className="flex flex-col">
                        <span>{date}</span>
                        <span>{time}</span>
                    </div>
                );
            },
        },
    ];

    const addMutation = useMutation({
        mutationFn: createProcessSettings,
        mutationKey: ["create-process-settings"],
        onSuccess: handleSuccess,
        onError: handleError,
    });

    const actionButtons = [
        {
            children: <TableEdit size="md" />,
            onClick: (row: any) => {
                setModal("edit");
                setSelectedProcessSettings(row);
            },
        },
        {
            children: (
                <TableTrash className="[&>path]:stroke-c_error-500" size="md" />
            ),
            onClick: (row: any) => {
                setModal("delete");
                setSelectedProcessSettings(row);
            },
        },
    ];

    const add = useCallback((values: ProcessSettingsCreateDto) => {
        addMutation.mutate({ ...values, processTemplate: { id } });
    }, []);

    const update = useCallback((values: ProcessSettingsCreateDto) => {
        updateMutation.mutate({ processTemplate: { id }, ...values });
    }, []);

    const defaultValues = {
        id: selectedProcessSettings?.id,
        role: {
            label: getWord(
                get(selectedProcessSettings, "role.localaziableName"),
            ),
            value: selectedProcessSettings?.role?.id,
        },
        canCreate: selectedProcessSettings?.canCreate,
        canStop: selectedProcessSettings?.canStop,
        canPause: selectedProcessSettings?.canPause,
    };

    const handleDelete = () =>
        deleteMutation.mutate(selectedProcessSettings?.id);

    return (
        <>
            <ZDataGrid
                hasAddButton={true}
                hasSearch={false}
                columns={accessColumns}
                rows={data?.list || []}
                actionButtons={actionButtons}
                actionsType="buttons"
                hasActions
                addButtonProps={{
                    onClick: () => setModal("create"),
                }}
                loading={isLoading || isRefetching}
            />

            <AccessFormModal
                open={modal === "create"}
                defaultValues={{}}
                pending={addMutation.isPending}
                handleClose={handleClose}
                title={t("Добавить")}
                handleSubmit={add}
            />

            <AccessFormModal
                open={modal === "edit"}
                defaultValues={defaultValues}
                pending={updateMutation.isPending}
                handleClose={handleClose}
                title={t("Обновить")}
                handleSubmit={update}
            />

            <DeleteConfirmation
                subTitle={`${t("Вы хотите удалить его")}?`}
                open={modal === "delete"}
                handleCloseModal={handleClose}
                pending={deleteMutation.isPending}
                handleDelete={handleDelete}
            />
        </>
    );
};

export default AccessDataGrid;
