import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface ScheduleIconProps {
    size?: IconSize;
    className?: string;
}

/**
 * PaperDownloadIcon Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <PaperDownloadIcon size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const ScheduleIcon: FC<ScheduleIconProps> = ({ size = "md", className }) => {
    const params = { className: twMerge(className) };

    switch (size) {
        case "xs":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 12 12"
                    {...params}
                >
                    <path
                        stroke="#101828"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 1v1.5M8 1v1.5M1.75 4.545h8.5M5.998 6.85h.004m-1.855 0h.005m-.005 1.5h.005m6.348-4.1v3.93A2 2 0 007 9.5c0 .375.105.73.29 1.03.105.18.24.34.395.47H4c-1.75 0-2.5-1-2.5-2.5V4.25c0-1.5.75-2.5 2.5-2.5h4c1.75 0 2.5 1 2.5 2.5z"
                    ></path>
                    <path
                        stroke="#101828"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.742 10.136l-.62-.37a.443.443 0 01-.196-.344v-.82M11 9.5a2 2 0 11-4.001-.001A2 2 0 0111 9.5z"
                    ></path>
                </svg>
            );
        case "sm":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                    {...params}
                >
                    <path
                        stroke="#101828"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                        d="M5.333 1.333v2m5.334-2v2M2.333 6.06h11.334m-5.67 3.074h.006m-2.473 0h.006m-.006 2h.006M14 5.667v5.24a2.666 2.666 0 00-4.667 1.76c0 .5.14.973.387 1.373.14.24.32.454.527.627H5.333C3 14.667 2 13.334 2 11.334V5.667c0-2 1-3.333 3.333-3.333h5.334C13 2.333 14 3.667 14 5.667z"
                    ></path>
                    <path
                        stroke="#101828"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                        d="M12.99 13.515l-.827-.494a.59.59 0 01-.262-.458v-1.094m2.766 1.198a2.668 2.668 0 01-5.334 0 2.668 2.668 0 015.334 0z"
                    ></path>
                </svg>
            );
        case "md":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 20 20"
                    {...params}
                >
                    <path
                        stroke="#101828"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.4"
                        d="M6.667 1.667v2.5m6.666-2.5v2.5M2.917 7.575h14.166m-7.087 3.842h.008m-3.092 0h.007m-.007 2.5h.007M17.5 7.083v6.55a3.332 3.332 0 00-5.833 2.2c0 .625.175 1.217.483 1.717.175.3.4.566.658.783H6.667c-2.917 0-4.167-1.666-4.167-4.166V7.082c0-2.5 1.25-4.167 4.167-4.167h6.666c2.917 0 4.167 1.667 4.167 4.167z"
                    ></path>
                    <path
                        stroke="#101828"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.4"
                        d="M16.237 16.893l-1.034-.616a.738.738 0 01-.326-.574v-1.366m3.456 1.496A3.335 3.335 0 1115 12.5a3.335 3.335 0 013.333 3.333z"
                    ></path>
                </svg>
            );
        case "lg":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    {...params}
                >
                    <path
                        stroke="#101828"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6"
                        d="M8 2v3m8-3v3M3.5 9.09h17m-8.505 4.61h.01m-3.71 0h.008m-.009 3h.01M21 8.5v7.86c-.73-.83-1.8-1.36-3-1.36-2.21 0-4 1.79-4 4 0 .75.21 1.46.58 2.06.21.36.48.68.79.94H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5z"
                    ></path>
                    <path
                        stroke="#101828"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6"
                        d="M19.484 20.272l-1.24-.74a.886.886 0 01-.392-.688v-1.64M22 19c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z"
                    ></path>
                </svg>
            );

        default:
            return null;
    }
};

export default ScheduleIcon;
