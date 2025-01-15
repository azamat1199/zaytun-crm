import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface TableTrashProps {
    size?: IconSize;
    className?: string;
}

/**
 * TableTrash Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <TableTrash size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const TableTrash: FC<TableTrashProps> = ({ size = "xs", className }) => {
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
                        d="M1.5 3H2.5M2.5 3H10.5M2.5 3V10C2.5 10.2652 2.60536 10.5196 2.79289 10.7071C2.98043 10.8946 3.23478 11 3.5 11H8.5C8.76522 11 9.01957 10.8946 9.20711 10.7071C9.39464 10.5196 9.5 10.2652 9.5 10V3H2.5ZM4 3V2C4 1.73478 4.10536 1.48043 4.29289 1.29289C4.48043 1.10536 4.73478 1 5 1H7C7.26522 1 7.51957 1.10536 7.70711 1.29289C7.89464 1.48043 8 1.73478 8 2V3M5 5.5V8.5M7 5.5V8.5"
                        stroke="#344054"
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
                        d="M2 3.99967H3.33333M3.33333 3.99967H14M3.33333 3.99967V13.333C3.33333 13.6866 3.47381 14.0258 3.72386 14.2758C3.97391 14.5259 4.31304 14.6663 4.66667 14.6663H11.3333C11.687 14.6663 12.0261 14.5259 12.2761 14.2758C12.5262 14.0258 12.6667 13.6866 12.6667 13.333V3.99967H3.33333ZM5.33333 3.99967V2.66634C5.33333 2.31272 5.47381 1.97358 5.72386 1.72353C5.97391 1.47348 6.31304 1.33301 6.66667 1.33301H9.33333C9.68696 1.33301 10.0261 1.47348 10.2761 1.72353C10.5262 1.97358 10.6667 2.31272 10.6667 2.66634V3.99967M6.66667 7.33301V11.333M9.33333 7.33301V11.333"
                        stroke="#344054"
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
                        d="M2.5 4.99984H4.16667M4.16667 4.99984H17.5M4.16667 4.99984V16.6665C4.16667 17.1085 4.34226 17.5325 4.65482 17.845C4.96738 18.1576 5.39131 18.3332 5.83333 18.3332H14.1667C14.6087 18.3332 15.0326 18.1576 15.3452 17.845C15.6577 17.5325 15.8333 17.1085 15.8333 16.6665V4.99984H4.16667ZM6.66667 4.99984V3.33317C6.66667 2.89114 6.84226 2.46722 7.15482 2.15466C7.46738 1.8421 7.89131 1.6665 8.33333 1.6665H11.6667C12.1087 1.6665 12.5326 1.8421 12.8452 2.15466C13.1577 2.46722 13.3333 2.89114 13.3333 3.33317V4.99984M8.33333 9.1665V14.1665M11.6667 9.1665V14.1665"
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
                        d="M3 6H5M5 6H21M5 6V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6H5ZM8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17"
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

export default TableTrash;
