import React, { useState, FC, useEffect } from "react";
import { EyeIcon } from "@/components/icons/eye-icon";
import DownloadIcon from "@/components/icons/DownloadIcon";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    editNewEmployeeFix,
    getEmployeeRotationsById,
} from "@/data/hr/employee";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import { Controller, useForm } from "react-hook-form";
import {
    ZNumericFormat,
    ZTextField,
} from "@/components/z-components/FormElements";
import { openToast } from "@/components/notification";
import {
    getErrorMessages,
    getFileExtension,
    getFilePath,
    getSuccessMessage,
} from "@/utils/common";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import { useParams, useRouter } from "next/navigation";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import useAppLocale from "@/hooks/helpers/useAppLocale";
import FileViewer from "@/components/z-components/FormElements/ZFileUploader/FileViewer";
import ZButton from "@/components/z-components/ZButton";
import { formatDateTime } from "@/services/time";

interface ChangePositonProps {
    id: string;
    defaultValues?: Record<string, any>;
    handleSubmit: (values: any) => void;
    pending: boolean;
}

const FixSalaryEmployee: FC<ChangePositonProps> = () => {
    const { getWord } = useKeyTranslation();
    const { t } = useAppTranslations();
    const locale = useAppLocale();
    const { id } = useParams();
    const router = useRouter();
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
    const { register, control, handleSubmit, reset } = useForm({
        defaultValues,
    });
    const [modalVisible, setModalVisible] = useState(false);
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
                    <p>{formatDateTime(row?.createdAt).date}</p>
                    <p>{formatDateTime(row?.createdAt).time}</p>
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

    const updateMutate = useMutation({
        mutationFn: editNewEmployeeFix,
        mutationKey: ["edit-new-employee-fix"],
        onSuccess: (res) => {
            openToast({ variant: "success", message: getSuccessMessage(res) });
            router.push("/portal/tasks/tasks", { scroll: true });
        },
        onError: (err) => {
            openToast({
                variant: "error",
                message: getErrorMessages(err as any, false),
            });
        },
    });
    const onSubmit = handleSubmit((values: any) => {
        updateMutate.mutate({
            id,
            salarySupplement: values?.salarySupplement,
        });
    });
    return (
        <form onSubmit={onSubmit}>
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
                            <p
                                className="text-neutral-800
                     text-2xl font-sans font-medium"
                            >
                                {t("Новая должность")}
                            </p>
                        </div>
                        <div className="gap-8 grid grid-cols-4 pb-8 flex-wrap">
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
                            <Controller
                                name="newSalary"
                                control={control}
                                render={({ field }) => (
                                    <ZNumericFormat
                                        inputProps={{
                                            label: t("Оклад"),
                                            endIcon: "UZS",
                                        }}
                                        {...field}
                                        disabled
                                    />
                                )}
                            />
                            <Controller
                                name="newTotalAmount"
                                control={control}
                                render={({ field }) => (
                                    <ZNumericFormat
                                        inputProps={{
                                            label: t("Сумма к получению"),
                                        }}
                                        {...field}
                                        disabled
                                    />
                                )}
                            />
                            <Controller
                                name="salarySupplement"
                                control={control}
                                render={({ field }) => (
                                    <ZNumericFormat
                                        inputProps={{
                                            label: t("Надбавка к окладу"),
                                            endIcon: "%",
                                        }}
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className="">
                        <p className="text-neutral-800 text-2xl font-sans font-medium">
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
                    <div className="w-full flex justify-start items-center">
                        <ZButton
                            type="submit"
                            className={"mt-8 bg-primary text-white"}
                        >
                            {t("Подтвердить")}
                        </ZButton>
                    </div>
                </div>
            </div>
        </form>
    );
};
export default FixSalaryEmployee;
