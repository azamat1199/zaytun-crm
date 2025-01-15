import React from "react";

interface Props {
    readonly size?: number;
    readonly className?: string;
    readonly color?: string;
}

export function CrossIcon(props: Props) {
    const { color = "#667085", size = 24, className } = props;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M18 6L6 18M6 6L18 18"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
