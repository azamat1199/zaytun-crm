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

const TableImportIcon: FC<TableImportIconProps> = ({
    size = "xs",
    className,
}) => {
    const params = { className: twMerge(className) };

    switch (size) {
        case "xs":
            return (
                <svg
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M4.49831 3.49976L6.49831 5.49976M6.49831 5.49976L8.49831 3.49976M6.49831 5.49976L6.49831 0.999762M2.30331 2.30476C1.81564 2.57063 1.4304 2.99132 1.20838 3.50045C0.986355 4.00958 0.940205 4.57815 1.07721 5.11642C1.21421 5.65469 1.52657 6.13201 1.96498 6.47304C2.40338 6.81407 2.94288 6.9994 3.49831 6.99976L4.12831 6.99976C4.27965 7.58514 4.56173 8.1286 4.95334 8.58927C5.34494 9.04994 5.83589 9.41584 6.38926 9.65946C6.94263 9.90308 7.54404 10.0181 8.14825 9.99582C8.75247 9.97356 9.34378 9.81461 9.87772 9.53093C10.4117 9.24725 10.8744 8.84621 11.231 8.35797C11.5876 7.86973 11.829 7.307 11.9368 6.71207C12.0447 6.11714 12.0163 5.5055 11.8537 4.92313C11.6912 4.34077 11.3987 3.80283 10.9983 3.34976"
                        stroke="#101828"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            );
        case "sm":
            return (
                <svg
                    width="17"
                    height="14"
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M5.66442 4.3335L8.33108 7.00017M8.33108 7.00017L10.9977 4.33351M8.33108 7.00017L8.33108 1.00017M2.73775 2.74017C2.08752 3.09466 1.57386 3.65558 1.27783 4.33442C0.981806 5.01326 0.920273 5.77135 1.10294 6.48904C1.28562 7.20674 1.70209 7.84316 2.28664 8.29787C2.87118 8.75258 3.59051 8.99968 4.33108 9.00017L5.17108 9.00017C5.37287 9.78068 5.74898 10.5053 6.27112 11.1195C6.79326 11.7337 7.44785 12.2216 8.18568 12.5464C8.92351 12.8713 9.72538 13.0246 10.531 12.9949C11.3366 12.9652 12.125 12.7533 12.837 12.3751C13.5489 11.9968 14.1658 11.4621 14.6413 10.8111C15.1169 10.1601 15.4386 9.40982 15.5824 8.61658C15.7262 7.82334 15.6883 7.00782 15.4716 6.23133C15.2549 5.45485 14.8649 4.7376 14.3311 4.13351"
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
                    width="21"
                    height="17"
                    viewBox="0 0 21 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M6.83064 5.16676L10.164 8.50009M10.164 8.50009L13.4973 5.16676M10.164 8.50009L10.164 1.00009M3.17231 3.17509C2.35953 3.6182 1.71745 4.31936 1.34741 5.16791C0.977379 6.01645 0.900463 6.96407 1.1288 7.86118C1.35714 8.7583 1.87773 9.55383 2.60842 10.1222C3.3391 10.6906 4.23825 10.9995 5.16397 11.0001L6.21397 11.0001C6.46621 11.9757 6.93634 12.8815 7.58902 13.6493C8.2417 14.4171 9.05994 15.0269 9.98222 15.4329C10.9045 15.839 11.9068 16.0306 12.9139 15.9935C13.9209 15.9564 14.9064 15.6915 15.7963 15.2187C16.6862 14.7459 17.4574 14.0775 18.0518 13.2638C18.6462 12.45 19.0484 11.5121 19.2282 10.5206C19.4079 9.52905 19.3606 8.50965 19.0896 7.53904C18.8187 6.56844 18.3313 5.67187 17.664 4.91676"
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
                    height="20"
                    viewBox="0 0 24 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    {...params}
                >
                    <path
                        d="M7.99674 6.00001L11.9967 10M11.9967 10L15.9967 6.00002M11.9967 10L11.9967 1.00001M3.60675 3.61002C2.63141 4.14174 1.86091 4.98313 1.41687 6.00139C0.97283 7.01965 0.88053 8.15678 1.15454 9.23332C1.42855 10.3099 2.05326 11.2645 2.93007 11.9466C3.80689 12.6286 4.88588 12.9993 5.99674 13L7.25674 13C7.55943 14.1708 8.12358 15.2577 8.9068 16.179C9.69001 17.1004 10.6719 17.8322 11.7786 18.3194C12.8854 18.8067 14.0882 19.0367 15.2966 18.9921C16.5051 18.9476 17.6877 18.6297 18.7556 18.0624C19.8235 17.495 20.7488 16.6929 21.4621 15.7164C22.1754 14.74 22.6581 13.6145 22.8738 12.4246C23.0895 11.2348 23.0326 10.0115 22.7075 8.84676C22.3824 7.68203 21.7975 6.60615 20.9967 5.70002"
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

export default TableImportIcon;
