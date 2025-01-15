import React from "react";

interface Props {
    readonly size?: number;
    readonly color?: string;
    readonly className?: string;
}

export function AdministrationIcon(props: Props) {
    const { color = "#344054", size = 20, className } = props;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M6.66797 1.66797V4.16797"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.332 1.66797V4.16797"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.83203 10.832H12.4987"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.83203 14.168H9.9987"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.3333 2.91797C16.1083 3.06797 17.5 4.1263 17.5 8.04297V13.193C17.5 16.6263 16.6667 18.343 12.5 18.343H7.5C3.33333 18.343 2.5 16.6263 2.5 13.193V8.04297C2.5 4.1263 3.89167 3.0763 6.66667 2.91797H13.3333Z"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
