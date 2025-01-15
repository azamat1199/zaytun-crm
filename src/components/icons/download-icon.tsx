import React from "react";

interface Props {
    readonly size?: number;
    readonly color?: string;
    readonly className?: string;
}
export function DownloadIcon(props: Props) {
    const { color = "#333333", size = 16, className } = props;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M14 14H2M12 7.33333L8 11.3333M8 11.3333L4 7.33333M8 11.3333V2"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
