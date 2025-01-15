import React, { FC, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    ZDatePicker,
    ZNumericFormat,
    ZTextField,
} from "@/components/z-components/FormElements";
import ZDivider from "@/components/z-components/ZDivider";
import { TButton } from "@zaytun/components";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    editSalaryRecalculation,
    getEmployeeRotationsById,
} from "@/data/hr/employee";
import { openToast } from "@/components/notification";
import {
    getErrorMessages,
    getFileExtension,
    getFilePath,
    getSuccessMessage,
} from "@/utils/common";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import { EyeIcon } from "@/components/icons/eye-icon";
import DownloadIcon from "@/components/icons/DownloadIcon";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import { useParams, useRouter } from "next/navigation";
import FileViewer from "@/components/z-components/FormElements/ZFileUploader/FileViewer";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatDateTime } from "@/services/time";

interface ChangeEmployeePositionFormProps {
    defaultValues?: Record<string, any>;
    handleSubmit: (values: any) => void;
    employmentData: Record<string, any>;
    setCurrentComponent: Record<any, any>;
    pending: boolean;
    id: string;
}

const SalaryRecalculation: FC<ChangeEmployeePositionFormProps> = () => {
    const { t } = useAppTranslations();
    const { getWord } = useKeyTranslation();
    const { id } = useParams();
    const [modalVisible, setModalVisible] = useState(false);
    const { data } = useQuery({
        queryFn: () => getEmployeeRotationsById(id as string),
        queryKey: ["employee-rotations", { id }],
        enabled: Boolean(id),
        select: (res) => res.data?.result?.data,
    });
    const validatiomSchema = object({
        salarySupplement: string().required("Поле обязательно"),
    });
    const defaultValues = {
        department: getWord(
            data?.employee?.employment?.department?.departmentTemplate
                ?.localaziableName,
        ),
        branch: getWord(
            data?.employee?.employment?.department?.branch?.localaziableName,
        ),
        position: getWord(
            data?.employee?.employment?.position?.localaziableName,
        ),
        pinfl: data?.employee?.pinfl,
        birthDate: data?.employee?.birthDate,
        departmentNew: getWord(
            data?.newEmployment?.department?.departmentTemplate
                ?.localaziableName,
        ),
        branchNew: getWord(
            data?.newEmployment?.department?.branch?.localaziableName,
        ),
        positionNew: getWord(data?.newEmployment?.position?.localaziableName),
        level: data?.level,
        newSalary: data?.newSalary,
        newTotalAmount: data?.newTotalAmount,
        salarySupplement: data?.salarySupplement,
    };
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm({
        defaultValues,
        resolver: yupResolver(validatiomSchema),
    });
    const listD = data?.documents || [];
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
    useEffect(() => {
        reset(defaultValues);
    }, [data]);

    const router = useRouter();
    const updateMutate = useMutation({
        mutationFn: editSalaryRecalculation,
        mutationKey: ["edit-new-employee"],
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
            salarySupplement: Number(values?.salarySupplement),
            newSalary: data?.newSalary,
            newTotalAmount: data?.newTotalAmount,
            level: data?.level,
        });
    });
    return (
        <form onSubmit={onSubmit}>
            <div className={"border-b pb-8 mb-8"}>
                <p className={"text-primary text-2xl font-medium underline"}>
                    TURAEV AMIR TURAEVICH
                </p>
            </div>
            <div className="pb-8">
                <p className="text-neutral-800 text-2xl font-medium">
                    {t("Текущая должность")}
                </p>
            </div>
            <div className="grid grid-cols-4 gap-8 mb-8">
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
            <ZDivider />
            <div className="pb-8 mt-8">
                <p className="text-neutral-800 text-2xl font-medium">
                    {t("Новая должность")}
                </p>
            </div>
            <div className={"grid grid-cols-4 mb-8 gap-8"}>
                <ZTextField
                    label={t("Офис продаж")}
                    {...register("branchNew")}
                    disabled
                />
                <ZTextField
                    label={t("Отдел и сектор")}
                    {...register("departmentNew")}
                    disabled
                />
                <ZTextField
                    label={t("Должность")}
                    {...register("positionNew")}
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
                            inputProps={{ label: t("Оклад"), endIcon: "UZS" }}
                            {...field}
                            disabled
                        />
                    )}
                />{" "}
                <Controller
                    name="newTotalAmount"
                    control={control}
                    render={({ field }) => (
                        <ZNumericFormat
                            inputProps={{ label: t("Сумма к получению") }}
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
                                errors,
                            }}
                            {...field}
                        />
                    )}
                />
            </div>
            <ZDivider />
            <div className={"grid grid-cols-1 gap-8 mb-8"}>
                <div className="pt-8">
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
                        rows={listD}
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
            </div>
            <TButton
                type="submit"
                variant={"filled"}
                className={"mt-8 w-[320px]"}
            >
                {t("Подтвердить")}
            </TButton>
        </form>
    );
};

export default SalaryRecalculation;
