import React, { Fragment, FC } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import {
    ZCheckboxItem,
    ZFormLabel,
    ZTextField,
} from "../z-components/FormElements";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import ZReactSelect from "../z-components/ZReactSelect";
import ZDivider from "../z-components/ZDivider";
import TableTrash from "../icons/TableTrash";
import { IconButton } from "@material-tailwind/react";
import AddIcon from "../icons/AddIcon";
import get from "lodash.get";

interface TemplateOptionsFieldArrayProps {
    transformationTypeOptions: Array<{ label: string; value: string }>;
    loadingTransformationOptions: boolean;
    loading: boolean;
}

const TemplateOptionsFieldArray: FC<TemplateOptionsFieldArrayProps> = ({
    transformationTypeOptions,
    loadingTransformationOptions,
    loading,
}) => {
    const { t } = useAppTranslations();
    const {
        control,
        register,
        setValue,
        formState: { errors },
    } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "documentTemplateParameters",
    });

    return (
        <div className="w-full">
            <p className="text-h3-r font-medium text-c_neutral-800 mb-10">
                {t("Параметры шаблона")} ({fields.length})
            </p>
            {fields.map((field, index) => {
                return (
                    <Fragment key={field.id}>
                        <article className="flex items-center relative">
                            <span className="p-2 absolute bottom-[6px]">
                                {index + 1}.
                            </span>
                            <div className="grid grid-cols-4 flex-1 gap-4 ml-7">
                                <div>
                                    <ZTextField
                                        label={t("Имя")}
                                        placeholder={t("Введите название")}
                                        {...register(
                                            `documentTemplateParameters.${index}.name`,
                                        )}
                                        hasError={Boolean(
                                            get(
                                                errors,
                                                `documentTemplateParameters.${index}.name.message`,
                                            ),
                                        )}
                                        helperText={get(
                                            errors,
                                            `documentTemplateParameters.${index}.name.message`,
                                        )}
                                        rootClassName="flex-1"
                                        loading={loading}
                                    />
                                </div>
                                <ZTextField
                                    label={t("Значение по умолчанию")}
                                    placeholder={t("Значение по умолчанию")}
                                    {...register(
                                        `documentTemplateParameters.${index}.defaultValue`,
                                    )}
                                    rootClassName="flex-1"
                                    hasError={Boolean(
                                        get(
                                            errors,
                                            `documentTemplateParameters.${index}.defaultValue.message`,
                                        ),
                                    )}
                                    helperText={get(
                                        errors,
                                        `documentTemplateParameters.${index}.defaultValue.message`,
                                    )}
                                    loading={loading}
                                />
                                <ZTextField
                                    label={t("Регулярное выражение (Regex)")}
                                    placeholder={t(
                                        "Регулярное выражение (Regex)",
                                    )}
                                    {...register(
                                        `documentTemplateParameters.${index}.regex`,
                                    )}
                                    rootClassName="flex-1"
                                    hasError={Boolean(
                                        get(
                                            errors,
                                            `documentTemplateParameters.${index}.regex.message`,
                                        ),
                                    )}
                                    helperText={get(
                                        errors,
                                        `documentTemplateParameters.${index}.regex.message`,
                                    )}
                                    loading={loading}
                                />
                                <Controller
                                    control={control}
                                    name={`documentTemplateParameters.${index}.transformationType`}
                                    render={({ field }) => (
                                        <ZReactSelect
                                            label={t(
                                                "Значение трансформировать",
                                            )}
                                            options={transformationTypeOptions}
                                            isLoading={
                                                loadingTransformationOptions
                                            }
                                            {...field}
                                            hasError={Boolean(
                                                get(
                                                    errors,
                                                    `documentTemplateParameters.${index}.transformationType.message`,
                                                ),
                                            )}
                                            helperText={get(
                                                errors,
                                                `documentTemplateParameters.${index}.transformationType.message`,
                                            )}
                                            loading={loading}
                                        />
                                    )}
                                />
                            </div>
                            <Controller
                                control={control}
                                name={`documentTemplateParameters.${index}.required`}
                                render={({ field }) => (
                                    <div className="ml-4">
                                        <ZFormLabel>
                                            {t("Обязателен к заполнению")}
                                        </ZFormLabel>
                                        <ZCheckboxItem
                                            className="h-12"
                                            fullWidth
                                            label={t("Да")}
                                            size="lg"
                                            name={field.name}
                                            onChange={setValue}
                                            checked={field.value}
                                            loading={loading}
                                        />
                                    </div>
                                )}
                            />
                            <div role="absolute bottom-0 group flex gap-1">
                                <IconButton
                                    onClick={() => remove(index)}
                                    variant="text"
                                >
                                    <TableTrash
                                        className="[&>path]:stroke-c_error-500"
                                        size="lg"
                                    />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        append(
                                            {
                                                name: "",
                                                defaultValue: "",
                                                regex: "",
                                                transformationType: "",
                                                required: false,
                                            },
                                            { shouldFocus: false },
                                        );
                                    }}
                                    variant="text"
                                >
                                    <AddIcon size="lg" />
                                </IconButton>
                            </div>
                        </article>

                        <ZDivider className="my-10" />
                    </Fragment>
                );
            })}
        </div>
    );
};

export default TemplateOptionsFieldArray;
