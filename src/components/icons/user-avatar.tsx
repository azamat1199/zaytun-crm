import React from "react";
interface Props {
    readonly size?: number;
    readonly className?: string;
    readonly color?: string;
}

export function UserAvatar(props: Props) {
    const { color = "#7F56D9", size = 24, className } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={className}
            fill="none"
            viewBox="0 0 80 80"
        >
            <path
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="6.667"
                d="M66.667 70v-6.667A13.333 13.333 0 0053.333 50H26.667a13.333 13.333 0 00-13.334 13.333V70m40-46.667c0 7.364-5.97 13.334-13.333 13.334-7.364 0-13.333-5.97-13.333-13.334C26.667 15.97 32.637 10 40 10c7.364 0 13.333 5.97 13.333 13.333z"
            ></path>
        </svg>
    );
}
