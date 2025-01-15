import React, { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { ZFileUploader } from "@/components/z-components/FormElements";
import ZDivider from "@/components/z-components/ZDivider";
import { TButton } from "@zaytun/components";
import { useMutation } from "@tanstack/react-query";
import { postEmployeeDocuments } from "@/data/hr/employee";
import { openToast } from "@/components/notification";
import {
    getErrorMessages,
    getSuccessMessage,
    isPlainObject,
} from "@/utils/common";
import { useParams, useRouter } from "next/navigation";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import { yupResolver } from "@hookform/resolvers/yup";
import { object } from "yup";

interface ChangeEmployeePositionFormProps {
    defaultValues?: Record<string, any>;
    handleSubmit: (values: any) => void;
    setCurrentComponent: Record<any, any>;
    pending: boolean;
    id: string;
}

const EmployeeDocuments: FC<ChangeEmployeePositionFormProps> = ({
    defaultValues,
}) => {
    const { t } = useAppTranslations();
    const validatiomSchema = object({
        photo1: object().test("not-empty", t("Поле обязательно"), (photo) =>
            isPlainObject(photo),
        ),
        photo2: object().test("not-empty", t("Поле обязательно"), (photo) =>
            isPlainObject(photo),
        ),
    });
    const {
        formState: { errors },
        control,
        trigger,
        setValue,
        handleSubmit,
    } = useForm({ defaultValues, resolver: yupResolver(validatiomSchema) });
    const { id } = useParams();
    const router = useRouter();
    const createMutate = useMutation({
        mutationFn: postEmployeeDocuments,
        mutationKey: ["employee-documents"],
        onSuccess: (res) => {
            openToast({ variant: "success", message: getSuccessMessage(res) });
            router.push("/portal/tasks/tasks", { scroll: true });
        },
        onError: (err) => {
            openToast({
                variant: "error",
                message: getErrorMessages(err as any, false),
            });
        },
    });

    const onSubmit = handleSubmit((values: any) => {
        createMutate.mutate({
            id,
            documents: [
                {
                    attachment: values?.photo1,
                    documentType: "ROTATION_COMMAND",
                },
                {
                    attachment: values?.photo2,
                    documentType: "ROTATION_SIGNED_DOCUMENT",
                },
            ],
        });
    });
    return (
        <form onSubmit={onSubmit}>
            <div className={"flex items-end gap-8 mb-8"}>
                <Controller
                    control={control}
                    name="photo"
                    render={({ field }) => (
                        <ZFileUploader
                            whiteList={["pdf"]}
                            label={t("Скачать")}
                            accept="application/pdf"
                            {...field}
                            onChange={(name, value) => {
                                trigger(name);
                                setValue(name, value);
                            }}
                            errors={errors}
                            server="hr"
                            isPhoto
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="photo"
                    render={({ field }) => (
                        <ZFileUploader
                            whiteList={["pdf"]}
                            label=""
                            accept="application/pdf"
                            {...field}
                            onChange={(name, value) => {
                                trigger(name);
                                setValue(name, value);
                            }}
                            errors={errors}
                            server="hr"
                            isPhoto
                        />
                    )}
                />
            </div>
            <ZDivider />
            <div className={"flex items-center gap-8 mb-8 mt-8"}>
                <Controller
                    control={control}
                    name="photo1"
                    render={({ field }) => (
                        <ZFileUploader
                            whiteList={["pdf"]}
                            label={t("Загрузить фотографию сотрудника")}
                            accept="application/pdf"
                            {...field}
                            onChange={(name, value) => {
                                trigger(name);
                                setValue(name, value);
                            }}
                            errors={errors}
                            server="hr"
                            isPhoto
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="photo2"
                    render={({ field }) => (
                        <ZFileUploader
                            whiteList={["pdf"]}
                            label={t("Загрузить фотографию сотрудника")}
                            accept="application/pdf"
                            {...field}
                            onChange={(name, value) => {
                                trigger(name);
                                setValue(name, value);
                            }}
                            errors={errors}
                            server="hr"
                            isPhoto
                        />
                    )}
                />
            </div>
            <ZDivider />
            <TButton
                type="submit"
                variant={"filled"}
                className={"mt-8 w-[320px]"}
            >
                {t("Подтвердить")}
            </TButton>
        </form>
    );
};

export default EmployeeDocuments;
