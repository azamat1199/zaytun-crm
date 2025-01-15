import Modal from "@/components/Modal/Modal";
import React, { ReactNode, FC, cloneElement } from "react";
import useZDataGridContext from "./ZDataGridProvider/useZDataGridContext";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import ZButton from "../ZButton";
import { useFormContext } from "react-hook-form";

interface FilterModalProps {
    children: ReactNode;
    onSubmit: () => void;
}

const FilterModal: FC<FilterModalProps> = ({ children, onSubmit }) => {
    const { t } = useAppTranslations();

    const { closeModal, modal } = useZDataGridContext();
    const methods = useFormContext();

    return (
        <Modal
            size="md"
            isForm
            header={t("Фильтры")}
            open={modal === "filter"}
            onHandleChange={closeModal}
        >
            <>
                <div className="p-6">{cloneElement(children, methods)}</div>
                <div className="flex border-t items-center justify-end gap-[10px] p-6">
                    <ZButton
                        className="w-[146px]"
                        size="md"
                        variant="secondary"
                        type="button"
                    >
                        {t("Сбросить")}
                    </ZButton>
                    <ZButton
                        onClick={onSubmit}
                        type="submit"
                        className="w-[146px]"
                        size="md"
                    >
                        {t("Сохранить")}
                    </ZButton>
                </div>
            </>
        </Modal>
    );
};

export default FilterModal;
