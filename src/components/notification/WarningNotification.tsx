import React, { FC } from "react";
import WarningIcon from "@/components/icons/warning-icon";
import { NotificationProps } from "./Notification.types";
import { CrossIcon } from "../icons/cross-icon";

import { TButton } from "@zaytun/components";
const WarningNotification: FC<NotificationProps> = ({ message }) => (
    <div>
        <div className="flex gap-4 justify-end">
            <TButton
                variant="outlined"
                className="bg-white text-[#101828] p-0 border-none text-base"
            >
                <CrossIcon />
            </TButton>
        </div>
        <div className="flex flex-col justify-center items-center gap-[20px]">
            <WarningIcon />
            <div className="text-gray-900 font-semibold text-center text-[18px]">
                {message}
            </div>
        </div>
    </div>
);

export default WarningNotification;
