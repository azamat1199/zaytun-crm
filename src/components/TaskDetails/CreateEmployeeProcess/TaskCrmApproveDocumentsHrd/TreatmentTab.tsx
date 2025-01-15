"use client";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import ZButton from "@/components/z-components/ZButton";
import ZDivider from "@/components/z-components/ZDivider";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import { ZCheckboxItem } from "@/components/z-components/FormElements";
import Skeleton from "react-loading-skeleton";
import { EyeIcon } from "@/components/icons/eye-icon";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import { useGetTaskDetailByIdFromQueryStore } from "@/hooks/api/useGetTaskDetailById";
import { useParams, useRouter } from "next/navigation";
import useGetEmployeeDetailById from "@/hooks/api/useGetEmployeeDetailById";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import { DownloadIcon } from "@/components/icons/download-icon";
import { downloadFile, getFileExtension, getFilePath } from "@/utils/common";
import { useState } from "react";
import FileViewer from "@/components/z-components/FormElements/ZFileUploader/FileViewer";
import { PossibleFileExtensions } from "@/utils/appTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptEmployeeData } from "@/data/employee-create-process";
import useApiToast from "@/hooks/helpers/useApiToast";
import RejectConfirmation from "@/components/RejectConfirmation";

export default function TreatmentTab() {
    const [modal, setModal] = useState<
        "file-viewer" | "reject-confirmation" | "closed"
    >("closed");
    const [selectedFile, setSelectedFile] = useState<any>({});
    const { getWord2 } = useKeyTranslation();
    const { id } = useParams();
    const { t } = useAppTranslations();
    const router = useRouter();
    const { subjectId } = useGetTaskDetailByIdFromQueryStore(id as string);
    const { isLoading, employee } = useGetEmployeeDetailById(subjectId);
    const queryClient = useQueryClient();
    const { successToast, errorToast } = useApiToast();
    const acceptMutation = useMutation({
        mutationFn: acceptEmployeeData,
        mutationKey: ["accept-data"],
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["task-list"] });
            successToast(res);
            router.back();
        },
        onError: (err) => {
            errorToast(err, false);
        },
    });

    const accept = () => {
        acceptMutation.mutate({
            taskId: id as string,
            rejectReason: "",
            accepted: true,
        });
    };

    const baseData = [
        {
            createdAt: "",
            fileName: employee.idCard?.fileName,
            createdBy: "",
            file: employee.idCard,
        },
        {
            createdAt: "",
            fileName: employee.photo?.fileName,
            createdBy: "",
            file: employee.photo,
        },
    ];

    const columns = [
        {
            label: t("Дата создания"),
            key: "createdAt",
            width: "w-[20%]",
        },
        {
            label: t("Название документа"),
            key: "fileName",
            width: "w-[20%]",
        },
        {
            label: t("Кем создан"),
            key: "createdBy",
            width: "w-[20%]",
        },
        {
            label: "",
            key: "",
            width: "w-[20%]",
            cellRender: ({ file }: any) => {
                return (
                    <>
                        <div
                            className="flex items-center gap-3"
                            onClick={() => {
                                setSelectedFile(file);
                                setModal("file-viewer");
                            }}
                        >
                            <EyeIcon />
                            <span className="cursor-pointer underline text-c_primary">
                                {t("Посмотреть")}
                            </span>
                        </div>
                    </>
                );
            },
        },
        {
            label: "",
            key: "",
            width: "w-[20%]",
            className: "flex justify-end",
            cellRender: ({ file }: any) => (
                <ZButton
                    size="sm"
                    onClick={() => downloadFile(file.filePath, file.fileName)}
                    iconButton
                    variant="secondary"
                >
                    <DownloadIcon />
                </ZButton>
            ),
        },
    ];

    const handleCloseModal = () => setModal("closed");

    return (
        <div className="w-full">
            <h3 className="text-h3-r text-primary underline mt-4 uppercase">
                {!isLoading ? (
                    `${getWord2(employee, "lastName")} ${getWord2(employee, "firstName")} ${getWord2(employee, "middleName")} `
                ) : (
                    <Skeleton width={300} height={35} />
                )}
            </h3>
            <ZDivider className="mb-10 mt-10" />
            <h3 className="text-h3-m mb-6 font-medium">{t("Основание")}</h3>

            <ZDataGridProvider values={{ filter: {} }}>
                <ZDataGrid
                    columns={columns}
                    rows={baseData}
                    hasSearch={false}
                    hasActions={false}
                    hasFilter={false}
                    hasExport={false}
                    hasSettings={false}
                    hasCheckbox={false}
                    pagination={{
                        totalPages: undefined,
                        defaultPage: undefined,
                    }}
                />
            </ZDataGridProvider>
            <ZDivider className="my-10" />

            <h3 className="text-h3-m font-medium mb-6">
                {t("Открытие учетной записи")}
            </h3>

            <div className="w-full gap-6 flex">
                <ZCheckboxItem
                    loading={isLoading}
                    label={t("Доступ в банк")}
                    checked={employee.hasAccessBank}
                    disabled
                />
                <ZCheckboxItem
                    label={t("Электронная почта")}
                    checked={employee.hasEmail}
                    disabled
                    loading={isLoading}
                />
                <ZCheckboxItem
                    loading={isLoading}
                    label={t("Учетная запись")}
                    checked={employee.hasAccount}
                    disabled
                />
            </div>
            <ZDivider className="my-10" />
            <div className="flex justify-between items-center">
                <ZButton
                    disabled={acceptMutation.isPending}
                    variant="secondary"
                    color="warning"
                    onClick={() => setModal("reject-confirmation")}
                >
                    {t("Вернуть на доработку")}
                </ZButton>
                <ZButton
                    onClick={accept}
                    pending={acceptMutation.isPending}
                    disabled={acceptMutation.isPending}
                >
                    {t("Подтвердить")}
                </ZButton>
            </div>

            <FileViewer
                open={modal === "file-viewer"}
                src={getFilePath(selectedFile?.filePath)}
                extension={
                    getFileExtension(
                        selectedFile?.fileName,
                    ) as PossibleFileExtensions
                }
                fileName={selectedFile?.fileName || ""}
                handleClose={handleCloseModal}
            />

            <RejectConfirmation
                handleReject={(values) =>
                    acceptMutation.mutate({
                        taskId: id as string,
                        accepted: false,
                        rejectReason: values.rejectReason,
                    })
                }
                handleCloseModal={handleCloseModal}
                pending={acceptMutation.isPending}
                open={modal === "reject-confirmation"}
            />
        </div>
    );
}
