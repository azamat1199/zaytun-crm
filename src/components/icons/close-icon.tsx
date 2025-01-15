import React from "react";

interface Props {
    readonly size?: number;
    readonly className?: string;
}

export function CloseIcon({ className, size = 14 }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill="none"
            viewBox="0 0 14 14"
            className={className}
        >
            <path
                stroke="#667085"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M13 1L1 13M1 1l12 12"
            ></path>
        </svg>
    );
}
