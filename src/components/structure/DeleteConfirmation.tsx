import { FC } from "react";
import useStructureContext from "./_hooks/useStructureContext";
import { TButton } from "@zaytun/components";
import Modal from "@/components/Modal";

interface DeleteConfirmationProps {
    handleCloseModal: () => void;
}

const DeleteConfirmation: FC<DeleteConfirmationProps> = ({
    handleCloseModal,
}) => {
    const {
        modal: { type, itemId, action },
        deleteFuncs,
    } = useStructureContext();

    const { mutate, isPending } = deleteFuncs?.[type] || {};

    return (
        <Modal
            size="xs"
            open={action === "delete"}
            onHandleChange={handleCloseModal}
        >
            <h3 className="text-c_neutral-600 mb-8 font-semibold text-2xl">
                Удаление
            </h3>
            <p className="mb-8 text-c_neutral-500 text-xl">
                Вы действительно хотите удалить этот раздел?
            </p>
            <div className="flex items-center gap-2">
                <TButton
                    className="w-[50%]"
                    onClick={handleCloseModal}
                    disabled={isPending}
                >
                    {" "}
                    Отмена
                </TButton>
                <TButton
                    className="w-[50%] bg-[#F04438]"
                    variant="filled"
                    onClick={() => mutate(itemId)}
                    loading={isPending}
                >
                    Удалить{" "}
                </TButton>
            </div>
        </Modal>
    );
};

export default DeleteConfirmation;
