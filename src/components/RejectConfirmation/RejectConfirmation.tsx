import Modal from "@/components/Modal";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import { FC } from "react";
import ZButton from "../z-components/ZButton";
import { ZTextarea } from "../z-components/FormElements";
import { useForm } from "react-hook-form";

interface RejectConfirmationProps {
    handleCloseModal: () => void;
    open: boolean;
    handleReject: (values: Record<string, any>) => void;
    pending: boolean;
}

const RejectConfirmation: FC<RejectConfirmationProps> = ({
    handleCloseModal,
    open,
    handleReject,
    pending,
}) => {
    const { t } = useAppTranslations();
    const handleClose = () => {
        if (pending) {
            return;
        }

        handleCloseModal;
    };

    const { handleSubmit, register } = useForm();

    const onSubmit = handleSubmit(handleReject);

    return (
        <Modal
            size="sm"
            header={t("Укажите причину")}
            open={open}
            onHandleChange={handleClose}
            exitButton
        >
            <form onSubmit={onSubmit}>
                <ZTextarea label={t('Причина')} {...register("rejectReason")} />
                <div className="flex items-center gap-2 mt-12">
                    <ZButton
                        className="w-[50%]"
                        onClick={handleClose}
                        disabled={pending}
                        type="button"
                        variant='secondary'
                    >
                        {t("Отменить")}
                    </ZButton>
                    <ZButton
                        className="w-[50%]"
                        variant="primary"
                        onClick={onSubmit}
                        pending={pending}
                    >
                        {t("Вернуть")}
                    </ZButton>
                </div>
            </form>
        </Modal>
    );
};

export default RejectConfirmation;
