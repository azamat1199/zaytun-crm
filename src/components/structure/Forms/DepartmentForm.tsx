import { openToast } from "@/components/notification";
import TranslateForm from "@/components/TranslateForm";
import {
    ZCheckboxItem,
    ZTextField,
} from "@/components/z-components/FormElements";
import ZReactSelect from "@/components/z-components/ZReactSelect";
import { createDepartmentTemplate } from "@/data/department-template";
import { TranslationKeyModel } from "@/data/translation";
import useDepartmentTemplates from "@/hooks/api/useDepartmentTemplates";
import useEmployeeList from "@/hooks/api/useEmployeeList";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import { getErrorMessages, getSuccessMessage } from "@/utils/common";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface TranslateFormProps {
    handleCancel?: () => void;
    refetch?: () => void;
}

const DepartmentTranslateForm: FC<TranslateFormProps> = ({
    handleCancel,
    refetch,
}) => {
    const createMutate = useMutation({
        mutationFn: createDepartmentTemplate,
        mutationKey: ["create-department"],
        onSuccess: (res) => {
            refetch && refetch();
            handleCancel && handleCancel();
            openToast({ variant: "success", message: getSuccessMessage(res) });
        },
        onError: (err: AxiosError) => {
            openToast({
                variant: "error",
                message: getErrorMessages(err, false),
            });
        },
    });

    const pending = createMutate.isPending;

    const handleSubmit = (values: any) => {
        createMutate.mutate({
            localaziableName: values as TranslationKeyModel,
            code: Math.random().toString(),
            sortOrder: values.sortOrder,
        });
    };

    return <TranslateForm handleSubmit={handleSubmit} pending={pending} />;
};

const DepartmentForm = () => {
    const { t } = useAppTranslations();
    const {
        setValue,
        control,
        register,
        formState: { errors },
    } = useFormContext();
    const {
        options: departmentTemplates,
        refetch: refetchDepartmentTemplates,
    } = useDepartmentTemplates();
    const { options, isLoading: employeesLoading } = useEmployeeList();

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <Controller
                    name="departmentTemplate"
                    control={control}
                    render={({ field }) => (
                        <ZReactSelect
                            options={departmentTemplates}
                            refetch={refetchDepartmentTemplates}
                            setValue={setValue}
                            label={t("Отдел")}
                            enableMenuPortalTarget
                            maxMenuHeight={300}
                            errors={errors}
                            {...field}
                        >
                            <DepartmentTranslateForm />
                        </ZReactSelect>
                    )}
                />

                <ZTextField
                    {...register("sortOrder")}
                    label={t("Порядковый номер")}
                    placeholder={t("Порядковый номер")}
                    type="number"
                    errors={errors}
                />

                <Controller
                    control={control}
                    name="curator"
                    render={({ field }) => (
                        <ZReactSelect
                            options={options}
                            label={t("Куратор филиала")}
                            {...field}
                            isLoadingOptions={employeesLoading}
                            errors={errors}
                        />
                    )}
                />

                <ZTextField
                    {...register("code")}
                    label="Код"
                    placeholder="Код"
                    errors={errors}
                />
            </div>

            <Controller
                control={control}
                name="hasEmployment"
                render={({ field }) => (
                    <ZCheckboxItem
                        {...field}
                        label={t("Имеет штатное подразделение")}
                        onChange={setValue}
                        checked={field.value}
                    />
                )}
            />
            <Controller
                control={control}
                name="hasDepartment"
                render={({ field }) => (
                    <ZCheckboxItem
                        {...field}
                        label={t("Имеет отдел")}
                        onChange={setValue}
                        checked={field.value}
                    />
                )}
            />
        </>
    );
};

export default DepartmentForm;
