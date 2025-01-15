import Modal from "@/components/Modal";
import { TButton } from "@zaytun/components";
import { FC } from "react";

interface DeleteConfirmationProps {
    handleCloseModal: () => void;
    open: boolean;
    handleDelete: () => void;
    pending: boolean;
    title?: string;
    subTitle?: string;
}

const DeleteConfirmation: FC<DeleteConfirmationProps> = ({
    handleCloseModal,
    open,
    handleDelete,
    pending,
    subTitle,
}) => {
    return (
        <Modal size="xs" open={open} onHandleChange={handleCloseModal}>
            <h3 className="text-c_neutral-600 mb-8 font-semibold text-2xl">
                Удаление
            </h3>
            <p className="mb-8 text-c_neutral-500 text-xl">{subTitle}</p>
            <div className="flex items-center gap-2">
                <TButton
                    className="w-[50%]"
                    onClick={handleCloseModal}
                    disabled={pending}
                >
                    {" "}
                    Отмена
                </TButton>
                <TButton
                    className="w-[50%] bg-[#F04438]"
                    variant="filled"
                    onClick={handleDelete}
                    loading={pending}
                >
                    Удалить{" "}
                </TButton>
            </div>
        </Modal>
    );
};

export default DeleteConfirmation;
