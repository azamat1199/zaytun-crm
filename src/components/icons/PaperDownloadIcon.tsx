import { FC } from "react";
import { IconSize } from "./icons.type";
import { twMerge } from "tailwind-merge";

interface PaperDownloadIconProps {
    size?: IconSize;
    className?: string;
}

/**
 * PaperDownloadIcon Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <PaperDownloadIcon size="sm" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be 'xs', 'sm', 'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const PaperDownloadIcon: FC<PaperDownloadIconProps> = ({
    size = "xs",
    className,
}) => {
    const params = { className: twMerge(className) };

    switch (size) {
        case "xs":
            return (
                <svg
                    width="10"
                    height="12"
                    viewBox="0 0 10 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M6 1.13477V3.20004C6 3.48006 6 3.62007 6.0545 3.72703C6.10243 3.82111 6.17892 3.8976 6.273 3.94554C6.37996 4.00004 6.51997 4.00004 6.8 4.00004H8.86527M3.5 7.5L5 9M5 9L6.5 7.5M5 9L5 6M6 1H3.4C2.55992 1 2.13988 1 1.81901 1.16349C1.53677 1.3073 1.3073 1.53677 1.16349 1.81901C1 2.13988 1 2.55992 1 3.4V8.6C1 9.44008 1 9.86012 1.16349 10.181C1.3073 10.4632 1.53677 10.6927 1.81901 10.8365C2.13988 11 2.55992 11 3.4 11H6.6C7.44008 11 7.86012 11 8.18099 10.8365C8.46323 10.6927 8.6927 10.4632 8.83651 10.181C9 9.86012 9 9.44008 9 8.6V4L6 1Z"
                        stroke="#101828"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );
        case "sm":
            return (
                <svg
                    width="13"
                    height="15"
                    viewBox="0 0 13 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M7.66667 1.17969V3.93338C7.66667 4.30675 7.66667 4.49343 7.73933 4.63604C7.80324 4.76148 7.90523 4.86347 8.03067 4.92738C8.17328 5.00005 8.35996 5.00005 8.73333 5.00005H11.487M4.33333 9.66667L6.33333 11.6667M6.33333 11.6667L8.33333 9.66667M6.33333 11.6667L6.33333 7.66667M7.66667 1H4.2C3.07989 1 2.51984 1 2.09202 1.21799C1.71569 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2V11.1333C1 12.2534 1 12.8135 1.21799 13.2413C1.40973 13.6176 1.71569 13.9236 2.09202 14.1153C2.51984 14.3333 3.07989 14.3333 4.2 14.3333H8.46667C9.58677 14.3333 10.1468 14.3333 10.5746 14.1153C10.951 13.9236 11.2569 13.6176 11.4487 13.2413C11.6667 12.8135 11.6667 12.2534 11.6667 11.1333V5L7.66667 1Z"
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
                    width="16"
                    height="19"
                    viewBox="0 0 16 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M9.33333 1.22461V4.66673C9.33333 5.13344 9.33333 5.36679 9.42416 5.54505C9.50406 5.70185 9.63154 5.82934 9.78834 5.90923C9.9666 6.00006 10.2 6.00006 10.6667 6.00006H14.1088M5.16667 11.8333L7.66667 14.3333M7.66667 14.3333L10.1667 11.8333M7.66667 14.3333L7.66667 9.33333M9.33333 1H5C3.59987 1 2.8998 1 2.36502 1.27248C1.89462 1.51217 1.51217 1.89462 1.27248 2.36502C1 2.8998 1 3.59987 1 5V13.6667C1 15.0668 1 15.7669 1.27248 16.3016C1.51217 16.772 1.89462 17.1545 2.36502 17.3942C2.8998 17.6667 3.59987 17.6667 5 17.6667H10.3333C11.7335 17.6667 12.4335 17.6667 12.9683 17.3942C13.4387 17.1545 13.8212 16.772 14.0608 16.3016C14.3333 15.7669 14.3333 15.0668 14.3333 13.6667V6L9.33333 1Z"
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
                    width="18"
                    height="22"
                    viewBox="0 0 18 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M11 1.26953V5.40007C11 5.96012 11 6.24015 11.109 6.45406C11.2049 6.64222 11.3578 6.7952 11.546 6.89108C11.7599 7.00007 12.0399 7.00007 12.6 7.00007H16.7305M6 14L9 17M9 17L12 14M9 17L9 11M11 1H5.8C4.11984 1 3.27976 1 2.63803 1.32698C2.07354 1.6146 1.6146 2.07354 1.32698 2.63803C1 3.27976 1 4.11984 1 5.8V16.2C1 17.8802 1 18.7202 1.32698 19.362C1.6146 19.9265 2.07354 20.3854 2.63803 20.673C3.27976 21 4.11984 21 5.8 21H12.2C13.8802 21 14.7202 21 15.362 20.673C15.9265 20.3854 16.3854 19.9265 16.673 19.362C17 18.7202 17 17.8802 17 16.2V7L11 1Z"
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

export default PaperDownloadIcon;
