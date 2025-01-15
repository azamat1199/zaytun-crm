import { ZTextField } from "@/components/z-components/FormElements";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import { useFormContext } from "react-hook-form";

const StructureForm = () => {
    const { t } = useAppTranslations();
    const {
        register,
        formState: { errors },
    } = useFormContext();
    return (
        <div className="grid grid-cols-2 gap-4">
            <ZTextField
                {...register("uzCr")}
                label={t(`Название (узб)`)}
                placeholder={t("Название (узб)")}
                errors={errors}
            />
            <ZTextField
                {...register("uzLat")}
                label={t(`Название (lat)`)}
                placeholder={t("Название (lat)")}
                errors={errors}
            />
            <ZTextField
                {...register("en")}
                label={t("Название (анг)")}
                placeholder={t("Название (анг)")}
                errors={errors}
            />
            <ZTextField
                {...register("ru")}
                label={t("Название (рус)")}
                placeholder={t("Название (рус)")}
                errors={errors}
            />
        </div>
    );
};

export default StructureForm;
