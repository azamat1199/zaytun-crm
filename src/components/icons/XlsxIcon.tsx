import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface XlsxIconProps {
    size?: "md" | "lg";
    className?: string;
}

/**
 * XlsxIcon Component
 * @description A React component that renders a left-pointing arrow icon.
 * @example
 * <XlsxIcon size="md" className="text-red-500" />
 * @component
 * @param {Object} props - Component props.
 * @param {IconSize} [props.size='xs'] - Size of the arrow icon. Can be  'md', or 'lg'. Defaults to 'xs'.
 * @param {string} [props.className] - Additional CSS class names to be applied to the component.
 * @returns {JSX.Element | null} A SVG element representing the left-pointing arrow icon or null if size is not 'xs'.
 */

const XlsxIcon: FC<XlsxIconProps> = ({ size = "md", className }) => {
    const params = { className: twMerge(className) };

    switch (size) {
        case "md":
            return (
                <svg
                    width="38"
                    height="40"
                    viewBox="0 0 38 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H27.4444L32.4056 5.17006L38 11V36C38 38.2091 36.2091 40 34 40H4C1.79086 40 0 38.2091 0 36V4Z"
                        fill="#038A4D"
                    />
                </svg>
            );
        case "lg":
            return (
                <svg
                    width="46"
                    height="48"
                    viewBox="0 0 46 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M0 4C0 1.79086 1.79086 0 4 0H32.8571L39.2055 6.27936L46 13V44C46 46.2091 44.2091 48 42 48H4C1.79086 48 0 46.2091 0 44V4Z"
                        fill="#038A4D"
                    />
                    <path
                        d="M46 13H34.857C33.7525 13 32.857 12.1046 32.857 11V0L39.4285 6.40142L46 13Z"
                        fill="white"
                        fill-opacity="0.55"
                    />
                    <path
                        d="M7.91625 20.8182L10.1584 24.5469H10.238L12.4901 20.8182H14.5931L11.456 25.9091L14.6428 31H12.505L10.238 27.2962H10.1584L7.89139 31H5.76355L8.98017 25.9091L5.80332 20.8182H7.91625ZM16.0411 31V20.8182H17.8855V29.4538H22.3699V31H16.0411ZM29.5041 23.6172C29.4577 23.183 29.2622 22.8449 28.9175 22.603C28.5761 22.361 28.132 22.2401 27.5851 22.2401C27.2006 22.2401 26.8708 22.2981 26.5958 22.4141C26.3207 22.5301 26.1102 22.6875 25.9644 22.8864C25.8185 23.0852 25.744 23.3123 25.7406 23.5675C25.7406 23.7796 25.7887 23.9635 25.8848 24.1193C25.9842 24.2751 26.1185 24.4077 26.2875 24.517C26.4566 24.6231 26.6438 24.7126 26.8493 24.7855C27.0548 24.8584 27.2619 24.9197 27.4708 24.9695L28.4253 25.2081C28.8098 25.2976 29.1793 25.4186 29.534 25.571C29.8919 25.7235 30.2118 25.9157 30.4935 26.1477C30.7785 26.3797 31.0039 26.6598 31.1696 26.9879C31.3353 27.3161 31.4182 27.7005 31.4182 28.1413C31.4182 28.7379 31.2657 29.2633 30.9608 29.7173C30.6559 30.1681 30.2151 30.5211 29.6384 30.7763C29.065 31.0282 28.3706 31.1541 27.5553 31.1541C26.7631 31.1541 26.0754 31.0315 25.4921 30.7862C24.912 30.541 24.458 30.183 24.1298 29.7124C23.805 29.2417 23.6294 28.6683 23.6029 27.9922H25.4175C25.444 28.3468 25.5534 28.6418 25.7456 28.8771C25.9378 29.1125 26.1881 29.2881 26.4963 29.4041C26.8079 29.5201 27.1559 29.5781 27.5404 29.5781C27.9414 29.5781 28.2927 29.5185 28.5943 29.3991C28.8993 29.2765 29.1379 29.1075 29.3102 28.892C29.4826 28.6733 29.5704 28.4181 29.5737 28.1264C29.5704 27.8613 29.4925 27.6425 29.3401 27.4702C29.1876 27.2945 28.9738 27.1487 28.6987 27.0327C28.427 26.9134 28.1088 26.8073 27.7442 26.7145L26.5858 26.4162C25.7473 26.2008 25.0844 25.8743 24.5972 25.4368C24.1133 24.996 23.8713 24.411 23.8713 23.6818C23.8713 23.0819 24.0337 22.5566 24.3585 22.1058C24.6867 21.6551 25.1325 21.3054 25.6959 21.0568C26.2593 20.8049 26.8974 20.679 27.61 20.679C28.3325 20.679 28.9655 20.8049 29.5091 21.0568C30.056 21.3054 30.4852 21.6518 30.7967 22.0959C31.1083 22.5367 31.2691 23.0438 31.279 23.6172H29.5041ZM34.6037 20.8182L36.8459 24.5469H36.9255L39.1776 20.8182H41.2806L38.1435 25.9091L41.3303 31H39.1925L36.9255 27.2962H36.8459L34.5789 31H32.451L35.6677 25.9091L32.4908 20.8182H34.6037Z"
                        fill="white"
                    />
                </svg>
            );

        default:
            return null;
    }
};

export default XlsxIcon;
