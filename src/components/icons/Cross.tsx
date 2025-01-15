import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface CrossProps {
    size?: IconSize;
    className?: string;
}

/**
 * Cross Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <Cross size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const Cross: FC<CrossProps> = ({ size = "xs", className }) => {
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
                        d="M9 3L3 9M3 3L9 9"
                        stroke="#344054"
                        strokeWidth="0.8"
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
                        d="M12 4L4 12M4 4L12 12"
                        stroke="#344054"
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
                        d="M16 4L4 16M4 4L16 16"
                        stroke="#344054"
                        strokeWidth="1.2"
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
                        d="M19 5L5 19M5 5L19 19"
                        stroke="#344054"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );

        default:
            return null;
    }
};

export default Cross;
