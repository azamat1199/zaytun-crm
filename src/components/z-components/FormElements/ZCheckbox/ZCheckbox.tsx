import {
    useEffect,
    useRef,
    ComponentPropsWithoutRef,
    FC,
    ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import ZFormLabel from "../ZFormLabel";
import ZHelperText from "../ZHelperText";

export interface ZCheckboxProps
    extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
    indeterminate?: boolean;
    rootClassName?: string;
    size?: "lg" | "sm";
    hasError?: boolean;
    helperText?: string;
    label?: ReactNode;
}

/**
 * ZCheckbox is a customizable checkbox component.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <ZCheckbox />
 *
 * // With label and custom size
 * <ZCheckbox label="Option 1" size="sm" />
 *
 * @param {Object} props - The props for ZCheckbox component.
 * @param {string} [props.className] - Additional class name for the checkbox element.
 * @param {string} [props.label] - Label for the checkbox.
 * @param {boolean} [props.indeterminate=false] - Indicates whether the checkbox should be in indeterminate state.
 * @param {string} [props.rootClassName] - Additional class name for the root element.
 * @param {('lg' | 'sm')} [props.size='lg'] - The size of the checkbox.
 * @returns {JSX.Element} - Rendered ZCheckbox component.
 */

const ZCheckbox: FC<ZCheckboxProps> = ({
    className,
    label,
    indeterminate = false,
    rootClassName,
    size = "lg",
    helperText,
    ...props
}) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        ref.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
        <div className={twMerge(rootClassName)}>
            <input
                ref={ref}
                type="checkbox"
                className={twMerge([
                    // DEFAULT
                    size === "lg" && "w-5 h-5",
                    size === "sm" && "w-4 h-4",
                    "cursor-pointer rounded border border-c_neutral-300 accent-c_primary-500 transition-all duration-200 ease-in-out",
                    // // HOVER
                    "enabled:hover:border-c_primary-500  enabled:checked:hover:bg-c_primary-500",
                    // FOCUS
                    "focus:ring-primary focus:ring-opacity-20",
                    // DISABLED
                    "disabled:pointer-events-none disabled:border disabled:border-c_neutral-200 disabled:checked:text-c_neutral-500 disabled:checked:bg-c_neutral-200  disabled:indeterminate:text-c_neutral-25",
                    // CHECKED
                    "checked:text-c_primary-500 indeterminate:bg-c_primary-500",
                    // UNCHECKED
                    "&:not(:checked):bg-white",
                    // hover:[&:not(:checked)]:border-bg-brand
                    // INDETERMINATE
                    "enabled:indeterminate:hover:bg-c_primary-500",
                    className,
                ])}
                {...props}
            />
            {(helperText || label) && (
                <div>
                    {label && (
                        <ZFormLabel htmlFor={props.name} disabled={props.disabled}>
                            {label}
                        </ZFormLabel>
                    )}
                    {helperText && <ZHelperText>{helperText}</ZHelperText>}
                </div>
            )}
        </div>
    );
};

export default ZCheckbox;
