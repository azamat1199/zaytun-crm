import { ZCheckboxItem } from "@/components/z-components/FormElements";
import ZButton from "@/components/z-components/ZButton";
import ZDivider from "@/components/z-components/ZDivider";
import ZReactSelect from "@/components/z-components/ZReactSelect";
import { prepareProcessSettingsDto } from "@/data/process-settings";
import useGetRoles from "@/hooks/api/useGetRoles";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import useBeforeUnload from "@/hooks/helpers/useBeforeUnload";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { object, lazy, string } from "yup";

interface AccessFormProps {
    defaultValues: Record<string, any>;
    handleSubmit: (values: Record<string, any>) => void;
    pending?: boolean;
    submitText: string;
    handleClose: () => void;
}

const AccessForm: FC<AccessFormProps> = ({
    defaultValues,
    pending,
    submitText,
    handleClose,
    ...props
}) => {
    const { t } = useAppTranslations();

    const validationSchema = object({
        role: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().required("Поле обязательно"),
                      value: string().required("Поле обязательно"),
                  })
                : string().required("Поле обязательно"),
        ),
    });

    const {
        handleSubmit,
        setValue,
        control,
        formState: { isDirty, errors },
    } = useForm({ defaultValues, resolver: yupResolver(validationSchema) });

    const { options } = useGetRoles(
        { page: 0, size: 1000, search: "" },
        {},
        true,
    );

    useBeforeUnload(isDirty)

    const onSubmit = handleSubmit((values) =>
        props.handleSubmit(prepareProcessSettingsDto(values)),
    );

    return (
        <form onSubmit={onSubmit} className="px-6 py-8">
            <Controller
                name="role"
                control={control}
                render={({ field }) => (
                    <ZReactSelect
                        label={t("Роль")}
                        options={options}
                        errors={errors}
                        {...field}
                    />
                )}
            />
            <ZDivider className="my-6" />
            <div className="flex gap-6 flex-col mb-6">
                <Controller
                    control={control}
                    name="canCreate"
                    render={({ field }) => (
                        <ZCheckboxItem
                            {...field}
                            label={t("Запуск")}
                            onChange={setValue}
                            checked={field.value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="canPause"
                    render={({ field }) => (
                        <ZCheckboxItem
                            {...field}
                            label={t("Пауза")}
                            onChange={setValue}
                            checked={field.value}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="canStop"
                    render={({ field }) => (
                        <ZCheckboxItem
                            {...field}
                            label={t("Отмена")}
                            onChange={setValue}
                            checked={field.value}
                        />
                    )}
                />
            </div>
            <div className="flex items-center w-full justify-center gap-6">
                <ZButton
                    className="flex-1"
                    variant="secondary"
                    disabled={pending}
                    onClick={handleClose}
                    type="button"
                >
                    {t("Отменить")}
                </ZButton>
                <ZButton
                    className="flex-1"
                    variant="primary"
                    type="submit"
                    pending={pending}
                >
                    {submitText}
                </ZButton>
            </div>
        </form>
    );
};

export default AccessForm;
