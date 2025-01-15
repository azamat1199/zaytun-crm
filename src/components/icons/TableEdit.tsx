import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface TableEditProps {
    size?: IconSize;
    className?: string;
}

/**
 * TableEdit Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <TableEdit size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const TableEdit: FC<TableEditProps> = ({ size = "xs", className }) => {
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
                    <g clipPath="url(#clip0_1463_87700)">
                        <path
                            d="M8.5 1.50015C8.63132 1.36883 8.78722 1.26466 8.95881 1.19359C9.13039 1.12252 9.31428 1.08594 9.5 1.08594C9.68572 1.08594 9.86962 1.12252 10.0412 1.19359C10.2128 1.26466 10.3687 1.36883 10.5 1.50015C10.6313 1.63147 10.7355 1.78737 10.8066 1.95896C10.8776 2.13054 10.9142 2.31443 10.9142 2.50015C10.9142 2.68587 10.8776 2.86977 10.8066 3.04135C10.7355 3.21293 10.6313 3.36883 10.5 3.50015L3.75 10.2502L1 11.0002L1.75 8.25015L8.5 1.50015Z"
                            stroke="#344054"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1463_87700">
                            <rect width="12" height="12" fill="white" />
                        </clipPath>
                    </defs>
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
                    <g clipPath="url(#clip0_1463_87695)">
                        <path
                            d="M11.3333 2.00004C11.5083 1.82494 11.7162 1.68605 11.945 1.59129C12.1738 1.49653 12.419 1.44775 12.6666 1.44775C12.9142 1.44775 13.1594 1.49653 13.3882 1.59129C13.617 1.68605 13.8248 1.82494 13.9999 2.00004C14.175 2.17513 14.3139 2.383 14.4087 2.61178C14.5034 2.84055 14.5522 3.08575 14.5522 3.33337C14.5522 3.58099 14.5034 3.82619 14.4087 4.05497C14.3139 4.28374 14.175 4.49161 13.9999 4.66671L4.99992 13.6667L1.33325 14.6667L2.33325 11L11.3333 2.00004Z"
                            stroke="#344054"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1463_87695">
                            <rect width="16" height="16" fill="white" />
                        </clipPath>
                    </defs>
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
                        d="M14.1666 2.49993C14.3855 2.28106 14.6453 2.10744 14.9313 1.98899C15.2173 1.87054 15.5238 1.80957 15.8333 1.80957C16.1428 1.80957 16.4493 1.87054 16.7353 1.98899C17.0213 2.10744 17.2811 2.28106 17.5 2.49993C17.7188 2.7188 17.8924 2.97863 18.0109 3.2646C18.1294 3.55057 18.1903 3.85706 18.1903 4.16659C18.1903 4.47612 18.1294 4.78262 18.0109 5.06859C17.8924 5.35455 17.7188 5.61439 17.5 5.83326L6.24996 17.0833L1.66663 18.3333L2.91663 13.7499L14.1666 2.49993Z"
                        stroke="#344054"
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
                        d="M17 2.99981C17.2626 2.73717 17.5744 2.52883 17.9176 2.38669C18.2608 2.24455 18.6286 2.17139 19 2.17139C19.3714 2.17139 19.7392 2.24455 20.0824 2.38669C20.4256 2.52883 20.7374 2.73717 21 2.99981C21.2626 3.26246 21.471 3.57426 21.6131 3.91742C21.7553 4.26058 21.8284 4.62838 21.8284 4.99981C21.8284 5.37125 21.7553 5.73905 21.6131 6.08221C21.471 6.42537 21.2626 6.73717 21 6.99981L7.5 20.4998L2 21.9998L3.5 16.4998L17 2.99981Z"
                        stroke="#344054"
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

export default TableEdit;
