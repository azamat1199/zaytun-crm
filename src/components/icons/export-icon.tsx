import React from "react";

interface Props {
    readonly size?: number;
    readonly className?: string;
    readonly color?: string;
}

export function ExportIcon(props: Props) {
    const { color = "#344054", size = 24, className } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={size}
            height={size}
            className={className}
        >
            <path
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="m16 16-4-4m0 0-4 4m4-4v9m8.39-2.61A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"
            />
        </svg>
    );
}
