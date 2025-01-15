import React from "react";
interface Props {
    readonly size?: number;
    readonly className?: string;
    readonly color?: string;
}

export const ImagePlaceholderIcon = (props: Props) => {
    const { color = "#667085", size = 24, className } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            className={className}
            fill="none"
            viewBox="0 0 24 24"
        >
            <rect
                width="20"
                height="20"
                x="2"
                y="2"
                stroke={color}
                strokeWidth="1.5"
                rx="4"
            ></rect>
            <path
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M2.5 15.5l3.605-1.952a4 4 0 014.959.934L17 21.5M13 15.778l1.495-.776a3 3 0 013.486.526L21 18.5"
            ></path>
            <path
                stroke={color}
                strokeWidth="1.5"
                d="M17.54 8.5a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
        </svg>
    );
};
