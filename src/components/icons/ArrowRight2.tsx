import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface ArrowRight2Props {
    size?: IconSize;
    className?: string;
}

/**
 * ArrowRight2 Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <ArrowRight2 size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const ArrowRight2: FC<ArrowRight2Props> = ({ size = "xs", className }) => {
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
                        d="M4.5 9L7.5 6L4.5 3"
                        stroke="#344054"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                        d="M6 12L10 8L6 4"
                        stroke="#344054"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                        d="M7 16L13 10L7 4"
                        stroke="#344054"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                        d="M8 20L16 12L8 4"
                        stroke="#344054"
                        stroke-width="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );

        default:
            return null;
    }
};

export default ArrowRight2;
