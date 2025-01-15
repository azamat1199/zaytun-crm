import React, { FC, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    ZDatePicker,
    ZFileUploader,
    ZNumericFormat,
    ZTextField,
} from "@/components/z-components/FormElements";
import ZDivider from "@/components/z-components/ZDivider";
import ZReactSelect from "@/components/z-components/ZReactSelect";
import useBranches from "@/hooks/api/useBranches";
import useDepartmentsByBranchId from "@/hooks/api/useDepartmentsByBranchId";
import useEmploymentsByDepartmentId from "@/hooks/api/useEmploymentsByDepartmentId";
import { TButton } from "@zaytun/components";
import { useMutation } from "@tanstack/react-query";
import { postEmployeeRotation } from "@/data/hr/employee";
import { openToast } from "@/components/notification";
import { getErrorMessages, isPlainObject } from "@/utils/common";
import { changePositionSerializer } from "@/app/[locale]/hr/staffs/staffs/change-position/serializer";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import { lazy, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface ChangeEmployeePositionFormProps {
    defaultValues?: Record<string, any>;
    handleSubmit: (values: any) => void;
    employmentData: Record<any, any>;
    setCurrentComponent: Record<any, any>;
    pending: boolean;
    id: string;
}

const ChangeEmployeePositionForm: FC<ChangeEmployeePositionFormProps> = ({
    defaultValues,
    employmentData,
    id,
    ...props
}) => {
    const { t } = useAppTranslations();
    const validatiomSchema = object({
        photo: object().test("not-empty", t("Поле обязательно"), (photo) =>
            isPlainObject(photo),
        ),
        department: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().required("Поле обязательно"),
                      value: string().required("Поле обязательно"),
                  })
                : string().required("Поле обязательно"),
        ),
        branch: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().required("Поле обязательно"),
                      value: string().required("Поле обязательно"),
                  })
                : string().required("Поле обязательно"),
        ),
        position: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().required("Поле обязательно"),
                      value: string().required("Поле обязательно"),
                  })
                : string().required("Поле обязательно"),
        ),
        level: string().required("Поле обязательно"),
        newSalary: string().required("Поле обязательно"),
        newTotalAmount: string().required("Поле обязательно"),
        salarySupplement: string().required("Поле обязательно"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        trigger,
        setValue,
        watch,
        reset,
    } = useForm({ defaultValues, resolver: yupResolver(validatiomSchema) });
    const { options } = useBranches();
    const branch = watch("branch");
    const department = watch("department");

    const { options: departmentOptions } = useDepartmentsByBranchId(
        branch?.value,
    );
    const { options: employmentOptions } = useEmploymentsByDepartmentId(
        {departmentId:department?.value,}
    );
    const createRotate = useMutation({
        mutationFn: postEmployeeRotation,
        mutationKey: ["employee-rotation"],
        onSuccess: () => {},
        onError: (err) => {
            openToast({
                variant: "error",
                message: getErrorMessages(err as any, false),
            });
        },
    });
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    const onSubmit = handleSubmit(async (values) => {
        const res =
            (await createRotate.mutateAsync({
                type: "ROTATION_EMPLOYEE",
            })) || "";
        props.handleSubmit(
            changePositionSerializer(
                values,
                id,
                res?.data?.result?.data?.processId,
                employmentData,
            ),
        );
    });

    return (
        <form onSubmit={onSubmit}>
            <div className={"border-b pb-8 mb-8"}>
                <p className={"text-primary text-2xl font-medium underline"}>
                    {t("TURAEV AMIR TURAEVICH")}
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
                    {...register("preBranch")}
                    disabled
                />
                <ZTextField
                    label={t("Отдел и сектор")}
                    {...register("preDepartment")}
                    disabled
                />
                <ZTextField
                    label={t("Должность")}
                    {...register("prePosition")}
                    disabled
                />
                <ZTextField
                    label={t("Разряд")}
                    {...register("preLevel")}
                    disabled
                />
                <ZTextField
                    label={t("ПИНФЛ")}
                    {...register("prePinfl")}
                    disabled
                />
                <Controller
                    control={control}
                    name="preBirthDate"
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
            <div className={"grid grid-cols-1 gap-8 mb-8"}>
                <div className="pt-8">
                    <p className="text-neutral-800 text-2xl font-sans font-medium">
                        {t("Основание")}
                    </p>
                </div>
                <Controller
                    control={control}
                    name="photo"
                    render={({ field }) => (
                        <ZFileUploader
                            whiteList={["pdf"]}
                            label={t("Загрузить фотографию сотрудника")}
                            accept="application/pdf"
                            {...field}
                            onChange={(name, value) => {
                                trigger(name);
                                setValue(name, value);
                            }}
                            errors={errors}
                            server="hr"
                            isPhoto
                        />
                    )}
                />
            </div>
            <ZDivider />
            <div className="pb-8 mt-8">
                <p className="text-neutral-800 text-2xl font-medium">
                    {t("Выберите новую должность")}
                </p>
            </div>
            <div className={"grid grid-cols-4 gap-8"}>
                <Controller
                    control={control}
                    name="branch"
                    render={({ field }) => (
                        <ZReactSelect
                            options={options}
                            label={t("Офис продаж")}
                            enableMenuPortalTarget
                            {...field}
                            errors={errors}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="department"
                    render={({ field }) => (
                        <ZReactSelect
                            label={t("Отдел и сектор")}
                            options={departmentOptions}
                            enableMenuPortalTarget
                            {...field}
                            errors={errors}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="position"
                    render={({ field }) => (
                        <ZReactSelect
                            label={t("Должность")}
                            options={employmentOptions}
                            enableMenuPortalTarget
                            {...field}
                            errors={errors}
                        />
                    )}
                />
                <ZTextField label={t("Разряд")} {...register("level")} />
                <Controller
                    name="newSalary"
                    control={control}
                    render={({ field }) => (
                        <ZNumericFormat
                            inputProps={{ label: t("Оклад"), endIcon: "UZS" }}
                            {...field}
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
                        />
                    )}
                />{" "}
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
            <TButton
                type="submit"
                // onClick={() => setCurrentComponent(2)}
                variant={"filled"}
                className={"mt-8 w-[320px]"}
            >
                {t("Подтвердить")}
            </TButton>
        </form>
    );
};

export default ChangeEmployeePositionForm;
