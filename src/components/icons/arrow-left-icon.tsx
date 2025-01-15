import React from "react";
interface Props {
    readonly size?: number;
    readonly color?: string;
}

export function ArrowLeftIcon(props: Props) {
    const { color = "#344054", size = 23 } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.004"
                d="M19 12H5m0 0l7 7m-7-7l7-7"
            ></path>
        </svg>
    );
}
