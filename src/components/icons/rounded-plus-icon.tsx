import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
    size?: number;
    color?: string;
    className?: string;
}

export function RoundedPlusIcon(props: Readonly<Props>) {
    const { size = 20, className = "stroke-blue-500" } = props;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={twMerge(className)}
        >
            <path
                d="M6.66602 10.0013H13.3327M9.99935 13.3346V6.66797M9.99935 18.3346C14.5827 18.3346 18.3327 14.5846 18.3327 10.0013C18.3327 5.41797 14.5827 1.66797 9.99935 1.66797C5.41602 1.66797 1.66602 5.41797 1.66602 10.0013C1.66602 14.5846 5.41602 18.3346 9.99935 18.3346Z"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}
