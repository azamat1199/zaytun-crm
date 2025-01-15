import React from "react";
import cx from "classnames";
import { Chip } from "@material-tailwind/react";
import { StatusTagVariant } from "@/constants/variants";

function StatusTag({ variant, value }) {
    return (
        <Chip
            style={{
                background: StatusTagVariant[variant]?.bg,
                color: StatusTagVariant[variant]?.text,
            }}
            className={cx(
                "text-center w-fit py-[2px]" +
                    " px-2 text-[12px] capitalize rounded-[16px] font-medium",
            )}
            value={value}
        />
    );
}

export default StatusTag;
