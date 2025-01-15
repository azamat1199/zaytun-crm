import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface MoreVerticalIconProps {
    size?: IconSize;
    className?: string;
}

/**
 * MoreVerticalIcon Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <MoreVerticalIcon size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const MoreVerticalIcon: FC<MoreVerticalIconProps> = ({
    size = "xs",
    className,
}) => {
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
                        d="M6 6.5C6.27614 6.5 6.5 6.27614 6.5 6C6.5 5.72386 6.27614 5.5 6 5.5C5.72386 5.5 5.5 5.72386 5.5 6C5.5 6.27614 5.72386 6.5 6 6.5Z"
                        stroke="#101828"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M6 3C6.27614 3 6.5 2.77614 6.5 2.5C6.5 2.22386 6.27614 2 6 2C5.72386 2 5.5 2.22386 5.5 2.5C5.5 2.77614 5.72386 3 6 3Z"
                        stroke="#101828"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M6 10C6.27614 10 6.5 9.77614 6.5 9.5C6.5 9.22386 6.27614 9 6 9C5.72386 9 5.5 9.22386 5.5 9.5C5.5 9.77614 5.72386 10 6 10Z"
                        stroke="#101828"
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
                        d="M7.66667 8.66699C8.03486 8.66699 8.33333 8.36852 8.33333 8.00033C8.33333 7.63214 8.03486 7.33366 7.66667 7.33366C7.29848 7.33366 7 7.63214 7 8.00033C7 8.36852 7.29848 8.66699 7.66667 8.66699Z"
                        fill="#101828"
                    />
                    <path
                        d="M7.66667 4.00033C8.03486 4.00033 8.33333 3.70185 8.33333 3.33366C8.33333 2.96547 8.03486 2.66699 7.66667 2.66699C7.29848 2.66699 7 2.96547 7 3.33366C7 3.70185 7.29848 4.00033 7.66667 4.00033Z"
                        fill="#101828"
                    />
                    <path
                        d="M7.66667 13.3337C8.03486 13.3337 8.33333 13.0352 8.33333 12.667C8.33333 12.2988 8.03486 12.0003 7.66667 12.0003C7.29848 12.0003 7 12.2988 7 12.667C7 13.0352 7.29848 13.3337 7.66667 13.3337Z"
                        fill="#101828"
                    />
                    <path
                        d="M7.66667 8.66699C8.03486 8.66699 8.33333 8.36852 8.33333 8.00033C8.33333 7.63214 8.03486 7.33366 7.66667 7.33366C7.29848 7.33366 7 7.63214 7 8.00033C7 8.36852 7.29848 8.66699 7.66667 8.66699Z"
                        stroke="#101828"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M7.66667 4.00033C8.03486 4.00033 8.33333 3.70185 8.33333 3.33366C8.33333 2.96547 8.03486 2.66699 7.66667 2.66699C7.29848 2.66699 7 2.96547 7 3.33366C7 3.70185 7.29848 4.00033 7.66667 4.00033Z"
                        stroke="#101828"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M7.66667 13.3337C8.03486 13.3337 8.33333 13.0352 8.33333 12.667C8.33333 12.2988 8.03486 12.0003 7.66667 12.0003C7.29848 12.0003 7 12.2988 7 12.667C7 13.0352 7.29848 13.3337 7.66667 13.3337Z"
                        stroke="#101828"
                        stroke-width="1.2"
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
                        d="M9.99984 10.8335C10.4601 10.8335 10.8332 10.4604 10.8332 10.0002C10.8332 9.53993 10.4601 9.16683 9.99984 9.16683C9.5396 9.16683 9.1665 9.53993 9.1665 10.0002C9.1665 10.4604 9.5396 10.8335 9.99984 10.8335Z"
                        fill="#101828"
                    />
                    <path
                        d="M9.99984 5.00016C10.4601 5.00016 10.8332 4.62707 10.8332 4.16683C10.8332 3.70659 10.4601 3.3335 9.99984 3.3335C9.5396 3.3335 9.1665 3.70659 9.1665 4.16683C9.1665 4.62707 9.5396 5.00016 9.99984 5.00016Z"
                        fill="#101828"
                    />
                    <path
                        d="M9.99984 16.6668C10.4601 16.6668 10.8332 16.2937 10.8332 15.8335C10.8332 15.3733 10.4601 15.0002 9.99984 15.0002C9.5396 15.0002 9.1665 15.3733 9.1665 15.8335C9.1665 16.2937 9.5396 16.6668 9.99984 16.6668Z"
                        fill="#101828"
                    />
                    <path
                        d="M9.99984 10.8335C10.4601 10.8335 10.8332 10.4604 10.8332 10.0002C10.8332 9.53993 10.4601 9.16683 9.99984 9.16683C9.5396 9.16683 9.1665 9.53993 9.1665 10.0002C9.1665 10.4604 9.5396 10.8335 9.99984 10.8335Z"
                        stroke="#101828"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M9.99984 5.00016C10.4601 5.00016 10.8332 4.62707 10.8332 4.16683C10.8332 3.70659 10.4601 3.3335 9.99984 3.3335C9.5396 3.3335 9.1665 3.70659 9.1665 4.16683C9.1665 4.62707 9.5396 5.00016 9.99984 5.00016Z"
                        stroke="#101828"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M9.99984 16.6668C10.4601 16.6668 10.8332 16.2937 10.8332 15.8335C10.8332 15.3733 10.4601 15.0002 9.99984 15.0002C9.5396 15.0002 9.1665 15.3733 9.1665 15.8335C9.1665 16.2937 9.5396 16.6668 9.99984 16.6668Z"
                        stroke="#101828"
                        stroke-width="1.4"
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
                        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                        fill="#101828"
                    />
                    <path
                        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                        fill="#101828"
                    />
                    <path
                        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                        fill="#101828"
                    />
                    <path
                        d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                        stroke="#101828"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                        stroke="#101828"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                        stroke="#101828"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            );

        default:
            return null;
    }
};

export default MoreVerticalIcon;
