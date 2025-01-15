/* eslint-disable */
import React from "react";

interface Props {
    readonly size?: number;
    readonly className?: string;
    readonly color?: string;
}
export function ErrorIcon(props: Props) {
    const { size = 56, className } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={className}
            fill="none"
            viewBox="0 0 56 56"
        >
            <rect
                width="48"
                height="48"
                x="4"
                y="4"
                fill="#FEE4E2"
                rx="24"
            ></rect>
            <path
                stroke="#D92D20"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M28 24v4m0 4h.01M38 28c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z"
            ></path>
            <rect
                width="48"
                height="48"
                x="4"
                y="4"
                stroke="#FEF3F2"
                strokeWidth="8"
                rx="24"
            ></rect>
        </svg>
    );
}
