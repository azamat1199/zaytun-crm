import React, { useState, FC, useEffect } from "react";
import { Modal, TButton } from "@zaytun/components";
import ZDatePicker from "@/components/z-components/FormElements/ZDatePicker/ZDatePicker";
import { EyeIcon } from "@/components/icons/eye-icon";
import { separateDateTime } from "@/utils/dateUtils";
import DownloadIcon from "@/components/icons/DownloadIcon";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editNewEmployee, getEmployeeRotationsById } from "@/data/hr/employee";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import Reason from "../../../app/[locale]/hr/staffs/staffs/change-position/_components/_components/page";
import { Controller, useForm } from "react-hook-form";
import { ZTextField } from "@/components/z-components/FormElements";
import { openToast } from "@/components/notification";
import {
    getErrorMessages,
    getFileExtension,
    getFilePath,
    getSuccessMessage,
} from "@/utils/common";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import { useParams, useRouter } from "next/navigation";
import useAppLocale from "@/hooks/helpers/useAppLocale";
import FileViewer from "@/components/z-components/FormElements/ZFileUploader/FileViewer";

interface ChangePositonProps {
    id: string;
    defaultValues?: Record<string, any>;
    handleSubmit: (values: any) => void;
    setCurrentComponent: Record<any, any>;
    pending: boolean;
}

const ChangePosition: FC<ChangePositonProps> = () => {
    const { getWord } = useKeyTranslation();
    const { id } = useParams();
    const { data } = useQuery({
        queryFn: () => getEmployeeRotationsById(id as string),
        queryKey: ["employee-rotations", { id }],
        enabled: Boolean(id),
        select: (res) => res.data?.result?.data,
    });
    const defaultValues = {
        department: getWord(
            data?.newEmployment?.department?.departmentTemplate
                ?.localaziableName,
        ),
        branch: getWord(
            data?.newEmployment?.department?.branch?.localaziableName,
        ),
        position: getWord(data?.newEmployment?.position?.localaziableName),
        level: data?.level,
        newSalary: data?.newSalary,
        newTotalAmount: data?.newTotalAmount,
        salarySupplement: data?.salarySupplement,
    };

    const { register, handleSubmit, control, reset } = useForm({
        defaultValues,
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [reasonModal, setReasonModal] = useState(false);
    // Accessing the pathname
    const [reason, setReason] = useState("");
    const { t } = useAppTranslations();
    useEffect(() => {
        reset(defaultValues);
    }, [data]);

    const listData = data?.documents || [];
    const column = [
        {
            label: t("Дата создания"),
            key: "createdAt",
            cellRender: (row: any) => (
                <div className={"align-middle"}>
                    <p>{separateDateTime(row?.createdAt).date}</p>
                    <p>{separateDateTime(row?.createdAt).second}</p>
                </div>
            ),
            width: "w-[34%]",
        },
        {
            label: t("Название документа"),
            key: "documentType",
            width: "w-[34%]",
        },
        {
            label: t("Кем создан"),
            key: "creator",
            width: "w-[34%]",
        },
        {
            label: "",
            key: "currency",
            width: "w-[34%]",
            cellRender: (row: any) => (
                <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => setModalVisible(true)}
                >
                    <FileViewer
                        open={modalVisible}
                        src={getFilePath(row?.attachment?.filePath)}
                        extension={getFileExtension(row?.attachment?.fileName)}
                        fileName={row?.attachment?.fileName || ""}
                        handleClose={() => setModalVisible(false)}
                    />
                    <EyeIcon color={"#039855"} />
                    <p className={"text-primary underline"}>
                        {t("Посмотреть")}
                    </p>
                </div>
            ),
        },
        {
            label: "",
            key: "type",
            width: "w-[8%]",
            cellRender: () => (
                <div
                    className="flex items-center border-2 justify-around
           p-2 pl-1 pr-1 rounded-md cursor-pointer"
                    onClick={() => console.log("download file")}
                >
                    <DownloadIcon size={"md"} />
                </div>
            ),
        },
    ];
    const locale = useAppLocale();
    const router = useRouter();
    const updateMutate = useMutation({
        mutationFn: editNewEmployee,
        mutationKey: ["edit-new-employee"],
        onSuccess: (res) => {
            openToast({ variant: "success", message: getSuccessMessage(res) });
            setReasonModal(false);
            router.push("/portal/tasks/tasks", { scroll: true });
        },
        onError: (err) => {
            openToast({
                variant: "error",
                message: getErrorMessages(err as any, false),
            });
        },
    });
    const handleSubmitData = handleSubmit(() => {
        updateMutate.mutate({
            reason: reason,
            rotationId: data?.id,
            action: false,
            employeeId: id,
        });
    });
    const onSubmit = handleSubmit(() => {
        updateMutate.mutate({
            rotationId: data?.id,
            action: true,
            employeeId: id,
        });
    });

    return (
        <form>
            <div>
                <div className="flex flex-col gap-8">
                    <div className={"border-b pb-8"}>
                        <p
                            className={
                                "text-primary text-2xl font-medium underline"
                            }
                        >
                            TURAEV AMIR TURAEVICH
                        </p>
                    </div>
                    <div className="border-b">
                        <div className="pb-8">
                            <p className="text-neutral-800text-2xl font-sans font-medium">
                                {t("Новая должность")}
                            </p>
                        </div>
                        <div className="grid grid-cols-4 gap-8 pb-8 ">
                            <ZTextField
                                label={t("Офис продаж")}
                                {...register("branch")}
                                disabled
                            />
                            <ZTextField
                                label={t("Отдел и сектор")}
                                {...register("department")}
                                disabled
                            />
                            <ZTextField
                                label={t("Должность")}
                                {...register("position")}
                                disabled
                            />
                            <ZTextField
                                label={t("Разряд")}
                                {...register("level")}
                                disabled
                            />
                            <ZTextField
                                label={t("ПИНФЛ")}
                                {...register("pinfl")}
                                disabled
                            />
                            <Controller
                                control={control}
                                name="birthDate"
                                render={({ field }) => (
                                    <ZDatePicker
                                        {...field}
                                        label={t("Дата рождения")}
                                        disabled
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="">
                        <p
                            className="text-neutral-800
                    text-2xl font-sans font-medium"
                        >
                            {t("Основание")}
                        </p>
                    </div>
                    <ZDataGridProvider
                        values={{
                            filter: {},
                        }}
                    >
                        <ZDataGrid
                            rows={listData}
                            columns={column}
                            hasActions={false}
                            hasFilter={false}
                            hasExport={false}
                            hasSettings={false}
                            hasSearch={false}
                            buttonKey={""}
                            withPagination={false}
                        />
                    </ZDataGridProvider>
                    <div className="w-full flex justify-between items-center">
                        <TButton
                            variant={"filled"}
                            className={"mt-8 !bg-warning-500"}
                            onClick={() => setReasonModal(true)}
                        >
                            {t("Вернуть на доработку")}
                        </TButton>
                        <Modal
                            open={reasonModal}
                            size={"sm"}
                            onHandleChange={() =>
                                setReasonModal((prev) => !prev)
                            }
                        >
                            <Reason
                                setReason={setReason}
                                setReasonModal={setReasonModal}
                                t={t}
                                handleSubmit={handleSubmitData}
                            />
                        </Modal>
                        <TButton
                            type="submit"
                            onClick={onSubmit}
                            variant={"filled"}
                            className={"mt-8"}
                        >
                            {t("Подтвердить")}
                        </TButton>
                    </div>
                </div>
            </div>
        </form>
    );
};
export default ChangePosition;
