import React, { FC } from "react";
import { IconButton } from "@material-tailwind/react";
import { CrossIcon, TButton } from "@zaytun/components";
import SuccessIcon from "@/components/icons/success-icon";
import { NotificationProps } from "./Notification.types";

const date = new Date();

const SuccessNotification: FC<NotificationProps> = ({ message, text }) => (
    <div className="successDiv">
        <div className="flex gap-4 py-[10px]">
            {/* @ts-expect-error check ts Error TODO */}
            <SuccessIcon size={48} />
            <div className="flex flex-col gap-2 w-[308px]">
                <h5 className="text-[#101828] font-medium text-base">
                    {message}
                </h5>
                <p className="text-[#667085] text-sm leading-[22px] font-normal">
                    {text}
                </p>
                <p className="text-[#667085] text-sm leading-[22px] font-normal">
                    {date.toLocaleTimeString()}
                </p>
                <div className="flex gap-4">
                    <TButton
                        variant="outlined"
                        className="bg-white text-[#101828] p-0 border-none text-base"
                    >
                        Закрыть
                    </TButton>
                </div>
            </div>
            <IconButton variant="text" className="p-0 left-[-20px]">
                <CrossIcon />
            </IconButton>
        </div>
    </div>
);

export default SuccessNotification;
