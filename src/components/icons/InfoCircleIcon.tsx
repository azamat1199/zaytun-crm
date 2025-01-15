import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface InfoCircleIconProps {
    size?: IconSize;
    className?: string;
}

/**
 * IconCircleIcon Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <InfoCircleIcon size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const InfoCircleIcon: FC<InfoCircleIconProps> = ({
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
                        d="M6 11C8.75 11 11 8.75 11 6C11 3.25 8.75 1 6 1C3.25 1 1 3.25 1 6C1 8.75 3.25 11 6 11Z"
                        stroke="#101828"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M6 4V6.5"
                        stroke="#101828"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M5.99731 8H6.00181"
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
                        d="M7.99992 14.6668C11.6666 14.6668 14.6666 11.6668 14.6666 8.00016C14.6666 4.3335 11.6666 1.3335 7.99992 1.3335C4.33325 1.3335 1.33325 4.3335 1.33325 8.00016C1.33325 11.6668 4.33325 14.6668 7.99992 14.6668Z"
                        stroke="#101828"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M8 5.3335V8.66683"
                        stroke="#101828"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M7.99634 10.6665H8.00233"
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
                        d="M10.0001 18.3332C14.5834 18.3332 18.3334 14.5832 18.3334 9.99984C18.3334 5.4165 14.5834 1.6665 10.0001 1.6665C5.41675 1.6665 1.66675 5.4165 1.66675 9.99984C1.66675 14.5832 5.41675 18.3332 10.0001 18.3332Z"
                        stroke="#101828"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M9.99994 6.6665V10.8332M9.99536 13.3332H10.0028"
                        stroke="#101828"
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
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke="#101828"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M12.0061 7V13.25M12 17H12.01"
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

export default InfoCircleIcon;
