import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface ArrowDown2Props {
    size?: IconSize;
    className?: string;
}

/**
 * ArrowDown2 Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <ArrowDown2 size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const ArrowDown2: FC<ArrowDown2Props> = ({ size = "xs", className }) => {
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
                        d="M3 4.5L6 7.5L9 4.5"
                        stroke="#344054"
                        strokeLinejoin="round"
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
                        d="M4 6L8 10L12 6"
                        stroke="#344054"
                        stroke-width="1.5"
                        strokeLinejoin="round"
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
                        d="M4 7L10 13L16 7"
                        stroke="#344054"
                        stroke-width="1.5"
                        strokeLinejoin="round"
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
                        d="M4 8L12 16L20 8"
                        stroke="#344054"
                        stroke-width="1.5"
                        strokeLinejoin="round"
                        stroke-linejoin="round"
                    />
                </svg>
            );

        default:
            return null;
    }
};

export default ArrowDown2;
