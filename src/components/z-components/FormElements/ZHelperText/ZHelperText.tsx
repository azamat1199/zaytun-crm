import React, { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

interface ZHelperTextProps
    extends Omit<ComponentPropsWithoutRef<"p">, "className"> {
    className?: string;
    variant?: "error" | "helper";
}

/**
 * ZHelperText is a customizable helper text component.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <ZHelperText>Helper Text</ZHelperText>
 *
 * // With custom class name and error variant
 * <ZHelperText className="custom-class" variant="error">Error Text</ZHelperText>
 *
 * @param {Object} props - The props for ZHelperText component.
 * @param {React.ReactNode} props.children - The content of the helper text.
 * @param {string} [props.className] - Additional class name for the helper text element.
 * @param {('error' | 'helper')} [props.variant='helper'] - The variant of the helper text (error or helper).
 * @returns {JSX.Element} - Rendered ZHelperText component.
 */

const ZHelperText: FC<ZHelperTextProps> = (props) => {
    const { className, children, variant = "helper", ...computedProps } = props;

    return (
        <p
            {...computedProps}
            className={twMerge([
                "text-b-2-r text-c_neutral-500",
                variant === "error" && "text-c_error-500",
                className,
            ])}
        >
            {children}
        </p>
    );
};

export default ZHelperText;
