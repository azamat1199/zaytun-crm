import React from "react";
import { IconProps } from "@/components/icons/address-card";

const RightArrowPrimary = (props: IconProps) => {
    const { color = "#039855", size = 20 } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill="none"
            viewBox="0 0 20 20"
        >
            <path
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.166 10h11.667m0 0L9.999 4.167M15.833 10l-5.834 5.834"
            ></path>
        </svg>
    );
};

export default RightArrowPrimary;
