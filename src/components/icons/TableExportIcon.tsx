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

const TableExportIcon: FC<TableImportIconProps> = ({
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
                    <g clipPath="url(#clip0_1463_87624)">
                        <path
                            d="M7.99998 8.00024L5.99998 6.00024M5.99998 6.00024L3.99998 8.00024M5.99998 6.00024V10.5002M10.195 9.19524C10.6826 8.92937 11.0679 8.50868 11.2899 7.99955C11.5119 7.49042 11.5581 6.92185 11.4211 6.38358C11.2841 5.84531 10.9717 5.36799 10.5333 5.02696C10.0949 4.68593 9.55541 4.5006 8.99998 4.50024H8.36998C8.21864 3.91486 7.93656 3.3714 7.54495 2.91073C7.15335 2.45006 6.6624 2.08416 6.10903 1.84054C5.55566 1.59692 4.95426 1.48192 4.35004 1.50418C3.74582 1.52644 3.15451 1.68539 2.62057 1.96907C2.08662 2.25275 1.62394 2.65379 1.26729 3.14203C0.910646 3.63027 0.669325 4.193 0.56147 4.78793C0.453615 5.38286 0.482033 5.9945 0.644587 6.57687C0.807141 7.15923 1.0996 7.69717 1.49998 8.15024"
                            stroke="#101828"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1463_87624">
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
                    <path
                        d="M10.6666 10.6665L7.99997 7.99983M7.99997 7.99983L5.33331 10.6665M7.99997 7.99983V13.9998M13.5933 12.2598C14.2435 11.9053 14.7572 11.3444 15.0532 10.6656C15.3493 9.98674 15.4108 9.22865 15.2281 8.51095C15.0454 7.79326 14.629 7.15683 14.0444 6.70212C13.4599 6.24741 12.7406 6.00032 12 5.99983H11.16C10.9582 5.21932 10.5821 4.49472 10.0599 3.88049C9.5378 3.26626 8.8832 2.77839 8.14537 2.45356C7.40754 2.12874 6.60567 1.9754 5.80005 2.00508C4.99443 2.03476 4.20602 2.24669 3.49409 2.62494C2.78216 3.00318 2.16525 3.5379 1.68972 4.18888C1.2142 4.83987 0.892434 5.59018 0.748627 6.38342C0.60482 7.17666 0.64271 7.99218 0.859449 8.76867C1.07619 9.54515 1.46613 10.2624 1.99997 10.8665"
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
                        d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
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
                        d="M16 16L12 12M12 12L7.99996 16M12 12V21M20.39 18.39C21.3653 17.8583 22.1358 17.0169 22.5798 15.9986C23.0239 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6901 21.9434 10.7355 21.0666 10.0534C20.1898 9.37137 19.1108 9.00072 18 8.99998H16.74C16.4373 7.82923 15.8731 6.74232 15.0899 5.82098C14.3067 4.89964 13.3248 4.16783 12.2181 3.68059C11.1113 3.19335 9.90851 2.96334 8.70008 3.00787C7.49164 3.05239 6.30903 3.37028 5.24114 3.93765C4.17325 4.50501 3.24787 5.30709 2.53458 6.28357C1.82129 7.26004 1.33865 8.38552 1.12294 9.57538C0.90723 10.7652 0.964065 11.9885 1.28917 13.1532C1.61428 14.318 2.1992 15.3938 2.99996 16.3"
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

export default TableExportIcon;
