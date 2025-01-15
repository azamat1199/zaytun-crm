import { FC } from "react";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { ZDatePicker, ZTextField } from "../z-components/FormElements";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import ZReactSelect from "../z-components/ZReactSelect";

interface FilterFieldsProps extends UseFormReturn {}

const FilterFields: FC<FilterFieldsProps> = ({ control, register }) => {
    const { t } = useAppTranslations();

    return (
        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                    <ZDatePicker {...field} label={t("Дата создания от")} />
                )}
            />
            <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                    <ZDatePicker {...field} label={t("Дата создания до")} />
                )}
            />
            <ZTextField
                {...register("entityName")}
                label={t("Тип объекта")}
                placeholder={t("Тип объекта")}
            />
            <ZTextField
                {...register("entityId")}
                label={t("Для обьекта")}
                placeholder={t("ID Обьекта")}
            />
            <ZTextField
                {...register("author")}
                label={t("Автор")}
                placeholder={t("Автор")}
            />

            <ZTextField
                {...register("ipAddress")}
                label={t("IP")}
                placeholder={t("IP")}
            />
        </div>
    );
};

export default FilterFields;
