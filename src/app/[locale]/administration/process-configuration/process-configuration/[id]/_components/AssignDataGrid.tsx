import ZDataGrid from "@/components/z-components/ZDataGrid";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import React, { startTransition, useState } from "react";
import ZButton from "@/components/z-components/ZButton";
import useGetTaskSettings from "@/hooks/api/useGetTaskSettings";
import useZDataGridContext from "@/components/z-components/ZDataGrid/ZDataGridProvider/useZDataGridContext";
import { useParams } from "next/navigation";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import get from "lodash.get";
import ZReactSelect from "@/components/z-components/ZReactSelect";
import useGetDepartments from "@/hooks/api/useGetDepartments";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useMutation, useQueries } from "@tanstack/react-query";
import { getEmploymentsByDepartmentId } from "@/data/employment";
import {
    getErrorMessages,
    getSuccessMessage,
    selectDataWithoutPagination,
} from "@/utils/common";
import { openToast } from "@/components/notification";
import { updateTaskSettings } from "@/data/task-settings";

type AssignDataGridMode = "edit" | "readonly";

const AssignDataGrid = () => {
    const { id } = useParams();
    const { t } = useAppTranslations();
    const { page, size } = useZDataGridContext();
    const { getWord } = useKeyTranslation();
    const {
        control,
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useFormContext();
    const { fields } = useFieldArray({ control, name: "taskSettings" });
    const [mode, setMode] = useState<AssignDataGridMode>("readonly");

    const { data, isLoading, isRefetching, refetch } = useGetTaskSettings(
        {
            page,
            size,
            processTemplateId: id as string,
        },
        { select: (res) => get(res, "data.result.data") },
    );

    const state = useGetDepartments({ page: 0, size: 1_000_000 });

    const preparedList = Array.isArray(data) ? data : [];

    const watchedFields = watch("taskSettings", fields);

    const employments = useQueries({
        queries: watchedFields.map((field: any) => ({
            queryKey: [
                "employment",
                { departmentId: field?.department?.value },
            ],
            queryFn: () =>
                getEmploymentsByDepartmentId({
                    departmentId: field?.department?.value,
                    page: 0,
                    size: 1_000_00,
                }),
            select: selectDataWithoutPagination,
            enabled: Boolean(field?.department?.value),
        })),
    });

    const preparedEmploymentOptions = employments.map((employment) => ({
        options: (employment.data || []).map(({ position, id }) => ({
            label: getWord(position?.localaziableName),
            value: id,
        })),
        ...employment,
    }));

    const departmentOptions = get(state, "data.list", []).map(
        ({ departmentTemplate, id }) => ({
            label: getWord(departmentTemplate?.localaziableName),
            value: id,
        }),
    );

    const updateMutation = useMutation({
        mutationFn: updateTaskSettings,
        mutationKey: ["update-mutation"],
        onSuccess: (res) => {
            setMode("readonly");
            refetch();
            openToast({ variant: "success", text: getSuccessMessage(res) });
        },
        onError: (err) => {
            openToast({ variant: "error", text: getErrorMessages(err, false) });
        },
    });

    const accessColumns = [
        
        {
            label: t("Задачи"),
            key: "tasktemplate",
            cellRender: ({ taskTemplate }: any) => t(taskTemplate?.type),
            width: "w-[35%]",
        },
        {
            label: t("Орган исполнитель"),
            key: "department",
            cellRender: ({ department }: any, i: number) => {
                if (mode === "edit") {
                    return (
                        <Controller
                            control={control}
                            name={`taskSettings.${i}.department`}
                            render={({ field }) => (
                                <ZReactSelect
                                    options={departmentOptions}
                                    {...field}
                                    onChange={(...args) => {
                                        setValue(
                                            `taskSettings.${i}.employment`,
                                            null,
                                        );

                                        field.onChange(...args);
                                    }}
                                    enableMenuPortalTarget
                                    hasError={Boolean(
                                        get(
                                            errors,
                                            `taskSettings[${i}].department.message`,
                                        ),
                                    )}
                                    helperText={get(
                                        errors,
                                        `taskSettings[${i}].department.message`,
                                    )}
                                />
                            )}
                        />
                    );
                }

                return getWord(department?.localaziableName);
            },
            width: "w-[30%]",
        },
        {
            label: t("Штат исполнитель"),
            key: "employment",
            cellRender: ({ employment }: any, i: number) => {
                const { options, isRefetching, isLoading } =
                    preparedEmploymentOptions?.[i] || {};
                if (mode === "edit") {
                    return (
                        <Controller
                            control={control}
                            name={`taskSettings.${i}.employment`}
                            render={({ field }) => (
                                <ZReactSelect
                                    options={options || []}
                                    {...field}
                                    enableMenuPortalTarget
                                    isLoadingOptions={isRefetching || isLoading}
                                    hasError={Boolean(
                                        get(
                                            errors,
                                            `taskSettings[${i}].employment.message`,
                                        ),
                                    )}
                                    helperText={get(
                                        errors,
                                        `taskSettings[${i}].employment.message`,
                                    )}
                                />
                            )}
                        />
                    );
                }

                return (
                    <div className="flex">
                        {getWord(employment?.position?.localaziableName)}
                    </div>
                );
            },
            width: "w-[30%]",
        },
    ];

    const toggleMode = () => {
        if (mode === "readonly") {
            reset({
                taskSettings: preparedList.map(
                    ({ department, employment }) => ({
                        department: {
                            label: getWord(department?.localaziableName),
                            value: department?.id,
                        },
                        employment: {
                            label: getWord(
                                employment?.position?.localaziableName,
                            ),
                            value: employment?.id,
                        },
                    }),
                ),
            });
        }

        startTransition(() => {
            setMode(mode === "readonly" ? "edit" : "readonly");
        });
    };

    const onSubmit = handleSubmit(({ taskSettings }) => {
        const preparedBody = (
            Array.isArray(taskSettings) ? taskSettings : []
        ).map(({ department, employment }, i) => ({
            id: preparedList[i].id,
            department: { id: department?.value },
            employment: { id: employment?.value },
        }));

        updateMutation.mutate(preparedBody);
    });

    return (
        <form onSubmit={onSubmit}>
            <div className="border border-c_neutral-300 rounded-lg">
                <div className="flex justify-end items-center mb-3 py-4 pr-2">
                    <ZButton type="button" size="md" onClick={toggleMode}>
                        {mode === "edit"
                            ? t("Только чтение")
                            : t("Редактировать")}
                    </ZButton>
                </div>
                <ZDataGrid
                    hasSearch={false}
                    columns={accessColumns}
                    rows={preparedList}
                    hasExport={false}
                    hasCheckbox={false}
                    hasOrder
                    loading={isLoading || isRefetching}
                    hasFilter={false}
                    hasSettings={false}
                    hasActions={false}                    
                    rootClassName="border-none"
                />
            </div>

            {mode === "edit" && (
                <ZButton
                    // pending={updateMutation.isPending}
                    variant="primary"
                    className="w-[200px] mt-10"
                    pending={updateMutation.isPending}
                    onClick={onSubmit}
                >
                    {t("Сохранить")}
                </ZButton>
            )}
        </form>
    );
};

export default AssignDataGrid;
