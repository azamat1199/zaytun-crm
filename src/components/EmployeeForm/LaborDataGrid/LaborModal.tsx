import Modal from "@/components/Modal";
import { FC } from "react";
import LaborForm from "./LaborForm";

interface LaborModalProps {
    handleClose: () => void;
    handleSubmit: (values: Record<string, any>) => void;
    defaultValues?: Record<string, any>;
}

const LaborModal: FC<LaborModalProps> = (props) => {
    const { handleClose, handleSubmit, defaultValues = {} } = props;

    return (
        <Modal
            isForm
            open
            size="md"
            onHandleChange={handleClose}
            header="Трудовая деятельность"
            exitButton
        >
            <div className="p-6 flex flex-wrap gap-8 items-end">
                <LaborForm
                    handleSubmit={handleSubmit}
                    defaultValues={defaultValues}
                    handleCancel={handleClose}
                />
            </div>
        </Modal>
    );
};

export default LaborModal;
