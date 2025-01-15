import React from "react";
import { CloseIcon, TButton } from "@zaytun/components";
import ZButton from "@/components/z-components/ZButton";
import { ZTextarea } from "@/components/z-components/FormElements";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
interface ReasonProps {
    setReason: any;
    t: any;
    handleSubmit: (values: any) => void;
    setReasonModal?: boolean;
}
export default function Reason(props: ReasonProps) {
    const { setReason, handleSubmit, setReasonModal } = props;
    const { t } = useAppTranslations();
    return (
        <div>
            <div className="">
                <div className={"flex justify-between items-center mb-8"}>
                    <label className={"text-neutral-800 font-[24px]"}>
                        {t("Укажите причину")}
                    </label>
                    <CloseIcon onClick={() => setReasonModal(false)} />
                </div>
                <ZTextarea
                    label={t("Причина")}
                    className={"w-full"}
                    onChange={(val) => setReason(val?.target?.value)}
                />
            </div>
            <div className="w-full flex justify-between items-center">
                <ZButton
                    className={"mt-8"}
                    onClick={() => setReasonModal(false)}
                >
                    {t("Отменить")}
                </ZButton>
                <TButton onClick={handleSubmit} className={"mt-8 "}>
                    {t("Вернуть")}
                </TButton>
            </div>
        </div>
    );
}
