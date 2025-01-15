import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { ZTextField } from "../FormElements";
import { TButton } from "@zaytun/components";

interface TranslationFormProps {
    handleSubmit: (values: any) => void;
    pending: boolean;
    withOrderField: boolean;
    handleCancel: () => void;
}

const TranslationForm: FC<TranslationFormProps> = ({
    pending,
    withOrderField,
    handleCancel,
    ...props
}) => {
    const { handleSubmit, register } = useFormContext();

    const onSubmit = handleSubmit(props.handleSubmit);

    return (
        <form onSubmit={onSubmit}>
            <ZTextField
                label={`Название (узб)`}
                placeholder="Название (узб)"
                {...register("uzCr")}
            />
            <ZTextField
                label={`Название (lat)`}
                placeholder="Название (lat)"
                {...register("uzLat")}
            />
            <ZTextField
                label="Название (анг)"
                placeholder="Название (анг)"
                {...register("en")}
            />
            <ZTextField
                label="Название (рус)"
                placeholder="Название (рус)"
                {...register("ru")}
            />
            {withOrderField && (
                <ZTextField
                    label="Порядковый номер"
                    placeholder="Порядковый номер"
                    {...register("sortOrder")}
                />
            )}
            <div className="flex items-center py-8  w-full justify-center gap-6">
                <TButton
                    onClick={handleCancel}
                    className="w-[160px] bg=error-500"
                >
                    Отменить
                </TButton>
                <TButton
                    className="w-[160px]"
                    variant="filled"
                    // @ts-expect-error TODO
                    type="button"
                    pending={pending}
                    onClick={onSubmit}
                >
                    Добавить{" "}
                </TButton>
            </div>
        </form>
    );
};

export default TranslationForm;
