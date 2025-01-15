import React from "react";

interface Props {
    readonly size?: number;
    readonly color?: string;
    readonly className?: string;
}

export function ChatIcon(props: Props) {
    const { color = "#F04438", size = 24, className } = props;
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
                d="M18.69 15.54C18.72 15.3 18.73 15.05 18.73 14.79V10.79C18.73 7.60001 17.13 6 13.94 6H7.54001C7.28001 6 7.03001 6.01001 6.79001 6.04001M18.69 15.54C18.46 18.24 16.87 19.58 13.94 19.58H13.54C13.29 19.58 13.05 19.7 12.9 19.9L11.7 21.5C11.17 22.21 10.31 22.21 9.78 21.5L8.57999 19.9C8.44999 19.73 8.16 19.58 7.94 19.58H7.54001C4.35001 19.58 2.75 18.79 2.75 14.79V10.79C2.75 7.86001 4.10001 6.27001 6.79001 6.04001M18.69 15.54C21.38 15.31 22.73 13.73 22.73 10.79V6.79001C22.73 3.60001 21.13 2 17.94 2H11.54C8.61001 2 7.02001 3.35001 6.79001 6.04001M10.7455 13.25H10.7545M14.2455 13.25H14.2545M7.2455 13.25H7.2545"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
