import { useAppSelector } from "@/hooks/helpers/useAppSelector";
import useInProcessModal from "@/hooks/helpers/useInProcessModal";
import { Modal } from "@zaytun/components";

const InProcessModal = () => {
    const open = useAppSelector((store) => store.navbar.inProcessModal);
    const { toggleInProcessModal } = useInProcessModal();
    return (
        <Modal open={open} onHandleChange={toggleInProcessModal} size="xs">
            <h1 className="text-h1-r font-medium">В разработке</h1>
        </Modal>
    );
};

export default InProcessModal;
