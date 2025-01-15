import { openToast } from "@/components/notification";

const useInProcessModal = () => {
    const toggleInProcessModal = () => {
        openToast({ variant: "warning", message: "В разработке" });
    };

    return {
        toggleInProcessModal,
    };
};

export default useInProcessModal;
