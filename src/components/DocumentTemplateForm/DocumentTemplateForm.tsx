import { FC } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
    ZFileUploader,
    ZTextField,
    ZTextarea,
} from "../z-components/FormElements";
import ZDivider from "../z-components/ZDivider";
import ZReactSelect from "../z-components/ZReactSelect";
import ZButton from "../z-components/ZButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, lazy, array } from "yup";
import { createMockArray, isPlainObject } from "@/utils/common";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import useBeforeUnload from "@/hooks/helpers/useBeforeUnload";
import TemplateOptionsFieldArray from "./TemplateOptionsFieldArray";
import { DocumentTemplateFormValuesType } from "@/data/document-template";
import useGetDocumentTemplateOptions from "@/hooks/api/useGetDocumentTemplateOptions";
import { prepareDocTemplateFormValuesToDto } from "@/data/document-template/document-template.services";
import useSetDefaultValues from "@/hooks/helpers/useSetDefaultValues";
import { useRouter } from "next/navigation";

interface DocumentTemplateFormProps {
    handleSubmit: (values: any) => void;
    defaultValues: Record<string, any>;
    pending: boolean;
    loading?: boolean;
    isEdit?: boolean;
}

const DocumentTemplateForm: FC<DocumentTemplateFormProps> = ({
    defaultValues,
    pending,
    loading = false,
    isEdit=false,
    ...props
}) => {
    const { t } = useAppTranslations();
    const router = useRouter();
    const { formatTypeOptions, transformationTypeOptions, isLoading } =
        useGetDocumentTemplateOptions();
    const validationSchema = object({
        uzCr: string().required(t("Поле обязательно")),
        ru: string().required(t("Поле обязательно")),
        en: string().required(t("Поле обязательно")),
        uzLat: string().required(t("Поле обязательно")),
        description: string().required(t("Поле обязательно")),
        inputFormatType: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().required(t("Поле обязательно")),
                      value: string().required(t("Поле обязательно")),
                  })
                : string().required(t("Поле обязательно")),
        ),
        outputFormatType: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().required(t("Поле обязательно")),
                      value: string().required(t("Поле обязательно")),
                  })
                : string().required(t("Поле обязательно")),
        ),
        attachmentUzCr: object().test(
            "not-empty",
            t("Поле обязательно"),
            (photo) => isPlainObject(photo),
        ),
        attachmentUzLat: object().test(
            "not-empty",
            t("Поле обязательно"),
            (photo) => isPlainObject(photo),
        ),
        attachmentRu: object().test(
            "not-empty",
            t("Поле обязательно"),
            (photo) => isPlainObject(photo),
        ),
        attachmentEn: object().test(
            "not-empty",
            t("Поле обязательно"),
            (photo) => isPlainObject(photo),
        ),
        code: string().required(t("Поле обязательно")),
        documentTemplateParameters: array(
            object({
                name: string().required(t("Поле обязательно")),
                defaultValue: string().required(t("Поле обязательно")),
                regex: string().required(t("Поле обязательно")),
                transformationType: lazy((output) =>
                    typeof output === "object"
                        ? output == null
                            ? string().required(t("Поле обязательно"))
                            : object().shape({
                                  label: string().required(
                                      t("Поле обязательно"),
                                  ),
                                  value: string().required(
                                      t("Поле обязательно"),
                                  ),
                              })
                        : string().required(t("Поле обязательно")).nullable(),
                ),
            }),
        ),
    });

    const methods = useForm<DocumentTemplateFormValuesType>({
        ...(!isEdit && {
            defaultValues: {
                documentTemplateParameters: createMockArray(),
            },
        }),
        resolver: yupResolver(validationSchema),
    });

    const {
        control,
        handleSubmit,
        register,
        trigger,
        setValue,
        reset,
        formState: { errors, isDirty },
    } = methods;

    useSetDefaultValues(reset, defaultValues);
    useBeforeUnload(isDirty);

    const onSubmit = handleSubmit((values) => {
        props.handleSubmit(prepareDocTemplateFormValuesToDto(values));
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <div className="w-[80%] 2xl:w-full grid grid-cols-4 gap-6">
                    <ZTextField
                        label={t("Название (uz)")}
                        {...register("uzLat")}
                        placeholder={t("Служебная записка")}
                        errors={errors}
                        loading={loading}
                    />
                    <ZTextField
                        {...register("uzCr")}
                        label={t(`Название (узб)`)}
                        placeholder={t("Служебная записка")}
                        errors={errors}
                        loading={loading}
                    />
                    <ZTextField
                        {...register("ru")}
                        label={t("Название (рус)")}
                        placeholder={t("Служебная записка")}
                        errors={errors}
                        loading={loading}
                    />
                    <ZTextField
                        {...register("en")}
                        label={t("Название (анг)")}
                        placeholder={t("Служебная записка")}
                        errors={errors}
                        loading={loading}
                    />
                </div>

                <ZDivider className="col-span-4 my-10" />

                <div className="w-[80%] 2xl:w-full grid grid-cols-4 gap-6">
                    <Controller
                        control={control}
                        name="inputFormatType"
                        render={({ field }) => (
                            <ZReactSelect
                                label={t("Форма шаблона")}
                                options={formatTypeOptions}
                                errors={errors}
                                isLoadingOptions={isLoading}
                                {...field}
                                loading={loading}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="outputFormatType"
                        render={({ field }) => (
                            <ZReactSelect
                                label={t("Выходной формат")}
                                options={formatTypeOptions}
                                errors={errors}
                                {...field}
                                isLoadingOptions={isLoading}
                                loading={loading}
                            />
                        )}
                    />

                    <ZTextField
                        {...register("code")}
                        label={t("Код BPMS")}
                        placeholder={t("Код BPMS")}
                        errors={errors}
                        loading={loading}
                    />
                </div>

                <ZDivider className="col-span-4 my-10" />

                <ZTextarea
                    rootClassName="w-[60%] xl:w-full"
                    rows={18}
                    {...register("description")}
                    label={t("Описание")}
                    placeholder={t("Введите описание")}
                />
                <ZDivider className="col-span-4 my-10" />
                <div className="w-[80%] 2xl:w-full grid grid-cols-4 gap-6">
                    <Controller
                        control={control}
                        name="attachmentUzCr"
                        render={({ field }) => (
                            <ZFileUploader
                                whiteList={["docx", "pdf"]}
                                accept=".docx, .pdf"
                                {...field}
                                onChange={(name, value, enabledTrigger) => {
                                    enabledTrigger && trigger(name);
                                    setValue(name, value);
                                }}
                                errors={errors}
                                server="front-office"
                                label={t("УЗ (Кириллица)")}
                                fullWidth
                                loading={loading}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="attachmentUzLat"
                        render={({ field }) => (
                            <ZFileUploader
                                whiteList={["docx", "pdf"]}
                                accept=".docx, .pdf"
                                label={t("UZ (Latin)")}
                                {...field}
                                onChange={(name, value, enabledTrigger) => {
                                    enabledTrigger && trigger(name);
                                    setValue(name, value);
                                }}
                                errors={errors}
                                server="front-office"
                                fullWidth
                                loading={loading}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="attachmentRu"
                        render={({ field }) => (
                            <ZFileUploader
                                whiteList={["docx", "pdf"]}
                                accept=".docx, .pdf"
                                label={t("РУ")}
                                {...field}
                                onChange={(name, value, enabledTrigger) => {
                                    enabledTrigger && trigger(name);
                                    setValue(name, value);
                                }}
                                errors={errors}
                                server="front-office"
                                fullWidth
                                loading={loading}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="attachmentEn"
                        render={({ field }) => (
                            <ZFileUploader
                                whiteList={["docx", "pdf"]}
                                accept=".docx, .pdf"
                                label={t("ENG")}
                                {...field}
                                onChange={(name, value, enabledTrigger) => {
                                    enabledTrigger && trigger(name);
                                    setValue(name, value);
                                }}
                                errors={errors}
                                server="front-office"
                                fullWidth
                                loading={loading}
                            />
                        )}
                    />
                </div>

                <ZDivider className="my-10" />

                <TemplateOptionsFieldArray
                    loading={loading}
                    loadingTransformationOptions={isLoading}
                    transformationTypeOptions={transformationTypeOptions}
                />

                <div className="flex py-6 items-center gap-6">
                    <ZButton
                        variant="secondary"
                        className="w-[260px]"
                        onClick={() => router.back()}
                    >
                        {t("Отменить")}
                    </ZButton>
                    <ZButton className="w-[260px]" pending={pending}>
                        {t("Сохранить")}
                    </ZButton>
                </div>
            </form>
        </FormProvider>
    );
};

export default DocumentTemplateForm;
