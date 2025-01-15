import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface MoreHorizontalProps {
    size?: IconSize;
    className?: string;
}

/**
 * MoreHorizontal Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <MoreHorizontal size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const MoreHorizontal: FC<MoreHorizontalProps> = ({
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
                        d="M6.5 6C6.5 5.72386 6.27614 5.5 6 5.5C5.72386 5.5 5.5 5.72386 5.5 6C5.5 6.27614 5.72386 6.5 6 6.5C6.27614 6.5 6.5 6.27614 6.5 6Z"
                        stroke="#344054"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M3 6C3 5.72386 2.77614 5.5 2.5 5.5C2.22386 5.5 2 5.72386 2 6C2 6.27614 2.22386 6.5 2.5 6.5C2.77614 6.5 3 6.27614 3 6Z"
                        stroke="#344054"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M10 6C10 5.72386 9.77614 5.5 9.5 5.5C9.22386 5.5 9 5.72386 9 6C9 6.27614 9.22386 6.5 9.5 6.5C9.77614 6.5 10 6.27614 10 6Z"
                        stroke="#344054"
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
                        d="M8.33337 8.00016C8.33337 7.63197 8.0349 7.3335 7.66671 7.3335C7.29852 7.3335 7.00004 7.63197 7.00004 8.00016C7.00004 8.36835 7.29852 8.66683 7.66671 8.66683C8.0349 8.66683 8.33337 8.36835 8.33337 8.00016Z"
                        stroke="#344054"
                        stroke-width="1.3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M3.66671 8.00016C3.66671 7.63197 3.36823 7.3335 3.00004 7.3335C2.63185 7.3335 2.33337 7.63197 2.33337 8.00016C2.33337 8.36835 2.63185 8.66683 3.00004 8.66683C3.36823 8.66683 3.66671 8.36835 3.66671 8.00016Z"
                        stroke="#344054"
                        stroke-width="1.3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M13 8.00016C13 7.63197 12.7016 7.3335 12.3334 7.3335C11.9652 7.3335 11.6667 7.63197 11.6667 8.00016C11.6667 8.36835 11.9652 8.66683 12.3334 8.66683C12.7016 8.66683 13 8.36835 13 8.00016Z"
                        stroke="#344054"
                        stroke-width="1.3"
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
                        d="M10.8333 10.0003C10.8333 9.54009 10.4602 9.16699 9.99992 9.16699C9.53968 9.16699 9.16658 9.54009 9.16658 10.0003C9.16658 10.4606 9.53968 10.8337 9.99992 10.8337C10.4602 10.8337 10.8333 10.4606 10.8333 10.0003Z"
                        stroke="#344054"
                        stroke-width="1.7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M4.99992 10.0003C4.99992 9.54009 4.62682 9.16699 4.16659 9.16699C3.70635 9.16699 3.33325 9.54009 3.33325 10.0003C3.33325 10.4606 3.70635 10.8337 4.16659 10.8337C4.62682 10.8337 4.99992 10.4606 4.99992 10.0003Z"
                        stroke="#344054"
                        stroke-width="1.7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M16.6666 10.0003C16.6666 9.54009 16.2935 9.16699 15.8333 9.16699C15.373 9.16699 14.9999 9.54009 14.9999 10.0003C14.9999 10.4606 15.373 10.8337 15.8333 10.8337C16.2935 10.8337 16.6666 10.4606 16.6666 10.0003Z"
                        stroke="#344054"
                        stroke-width="1.7"
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
                        d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z"
                        stroke="#344054"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12Z"
                        stroke="#344054"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12Z"
                        stroke="#344054"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            );

        default:
            return null;
    }
};

export default MoreHorizontal;
