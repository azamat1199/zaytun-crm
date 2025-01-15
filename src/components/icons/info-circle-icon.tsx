import React from "react";

interface Props {
    readonly size?: number;
    readonly color?: string;
    readonly className?: string;
}
export function InfoCircleIcon(props: Props) {
    const { color = "#F36960", size = 20, className } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            className={className}
        >
            <path
                d="M9.99935 18.3346C14.5827 18.3346 18.3327 14.5846 18.3327 10.0013C18.3327 5.41797 14.5827 1.66797 9.99935 1.66797C5.41602 1.66797 1.66602 5.41797 1.66602 10.0013C1.66602 14.5846 5.41602 18.3346 9.99935 18.3346Z"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.0007 6.66797V10.8346M9.99609 13.3346H10.0036"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
