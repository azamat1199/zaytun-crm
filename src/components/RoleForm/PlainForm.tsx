import useSetDefaultValues from "@/hooks/helpers/useSetDefaultValues";
import { yupResolver } from "@hookform/resolvers/yup";
import get from "lodash.get";
import { useRouter } from "next/navigation";
import { FC, useEffect, useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { lazy, object, string } from "yup";
import { ZTextField, ZTextarea } from "../z-components/FormElements";
import ZButton from "../z-components/ZButton";
import ZReactSelect from "../z-components/ZReactSelect";
import { prepareModulesDto } from "./RoleForm.utils";
import RoleFormStructure from "./RoleFormStructure";
import useRoleFormContext from "./useRoleFormContext";
import useBeforeUnload from "@/hooks/helpers/useBeforeUnload";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

interface PlainFormProps {
    handleSubmit: (values: any) => void;
    initialValues?: Record<string, any>;
    submitButtonText: string;
}

const PlainForm: FC<PlainFormProps> = ({
    initialValues = {},
    submitButtonText,
    ...props
}) => {
    const { t } = useAppTranslations();
    const validationSchema = object({
        uzCr: string().required(t("Поле обязательно")),
        ru: string().required(t("Поле обязательно")),
        uzLat: string().required(t("Поле обязательно")),
        en: string().required(t("Поле обязательно")),
        initialPage: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().required(t("Поле обязательно")),
                      value: string().required(t("Поле обязательно")),
                  })
                : string().required(t("Поле обязательно")),
        ),
    });

    const resolver = yupResolver(validationSchema);
    const router = useRouter();
    const { reset, ...methods } = useForm({
        resolver,
    });

    const {
        formState: { isDirty },
    } = methods;

    useBeforeUnload(isDirty);
    useSetDefaultValues(reset, initialValues);

    const { values: moduleValues, modules, pending } = useRoleFormContext();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        setValue,
        watch,
    } = methods;

    const initialPage = watch("initialPage");

    const currentPage = moduleValues[initialPage?.value];

    const onSubmit = handleSubmit((values) => {
        const body = {
            modules: prepareModulesDto(modules, moduleValues).modules,
            localaziableName: values,
            initialPage: {
                id: values.initialPage?.value,
            },
            description: values?.description,
        };

        props.handleSubmit(body);
    });

    useEffect(() => {
        if (currentPage === "unchecked") {
            setValue("initialPage", null);
        }
    }, [currentPage]);

    const selectedPagesList = useMemo(() => {
        if (!Array.isArray(modules)) {
            return [];
        }

        const { pages } = prepareModulesDto(
            JSON.parse(JSON.stringify(modules)),
            moduleValues,
        );

        return pages.map((page) => ({ label: t(page.code), value: page.id }));
    }, [moduleValues, modules]);

    return (
        <FormProvider {...methods} reset={reset}>
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-4 mb-10 gap-6 w-[80%]">
                    <ZTextField
                        label={t("Название роли (uz)")}
                        placeholder={t("Operator")}
                        {...register("uzLat")}
                        helperText={get(errors, "uzLat.message") || ""}
                        hasError={Object.hasOwn(errors, "uzLat")}
                    />
                    <ZTextField
                        label={t("Название роли (узб)")}
                        placeholder={t("Operator")}
                        {...register("uzCr")}
                        helperText={get(errors, "uzCr.message") || ""}
                        hasError={Object.hasOwn(errors, "uzCr")}
                    />
                    <ZTextField
                        label={t("Название роли (рус)")}
                        placeholder={t("Оператор")}
                        {...register("ru")}
                        helperText={get(errors, "ru.message") || ""}
                        hasError={Object.hasOwn(errors, "ru")}
                    />
                    <ZTextField
                        {...register("en")}
                        label={t("Название (анг)")}
                        placeholder={t("Operator")}
                        helperText={get(errors, "en.message") || ""}
                        hasError={Object.hasOwn(errors, "en")}
                    />
                </div>

                <ZTextarea
                    rows={5}
                    label={t("Описание")}
                    className="w-[600px]"
                    {...register("description")}
                />

                <div className="border my-6 border-[#E4E6E8] w-full h-[1px]" />

                <RoleFormStructure />

                <div className="py-8 w-[400px]">
                    <Controller
                        name="initialPage"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <ZReactSelect
                                options={selectedPagesList}
                                label={t("Начальная страница")}
                                placeholder={t("Начальная страница")}
                                helperText={
                                    errors.initialPage?.message ||
                                    errors["initialPage.label"]?.message
                                }
                                hasError={
                                    Object.hasOwn(errors, "initialPage") ||
                                    Object.hasOwn(errors, "initialPage.label")
                                }
                                {...field}
                            />
                        )}
                        rules={{ required: true }}
                    />
                </div>

                <div className="flex py-6 items-center gap-6">
                    <ZButton
                        variant="secondary"
                        className="w-[260px]"
                        onClick={() => router.back()}
                        disabled={pending}
                    >
                        {t("Отменить")}
                    </ZButton>
                    <ZButton className="w-[260px]" pending={pending}>
                        {submitButtonText}
                    </ZButton>
                </div>
            </form>
        </FormProvider>
    );
};

export default PlainForm;
