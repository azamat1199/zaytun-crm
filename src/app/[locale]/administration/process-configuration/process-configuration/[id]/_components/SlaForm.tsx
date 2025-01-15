import React from "react";
import { ZTextField } from "@/components/z-components/FormElements";
import { useFormContext } from "react-hook-form";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

interface SlaFormProps {
    index: number;
    disabled: boolean;
}

const SlaForm: React.FC<SlaFormProps> = ({ index, disabled }) => {
    const { register } = useFormContext();
    const { t } = useAppTranslations();

    return (
        <div className="flex gap-[6px] items-center">
            <ZTextField
                helperText={t("сек")}
                placeholder="0"
                type="number"
                min={0}
                max={59}
                rootClassName="flex-1 max-w-20"
                disabled={disabled}
                {...register(`times.${index}.seconds`)}
            />
            <ZTextField
                helperText={t("мин")}
                placeholder="0"
                type="number"
                min={0}
                max={59}
                rootClassName="flex-1 max-w-20"
                disabled={disabled}
                {...register(`times.${index}.minutes`)}
            />
            <ZTextField
                helperText={t(`часы`)}
                placeholder="0"
                type="number"
                min={0}
                max={23}
                rootClassName="flex-1 max-w-20"
                disabled={disabled}
                {...register(`times.${index}.hours`)}
            />
            <ZTextField
                helperText={t(`дни`)}
                placeholder="0"
                type="number"
                min={0}
                rootClassName="flex-1 max-w-20"
                disabled={disabled}
                {...register(`times.${index}.days`)}
            />
        </div>
    );
};

export default SlaForm;
