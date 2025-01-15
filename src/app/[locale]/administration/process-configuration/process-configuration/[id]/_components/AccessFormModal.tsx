import { FC } from "react";
import Modal from "@/components/Modal";
import AccessForm from "./AccessForm";

interface AccessFormModalProps {
    open: boolean;
    handleClose: () => void;
    title: string;
    handleSubmit: (values: Record<string, any>) => void;
    pending?: boolean;
    defaultValues: Record<string, any>;
}

const AccessFormModal: FC<AccessFormModalProps> = ({
    open,

    title,
    ...props
}) => {
    const handleClose = () => {
        if (props.pending) {
            return;
        }

        props.handleClose();
    };

    return (
        <Modal
            size="xs"
            isForm
            header={title}
            open={open}
            onHandleChange={handleClose}
            exitButton
        >
            <AccessForm
                {...props}
                submitText={title}
                handleClose={handleClose}
            />
        </Modal>
    );
};

export default AccessFormModal;
