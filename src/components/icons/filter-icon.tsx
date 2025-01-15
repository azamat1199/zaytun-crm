import React from "react";

interface Props {
    readonly size?: number;
    readonly className?: string;
    readonly color?: string;
}

export function FilterIcon(props: Props) {
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
                strokeWidth={1.5}
                d="M3 7h18M6 12h12M10 17h4"
            />
        </svg>
    );
}
