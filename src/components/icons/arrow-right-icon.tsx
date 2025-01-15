import React from "react";

interface Props {
    readonly size?: number;
    readonly color?: string;
}

export function ArrowRightIcon(props: Props) {
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
                strokeWidth="2"
                d="M5 12h14m0 0l-7-7m7 7l-7 7"
            ></path>
        </svg>
    );
}
