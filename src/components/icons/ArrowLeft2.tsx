import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface ArrowLeft2Props {
    size?: IconSize;
    className?: string;
}

/**
 * ArrowLeft2 Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <ArrowLeft2 size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const ArrowLeft2: FC<ArrowLeft2Props> = ({ size = "xs", className }) => {
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
                        d="M7.5 9L4.5 6L7.5 3"
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
                        d="M11 14L5 8L11 2"
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
                        d="M13 16L7 10L13 4"
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
                        d="M16 20L8 12L16 4"
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

export default ArrowLeft2;
