import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface TableImportIconProps {
    size?: IconSize;
    className?: string;
}

/**
 * TableImportIcon Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <TableImportIcon size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const TableFilterIcon: FC<TableImportIconProps> = ({
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
                        d="M1.5 3.5H10.5"
                        stroke="#101828"
                        stroke-linecap="round"
                    />
                    <path d="M3 6H9" stroke="#101828" stroke-linecap="round" />
                    <path
                        d="M5 8.5H7"
                        stroke="#101828"
                        stroke-linecap="round"
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
                        d="M2 4.6665H14"
                        stroke="#101828"
                        stroke-width="1.2"
                        stroke-linecap="round"
                    />
                    <path
                        d="M4 8H12"
                        stroke="#101828"
                        stroke-width="1.2"
                        stroke-linecap="round"
                    />
                    <path
                        d="M6.66663 11.3335H9.33329"
                        stroke="#101828"
                        stroke-width="1.2"
                        stroke-linecap="round"
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
                        d="M2.5 5.8335H17.5"
                        stroke="#101828"
                        stroke-width="1.4"
                        stroke-linecap="round"
                    />
                    <path
                        d="M5 10H15"
                        stroke="#101828"
                        stroke-width="1.4"
                        stroke-linecap="round"
                    />
                    <path
                        d="M8.33337 14.1665H11.6667"
                        stroke="#101828"
                        stroke-width="1.4"
                        stroke-linecap="round"
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
                        d="M3 7H21"
                        stroke="#101828"
                        stroke-width="1.6"
                        stroke-linecap="round"
                    />
                    <path
                        d="M6 12H18"
                        stroke="#101828"
                        stroke-width="1.6"
                        stroke-linecap="round"
                    />
                    <path
                        d="M10 17H14"
                        stroke="#101828"
                        stroke-width="1.6"
                        stroke-linecap="round"
                    />
                </svg>
            );

        default:
            return null;
    }
};

export default TableFilterIcon;
