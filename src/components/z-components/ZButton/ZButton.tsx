import { Loader } from "@zaytun/components";
import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface ZButtonProps
    extends Omit<ComponentPropsWithoutRef<"button">, "className"> {
    size?: "lg" | "md" | "sm" | "xs";
    className?: string | string[];
    variant?: "primary" | "soft-color" | "secondary" | "text-button";
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    iconButton?: boolean;
    pending?: boolean;
    color?: "primary" | "warning";
}

/**
 * ZButton is a customizable button component.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <ZButton>Submit</ZButton>
 *
 * // With start icon
 * <ZButton startIcon={<Icon />} >Submit</ZButton>
 *
 * @param {Object} props - The props for ZButton component.
 * @param {string|string[]} [props.className] - Additional class name(s) for the button element.
 * @param {('lg' | 'md' | 'sm' | 'xs')} [props.size='lg'] - The size of the button.
 * @param {('primary' | 'soft-color' | 'secondary' | 'text-button')} [props.variant='primary'] - The variant of the button.
 * @param {ReactNode} [props.startIcon] - The start icon for the button.
 * @param {ReactNode} [props.endIcon] - The end icon for the button.
 * @param {boolean} [props.iconButton=false] - Indicates whether the button is an icon button.
 * @param {boolean} [props.pending=false] - Indicates the loading indicator
 * @returns {JSX.Element} - Rendered ZButton component.
 */

const ZButton: FC<ZButtonProps> = (props) => {
    const {
        size = "lg",
        className,
        variant = "primary",
        children,
        startIcon,
        endIcon,
        iconButton,
        pending,
        ...computedProps
    } = props;

    const loaderSize: Record<string, number> = {
        lg: 20,
        md: 20,
        sm: 12,
    };

    const lgSizeStyles = [
        "px-8 h-12 text-b-1-m rounded-md [&>span.icon-box_svg]:w-6 [&>span.icon-box_svg]:h-6",
    ];
    const mdSizeStyles = [
        "px-8 h-10 text-b-2-m rounded-md [&>span.icon-box_svg]:w-5 [&>span.icon-box_svg]:h-5",
    ];
    const smSizeStyles = [
        "px-4 h-8 rounded text-b-3-m",
        "[&>span.icon-box_svg]:w-4 [&>span.icon-box_svg]:h-4",
    ];

    const xsSizeStyles =
        "px-2 h-6 rounded text-b-4-m [&>span.icon-box_svg]:w-3 [&>span.icon-box_svg]:h-3";

    const commonDisabledStyles =
        "disabled:bg-c_neutral-100 disabled:text-c_neutral-400 disabled:border-0";

    const primaryVariantStyles = [
        "bg-c_primary text-white [&_path]:stroke-white [&_svg]:stroke-white",
        "hover:bg-[#35AD77]",
        "active:bg-[#026C3C]",
        "[&>span.icon-box_path]:stroke-white [&>span.icon-box_svg]:stroke-white",
        commonDisabledStyles,
    ];

    const softColorVariantStyles = [
        "border border-c_primary bg-c_primary-50 text-c_primary-400 [&_path]:stroke-c_primary-700 [&_svg]:stroke-c_primary-700",
        "hover:bg-c_primary-50/50 hover:border-c_primary-400",
        "active:bg-c_primary-50/50 active:border-c_primary-700 active:text-c_primary-700",
        "[&>span.icon-box_path]:stroke-c_primary-700 [&>span.icon-box_svg]:stroke-c_primary-700",
        commonDisabledStyles,
    ];

    const secondaryVariantStyles = [
        "border border-c_neutral-300 rounded-md text-c_neutral-800 [&_path]:stroke-c_neutral-800 [&_svg]:stroke-c_neutral-800",
        "hover:border-c_neutral-500",
        "active:border-c_neutral-700",
        "[&>span.icon-box_path]:stroke-c_neutral-800 [&>span.icon-box_svg]:stroke-c_neutral-800",
        commonDisabledStyles,
    ];

    const iconButtonStyles = [
        "flex items-center justify-center",
        size === "lg" && "p-2 h-12 w-12 [&_svg]:w-6 [&_svg]:h-6",
        size === "md" && "p-[10px] h-10 w-10 [&_svg]:w-5 [&_svg]:h-5",
        size === "sm" && "p-2 h-8 w-8 [&_svg]:w-4 [&_svg]:h-4",
        size === "xs" && "p-[6px] h-6 w-6 [&_svg]:w-3 [&_svg]:h-3",
    ];

    const textButtonVariantStyles = ["border-0", "text-c_neutral-400"];

    return (
        <button
            className={twMerge([
                "transition-all group flex items-center justify-center gap-2 duration-300 font-medium",
                "[&>span.icon-box_path]:stroke-white [&>span.icon-box_svg]:stroke-white",
                size === "lg" && lgSizeStyles,
                size === "md" && mdSizeStyles,
                size === "sm" && smSizeStyles,
                size === "xs" && xsSizeStyles,
                variant === "primary" && primaryVariantStyles,
                variant === "soft-color" && softColorVariantStyles,
                variant === "secondary" && secondaryVariantStyles,
                variant === "text-button" && textButtonVariantStyles,
                iconButton && iconButtonStyles,
                className,
            ])}
            {...computedProps}
        >
            {pending ? (
                <Loader size={loaderSize[size]} />
            ) : (
                <>
                    {startIcon && (
                        <span className="icon-box  group-disabled:[&_path]:stroke-c_neutral-400 group-disabled:[&>svg]:stroke-c_neutral-400">
                            {startIcon}
                        </span>
                    )}
                    {children}
                    {endIcon && <span className="icon-box">{endIcon}</span>}
                </>
            )}
        </button>
    );
};

export default ZButton;
