import React from "react";

export interface IconProps {
    readonly className?: string;
    readonly size?: number;
}
export function StepIcon(props: IconProps) {
    const { size = 32, className } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            className={className}
        >
            <g clipPath="url(#clip0_8507_25473)">
                <circle cx="16" cy="16" r="16" fill="#EBFAF3" />
                <circle cx="16" cy="16" r="5.5" fill="#039855" />
            </g>
            <defs>
                <clipPath id="clip0_8507_25473">
                    <rect width="32" height="32" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
