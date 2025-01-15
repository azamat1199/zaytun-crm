/* eslint-disable */
import React from "react";

export interface IconProps {
    readonly color?: string;
    readonly size?: number;
}
function AddressCard(props: IconProps) {
    const { color = "#667085", size = 20 } = props;
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
                strokeWidth="1.25"
                d="M14.166 17.5H5.833c-3.333 0-4.167-.833-4.167-4.167V6.667c0-3.334.834-4.167 4.167-4.167h8.334c3.333 0 4.166.833 4.166 4.167v6.666c0 3.334-.833 4.167-4.166 4.167zM11.666 6.667h4.167M12.5 10h3.333M14.166 13.333h1.667"
            ></path>
            <path
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                d="M7.084 9.408a1.508 1.508 0 100-3.016 1.508 1.508 0 000 3.016zM10 13.608a2.517 2.517 0 00-2.284-2.266 6.428 6.428 0 00-1.266 0 2.524 2.524 0 00-2.284 2.266"
            ></path>
        </svg>
    );
}

export default AddressCard;
