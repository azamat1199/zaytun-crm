import { FC } from "react";
import Modal from "@/components/Modal";
import { ZFileUploader } from "@/components/z-components/FormElements";
import ZButton from "@/components/z-components/ZButton";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import useBeforeUnload from "@/hooks/helpers/useBeforeUnload";
import {
    getErrorMessages,
    getSuccessMessage,
    isPlainObject,
} from "@/utils/common";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { object } from "yup";
import { importTranslationFile } from "@/data/translation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { openToast } from "@/components/notification";
import useGetTranslationMessages from "@/hooks/api/useGetTranslationMessages";

type FormType = {
    file: any;
};
interface ImportExcelModalProps {
    open: boolean;
    handleClose: () => void;
}

const ImportExcelModal: FC<ImportExcelModalProps> = ({ open, handleClose }) => {
    const { t } = useAppTranslations();
    const queryClient = useQueryClient();
    const validationSchema = object({
        file: object().test("not-empty", "Поле обязательно", (photo) =>
            isPlainObject(photo),
        ),
    });
    const {
        handleSubmit,
        control,
        formState: { errors, isDirty },
        trigger,
        setValue,
    } = useForm<FormType>({ resolver: yupResolver(validationSchema) });
    const { refetch, isRefetching } = useGetTranslationMessages(
        {
            enabled: false,
        },
        handleClose,
    );

    const { mutate, isPending } = useMutation({
        mutationFn: importTranslationFile,
        mutationKey: ["import-translation"],
        onSuccess: (res: AxiosResponse) => {
            queryClient.invalidateQueries({ queryKey: ["translation"] });
            refetch();
            openToast({ variant: "success", text: getSuccessMessage(res) });
        },
        onError: (err: AxiosError) => {
            openToast({ variant: "error", text: getErrorMessages(err, false) });
        },
    });

    const onSubmit = handleSubmit((values) => {
        mutate({ formData: values.file?.formData });
    });

    useBeforeUnload(isDirty);

    const toggleModal = () => {
        if (isPending || isRefetching) {
            return;
        }
        handleClose();
    };

    return (
        <Modal
            size="xs"
            open={open}
            header={t("Импортировать файл")}
            onHandleChange={toggleModal}
        >
            <form onSubmit={onSubmit} className="flex flex-col gap-6">
                <Controller
                    name="file"
                    control={control}
                    render={({ field }) => (
                        <ZFileUploader
                            fullWidth
                            {...field}
                            onChange={(name, value, enableTrigger) => {
                                enableTrigger && trigger(name as any);
                                setValue(name as any, value);
                            }}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            whiteList={["xlsx"]}
                            errors={errors}
                            mode="local"
                            withView={false}
                        />
                    )}
                />
                <div className="flex justify-center gap-2">
                    <ZButton
                        className="flex-1"
                        variant="secondary"
                        type="button"
                        onClick={toggleModal}
                    >
                        {t("Отменить")}
                    </ZButton>
                    <ZButton
                        pending={isPending || isRefetching}
                        className="flex-1"
                    >
                        {t("Импортировать")}
                    </ZButton>
                </div>
            </form>
        </Modal>
    );
};

export default ImportExcelModal;
