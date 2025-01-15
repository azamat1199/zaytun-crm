import React, { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

interface ZFormLabelProps extends ComponentPropsWithoutRef<"label"> {
    disabled?: boolean;
}

/**
 * ZFormLabel is a customizable form label component.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <ZFormLabel>Label Text</ZFormLabel>
 *
 * // With custom class name
 * <ZFormLabel className="custom-class">Label Text</ZFormLabel>
 *
 * @param {Object} props - The props for ZFormLabel component.
 * @param {React.ReactNode} props.children - The content of the label.
 * @param {string} [props.className] - Additional class name for the label element.
 * @returns {JSX.Element} - Rendered ZFormLabel component.
 */

const ZFormLabel: FC<ZFormLabelProps> = (props) => {
    const { children, className, ...computedProps } = props;
    return (
        <label
            {...computedProps}
            className={twMerge([
                "text-b-2-m text-c_neutral-800 font-medium",
                // disabled && 'text-c_neutral-300',
                className,
            ])}
        >
            {children}
        </label>
    );
};

export default ZFormLabel;
