import EducationForm from "@/components/EducationForm";
import Modal from "@/components/Modal";
import { FC } from "react";

interface EducationModalProps {
    handleClose: () => void;
    handleSubmit: (values: any) => void;
    defaultValues: any;
}

const EducationModal: FC<EducationModalProps> = (props) => {
    const { handleClose, handleSubmit, defaultValues } = props;

    return (
        <Modal
            isForm
            open
            size="md"
            onHandleChange={handleClose}
            header="Образование"
            exitButton
        >
            <div className="p-6 flex flex-wrap gap-8 items-end">
                <EducationForm
                    handleSubmit={handleSubmit}
                    defaultValues={defaultValues}
                />
            </div>
        </Modal>
    );
};

export default EducationModal;
