import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface EyeIconProps {
    size?: IconSize;
    className?: string;
}

/**
 * EyeIcon Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <EyeIcon size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const EyeIcon: FC<EyeIconProps> = ({ size = "xs", className }) => {
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
                    <g clipPath="url(#clip0_1463_84374)">
                        <path
                            d="M5.99996 8.16496C4.80496 8.16496 3.83496 7.19496 3.83496 5.99996C3.83496 4.80496 4.80496 3.83496 5.99996 3.83496C7.19496 3.83496 8.16496 4.80496 8.16496 5.99996C8.16496 7.19496 7.19496 8.16496 5.99996 8.16496ZM5.99996 4.58496C5.21996 4.58496 4.58496 5.21996 4.58496 5.99996C4.58496 6.77996 5.21996 7.41496 5.99996 7.41496C6.77996 7.41496 7.41496 6.77996 7.41496 5.99996C7.41496 5.21996 6.77996 4.58496 5.99996 4.58496Z"
                            fill="#101828"
                        />
                        <path
                            d="M6.00004 10.5102C4.12004 10.5102 2.34504 9.41023 1.12504 7.50023C0.595039 6.67523 0.595039 5.33023 1.12504 4.50023C2.35004 2.59023 4.12504 1.49023 6.00004 1.49023C7.87504 1.49023 9.65004 2.59023 10.87 4.50023C11.4 5.32523 11.4 6.67023 10.87 7.50023C9.65004 9.41023 7.87504 10.5102 6.00004 10.5102ZM6.00004 2.24023C4.38504 2.24023 2.84004 3.21023 1.76004 4.90523C1.38504 5.49023 1.38504 6.51023 1.76004 7.09523C2.84004 8.79023 4.38504 9.76023 6.00004 9.76023C7.61504 9.76023 9.16004 8.79023 10.24 7.09523C10.615 6.51023 10.615 5.49023 10.24 4.90523C9.16004 3.21023 7.61504 2.24023 6.00004 2.24023Z"
                            fill="#101828"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1463_84374">
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
                    <g clipPath="url(#clip0_1463_84368)">
                        <path
                            d="M7.99995 10.8866C6.40661 10.8866 5.11328 9.59328 5.11328 7.99995C5.11328 6.40661 6.40661 5.11328 7.99995 5.11328C9.59328 5.11328 10.8866 6.40661 10.8866 7.99995C10.8866 9.59328 9.59328 10.8866 7.99995 10.8866ZM7.99995 6.11328C6.95995 6.11328 6.11328 6.95995 6.11328 7.99995C6.11328 9.03995 6.95995 9.88661 7.99995 9.88661C9.03995 9.88661 9.88661 9.03995 9.88661 7.99995C9.88661 6.95995 9.03995 6.11328 7.99995 6.11328Z"
                            fill="#101828"
                        />
                        <path
                            d="M7.99997 14.0135C5.4933 14.0135 3.12664 12.5468 1.49997 10.0002C0.793304 8.90015 0.793304 7.10682 1.49997 6.00015C3.1333 3.45348 5.49997 1.98682 7.99997 1.98682C10.5 1.98682 12.8666 3.45348 14.4933 6.00015C15.2 7.10015 15.2 8.89348 14.4933 10.0002C12.8666 12.5468 10.5 14.0135 7.99997 14.0135ZM7.99997 2.98682C5.84664 2.98682 3.78664 4.28015 2.34664 6.54015C1.84664 7.32015 1.84664 8.68015 2.34664 9.46015C3.78664 11.7201 5.84664 13.0135 7.99997 13.0135C10.1533 13.0135 12.2133 11.7201 13.6533 9.46015C14.1533 8.68015 14.1533 7.32015 13.6533 6.54015C12.2133 4.28015 10.1533 2.98682 7.99997 2.98682Z"
                            fill="#101828"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1463_84368">
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
                    <g clipPath="url(#clip0_1463_84362)">
                        <path
                            d="M10.0001 13.6083C8.00839 13.6083 6.39172 11.9916 6.39172 9.99993C6.39172 8.00827 8.00839 6.3916 10.0001 6.3916C11.9917 6.3916 13.6084 8.00827 13.6084 9.99993C13.6084 11.9916 11.9917 13.6083 10.0001 13.6083ZM10.0001 7.6416C8.70006 7.6416 7.64172 8.69993 7.64172 9.99993C7.64172 11.2999 8.70006 12.3583 10.0001 12.3583C11.3001 12.3583 12.3584 11.2999 12.3584 9.99993C12.3584 8.69993 11.3001 7.6416 10.0001 7.6416Z"
                            fill="#101828"
                        />
                        <path
                            d="M10 17.5167C6.86669 17.5167 3.90836 15.6834 1.87502 12.5001C0.991691 11.1251 0.991691 8.8834 1.87502 7.50007C3.91669 4.31673 6.87502 2.4834 10 2.4834C13.125 2.4834 16.0834 4.31673 18.1167 7.50007C19 8.87507 19 11.1167 18.1167 12.5001C16.0834 15.6834 13.125 17.5167 10 17.5167ZM10 3.7334C7.30836 3.7334 4.73336 5.35007 2.93336 8.17507C2.30836 9.15007 2.30836 10.8501 2.93336 11.8251C4.73336 14.6501 7.30836 16.2667 10 16.2667C12.6917 16.2667 15.2667 14.6501 17.0667 11.8251C17.6917 10.8501 17.6917 9.15007 17.0667 8.17507C15.2667 5.35007 12.6917 3.7334 10 3.7334Z"
                            fill="#101828"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1463_84362">
                            <rect width="20" height="20" fill="white" />
                        </clipPath>
                    </defs>
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
                        d="M12 16.3299C9.61004 16.3299 7.67004 14.3899 7.67004 11.9999C7.67004 9.60992 9.61004 7.66992 12 7.66992C14.39 7.66992 16.33 9.60992 16.33 11.9999C16.33 14.3899 14.39 16.3299 12 16.3299ZM12 9.16992C10.44 9.16992 9.17004 10.4399 9.17004 11.9999C9.17004 13.5599 10.44 14.8299 12 14.8299C13.56 14.8299 14.83 13.5599 14.83 11.9999C14.83 10.4399 13.56 9.16992 12 9.16992Z"
                        fill="#101828"
                    />
                    <path
                        d="M12 21.02C8.23996 21.02 4.68996 18.82 2.24996 15C1.18996 13.35 1.18996 10.66 2.24996 8.99998C4.69996 5.17998 8.24996 2.97998 12 2.97998C15.75 2.97998 19.3 5.17998 21.74 8.99998C22.8 10.65 22.8 13.34 21.74 15C19.3 18.82 15.75 21.02 12 21.02ZM12 4.47998C8.76996 4.47998 5.67996 6.41998 3.51996 9.80998C2.76996 10.98 2.76996 13.02 3.51996 14.19C5.67996 17.58 8.76996 19.52 12 19.52C15.23 19.52 18.32 17.58 20.48 14.19C21.23 13.02 21.23 10.98 20.48 9.80998C18.32 6.41998 15.23 4.47998 12 4.47998Z"
                        fill="#101828"
                    />
                </svg>
            );

        default:
            return null;
    }
};

export default EyeIcon;
