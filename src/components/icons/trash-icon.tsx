import React from "react";

interface Props {
    readonly size?: number;
    readonly className?: string;
    readonly color?: string;
}

export function TrashIcon(props: Props) {
    const { color = "#F04438", size = 24, className } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            className={className}
        >
            <path
                d="M2 4.0026H3.33333M3.33333 4.0026H14M3.33333 4.0026V13.3359C3.33333 13.6896 3.47381 14.0287 3.72386 14.2787C3.97391 14.5288 4.31304 14.6693 4.66667 14.6693H11.3333C11.687 14.6693 12.0261 14.5288 12.2761 14.2787C12.5262 14.0287 12.6667 13.6896 12.6667 13.3359V4.0026H3.33333ZM5.33333 4.0026V2.66927C5.33333 2.31565 5.47381 1.97651 5.72386 1.72646C5.97391 1.47641 6.31304 1.33594 6.66667 1.33594H9.33333C9.68696 1.33594 10.0261 1.47641 10.2761 1.72646C10.5262 1.97651 10.6667 2.31565 10.6667 2.66927V4.0026M6.66667 7.33594V11.3359M9.33333 7.33594V11.3359"
                stroke={color}
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}
