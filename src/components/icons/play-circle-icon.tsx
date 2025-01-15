import React from "react";

interface Props {
    readonly size?: number;
    readonly color?: string;
    readonly className?: string;
}

export function PlayCircleIcon(props: Props) {
    const { color = "#F79009", size = 24, className } = props;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M12.72 22C18.2428 22 22.72 17.5228 22.72 12C22.72 6.47715 18.2428 2 12.72 2C7.19712 2 2.71997 6.47715 2.71997 12C2.71997 17.5228 7.19712 22 12.72 22Z"
                stroke={color}
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9.48997 10.56C9.48997 8.48 10.96 7.63 12.76 8.67L15.66 10.35C17.46 11.39 17.46 13.09 15.66 14.13L12.76 15.81C10.96 16.85 9.48997 16 9.48997 13.92V10.56Z"
                stroke={color}
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}
