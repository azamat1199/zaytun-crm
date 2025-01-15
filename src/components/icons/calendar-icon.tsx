import React from "react";

interface Props {
    readonly size?: number;
    readonly color?: string;
    readonly className?: string;
}

export function CalendarIcon(props: Props) {
    const { color = "#088157", size = 24, className } = props;
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
                d="M3.09277 9.4025H20.9167"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.442 13.3088H16.4512"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.0045 13.3088H12.0137"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.55818 13.3088H7.56744"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.442 17.1955H16.4512"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12.0045 17.1955H12.0137"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.55818 17.1955H7.56744"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16.0433 2V5.29078"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.96515 2V5.29078"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.2383 3.57812H7.77096C4.83427 3.57812 3 5.21406 3 8.22115V17.2708C3 20.3252 4.83427 21.9989 7.77096 21.9989H16.229C19.175 21.9989 21 20.3535 21 17.3464V8.22115C21.0092 5.21406 19.1842 3.57812 16.2383 3.57812Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
