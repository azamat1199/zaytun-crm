import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface TablePlayIconProps {
    size?: IconSize;
    className?: string;
}

/**
 * TablePlayIcon Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <TablePlayIcon size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const TablePlayIcon: FC<TablePlayIconProps> = ({ size = "xs", className }) => {
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
                        d="M2.5 3.33167C2.5 2.5405 3.37525 2.06266 4.04076 2.49049L8.1915 5.15882C8.80382 5.55246 8.80382 6.44754 8.1915 6.84118L4.04076 9.50951C3.37525 9.93734 2.5 9.4595 2.5 8.66833V3.33167Z"
                        stroke="#101828"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            );
        case "sm":
            return (
                <svg
                    width="11"
                    height="12"
                    viewBox="0 0 11 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M1.33337 1.83167C1.33337 1.0405 2.20862 0.562658 2.87413 0.990487L9.35821 5.15882C9.97053 5.55246 9.97053 6.44754 9.35821 6.84118L2.87413 11.0095C2.20862 11.4373 1.33337 10.9595 1.33337 10.1683V1.83167Z"
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
                    width="13"
                    height="16"
                    viewBox="0 0 13 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M1.16675 2.33167C1.16675 1.5405 2.04199 1.06266 2.70751 1.49049L11.5249 7.15882C12.1372 7.55246 12.1372 8.44754 11.5249 8.84118L2.7075 14.5095C2.04199 14.9373 1.16675 14.4595 1.16675 13.6683V2.33167Z"
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
                        d="M5 5.7475C5 4.56075 6.31287 3.84399 7.31114 4.48573L17.0372 10.7382C17.9557 11.3287 17.9557 12.6713 17.0373 13.2618L7.31114 19.5143C6.31287 20.156 5 19.4393 5 18.2525V5.7475Z"
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

export default TablePlayIcon;
