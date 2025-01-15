import Modal from "@/components/Modal";
import { FC } from "react";
import RelativesForm from "./RelativesForm";
interface RelativesModalProps {
    handleClose: () => void;
    handleSubmit: (values: Record<string, any>) => void;
    defaultValues?: Record<string, any>;
}

const RelativesModal: FC<RelativesModalProps> = (props) => {
    const { handleClose, handleSubmit, defaultValues = {} } = props;

    return (
        <Modal
            isForm
            open
            size="md"
            onHandleChange={handleClose}
            header="Сведения о близких родственниках"
            exitButton
        >
            <div className="p-6 flex flex-wrap gap-8 items-end">
                <RelativesForm
                    handleSubmit={handleSubmit}
                    defaultValues={defaultValues}
                    handleCancel={handleClose}
                />
            </div>
        </Modal>
    );
};

export default RelativesModal;
