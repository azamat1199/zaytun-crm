import { FC, ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import ZFormLabel from "../ZFormLabel";
import ZHelperText from "../ZHelperText";

export interface ZRadioButtonProps
    extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
    size?: "lg" | "sm";
    rootClassName?: string;
    hasError?: boolean;
    helperText?: string;
    label?: ReactNode;
}

/**
 * ZRadioInput is a customizable radio input component.
 *
 * @component
 * @example
 * // Basic usage with label
 * <ZRadioInput label="Option 1" />
 *
 * // With helper text and custom size
 * <ZRadioInput label="Option 2" helperText="Please select an option" size="sm" />
 *
 * // With error indication
 * <ZRadioInput label="Option 3" hasError={true} />
 *
 * @param {Object} props - The props for ZRadioInput component.
 * @param {('lg' | 'sm')} [props.size='lg'] - The size of the radio button.
 * @param {string} [props.rootClassName] - Additional class name for the root element.
 * @param {boolean} [props.hasError] - Indicates whether there's an error with the input.
 * @param {string|React.ReactNode} [props.label] - Label for the radio button.
 * @param {string} [props.helperText] - Helper text to provide additional information.
 * @returns {JSX.Element} - Rendered ZRadioInput component.
 */

const ZRadioInput: FC<ZRadioButtonProps> = (props) => {
    const {
        size = "lg",
        className,
        label,
        hasError,
        helperText,
        rootClassName,
        ...computedProps
    } = props;

    return (
        <div
            className={twMerge(
                "flex flex-row items-start",
                (helperText || label) && "gap-2",
                rootClassName,
            )}
        >
            <input
                type="radio"
                className={twMerge(
                    "rounded-full appearance-none border border-c_neutral-300 outline-none text-c_primary-500 transition-all duration-200 ease-in-out",
                    //   FOCUS
                    "focus:ring-1 focus:ring-c_primary",
                    // DISABLED
                    "disabled:pointer-events-none disable:text-c_neutral-25 disabled:ring-1 disabled:ring-c_neutral-200 disabled:border disabled:border-c_neutral-200 disabled:checked:text-c_neutral-500 disabled:checked:bg-c_neutral-200",
                    // CHECKED
                    "checked:text-c_primary-500",
                    // UNCHECKED
                    "&:not(:checked):bg-white",
                    // ERROR
                    hasError && "enabled:text-c_error-400",
                    size === "lg" && "w-5 h-5",
                    size === "sm" && "w-4 h-4",
                    className,
                )}
                {...computedProps}
            />

            {(helperText || label) && (
                <div>
                    {label && (
                        <ZFormLabel disabled={props.disabled}>
                            {label}
                        </ZFormLabel>
                    )}
                    {helperText && <ZHelperText>{helperText}</ZHelperText>}
                </div>
            )}
        </div>
    );
};

export default ZRadioInput;
