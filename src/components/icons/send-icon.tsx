import React from "react";

export interface IconProps {
    readonly color?: string;
    readonly className?: string;
    readonly size?: number;
}
export function SendIcon(props: IconProps) {
    const { color = "white", size = 24, className } = props;
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
                d="M2 8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5H7M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9M2 16.5H8M2 12.5H5"
                stroke={color}
                stroke-width="1.2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}
