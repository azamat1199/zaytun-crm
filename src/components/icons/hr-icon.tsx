import React from "react";

interface Props {
    readonly size?: number;
    readonly color?: string;
    readonly className?: string;
}

export function HrIcon(props: Props) {
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
                d="M15.118 18.018C14.3846 18.2346 13.518 18.3346 12.5013 18.3346H7.5013C6.48464 18.3346 5.61797 18.2346 4.88464 18.018M15.118 18.018C14.9346 15.8513 12.7096 14.1429 10.0013 14.1429C7.29297 14.1429 5.06797 15.8513 4.88464 18.018M15.118 18.018C17.3846 17.3763 18.3346 15.6513 18.3346 12.5013V7.5013C18.3346 3.33464 16.668 1.66797 12.5013 1.66797H7.5013C3.33464 1.66797 1.66797 3.33464 1.66797 7.5013V12.5013C1.66797 15.6513 2.61797 17.3763 4.88464 18.018M10.0013 11.8096C8.3513 11.8096 7.01797 10.468 7.01797 8.81798C7.01797 7.16798 8.3513 5.83464 10.0013 5.83464C11.6513 5.83464 12.9846 7.16798 12.9846 8.81798C12.9846 10.468 11.6513 11.8096 10.0013 11.8096Z"
                stroke={color}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
