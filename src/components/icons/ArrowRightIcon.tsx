import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface ArrowRightIconProps {
    size?: IconSize;
    className?: string;
}

/**
 * ArrowRightIcon Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <ArrowRightIcon size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const ArrowRightIcon: FC<ArrowRightIconProps> = ({
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
                        d="M9 5.99995H2M9 5.99995L6.17676 3M9 5.99995L6.17676 9"
                        stroke="#101828"
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
                        d="M13.1667 7.81705H3.16675M13.1667 7.81705L9.13355 3.80078M13.1667 7.81705L9.13355 11.8334"
                        stroke="#101828"
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
                        d="M16.5 10.0203H4M16.5 10.0203L11.4585 5M16.5 10.0203L11.4585 15.0408"
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
                        d="M19 12.0244H4M19 12.0244L12.9502 6M19 12.0244L12.9502 18.049"
                        stroke="#101828"
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

export default ArrowRightIcon;
