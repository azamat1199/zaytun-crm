import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface DownloadIconProps {
    size?: IconSize;
    className?: string;
}

/**
 * DownloadIcon Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <DownloadIcon size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const DownloadIcon: FC<DownloadIconProps> = ({ size = "xs", className }) => {
    const params = { className: twMerge(className) };

    switch (size) {
        case "xs":
            return (
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M6 4.25V7.25M4.5 6.25L6 7.75L7.5 6.25M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z"
                        stroke="#101828"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            );
        case "sm":
            return (
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M8.00004 5.66683V9.66683M6.00004 8.3335L8.00004 10.3335L10 8.3335M14.6667 8.00016C14.6667 11.6821 11.6819 14.6668 8.00004 14.6668C4.31814 14.6668 1.33337 11.6821 1.33337 8.00016C1.33337 4.31826 4.31814 1.3335 8.00004 1.3335C11.6819 1.3335 14.6667 4.31826 14.6667 8.00016Z"
                        stroke="#101828"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            );
        case "md":
            return (
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M9.99996 7.08317V12.0832M7.49996 10.4165L9.99996 12.9165L12.5 10.4165M18.3333 9.99984C18.3333 14.6022 14.6023 18.3332 9.99996 18.3332C5.39759 18.3332 1.66663 14.6022 1.66663 9.99984C1.66663 5.39746 5.39759 1.6665 9.99996 1.6665C14.6023 1.6665 18.3333 5.39746 18.3333 9.99984Z"
                        stroke="#101828"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            );
        case "lg":
            return (
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M12 8.5V14.5M9 12.5L12 15.5L15 12.5M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="#101828"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            );

        default:
            return null;
    }
};

export default DownloadIcon;
