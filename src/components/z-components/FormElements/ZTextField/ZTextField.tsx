import get from "lodash.get";
import { ComponentPropsWithoutRef, FC, forwardRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import ZFormLabel from "../ZFormLabel";
import ZHelperText from "../ZHelperText";
import Skeleton from "react-loading-skeleton";

export interface ZTextFieldProps
    extends Omit<ComponentPropsWithoutRef<"input">, "className"> {
    rootClassName?: string;
    formInputSize?: "lg" | "md";
    className?: string;
    fullWidth?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    hasError?: boolean;
    helperText?: any;
    label?: ReactNode;
    errors?: any;
    rightElement?: ReactNode;
    startIconProps?: ComponentPropsWithoutRef<"div">;
    endIconProps?: ComponentPropsWithoutRef<"div">;
    loading?: boolean;
}

type FormInputRef = React.ComponentPropsWithRef<"input">["ref"];

/**
 * ZTextField is a customizable text input field component.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <ZTextField />
 *
 * // With label, helper text, and custom icons
 * <ZTextField
 *    label="Name"
 *    helperText="Please enter your name"
 *    startIcon={<Icon />}
 *    endIcon={<Icon />}
 * />
 *
 * @param {Object} props - The props for ZTextField component.
 * @param {string|string[]} [props.rootClassName] - Additional class name(s) for the root element.
 * @param {('lg' | 'md')} [props.formInputSize='lg'] - The size of the input field.
 * @param {string|string[]} [props.className] - Additional class name(s) for the input element.
 * @param {boolean} [props.fullWidth] - Whether the input field should take full width.
 * @param {ReactNode} [props.startIcon] - Icon displayed at the start of the input field.
 * @param {ReactNode} [props.endIcon] - Icon displayed at the end of the input field.
 * @param {boolean} [props.hasError] - Indicates whether there's an error with the input.
 * @param {ReactNode} [props.helperText] - Helper text to provide additional information.
 * @param {ReactNode} [props.label] - Label for the input field.
 * @param {ReactNode} [props.rightElement] - element is rendered right side of the TextField
 * @param {Object} [props.startIconProps] - props for start icon container
 * @param {Object} [props.endIconProps] - props for end icon container
 * @param {boolean} [props.loading=false] - Whether indicate skeleton instead of TextField
 * @returns {JSX.Element} - Rendered ZTextField component.
 */

const ZTextField: FC<ZTextFieldProps> = forwardRef(
    (props, ref: FormInputRef) => {
        const {
            rootClassName,
            className = [],
            formInputSize = "lg",
            fullWidth,
            startIcon,
            endIcon,
            label,
            errors = {},
            rightElement,
            startIconProps,
            endIconProps,
            loading = false,
            ...computedProps
        } = props;

        const helperText =
            props.helperText || get(errors, `${props.name}.message`);
        const hasError =
            props.hasError || (props.name && Object.hasOwn(errors, props.name));

        return (
            <div
                className={twMerge([fullWidth && "w-full", rootClassName])}
                id={props.name || ""}
                role="group"
            >
                {label && (
                    <ZFormLabel
                        disabled={props.disabled}
                        className="mb-[6px] text-b-2-m"
                    >
                        {label}
                    </ZFormLabel>
                )}
                <div
                    className={twMerge([
                        "relative flex items-center",
                        loading && "[&>span]:w-full",
                    ])}
                >
                    {!loading ? (
                        <>
                            {startIcon && (
                                <div
                                    role="presentation"
                                    {...startIconProps}
                                    className={twMerge(
                                        "absolute left-2.5 top-2/4 -translate-y-2/4",
                                        startIconProps?.className,
                                    )}
                                >
                                    {startIcon}
                                </div>
                            )}
                            {endIcon && (
                                <div
                                    role="presentation"
                                    {...endIconProps}
                                    className={twMerge(
                                        "absolute right-2.5 top-2/4 -translate-y-2/4",
                                        endIconProps?.className,
                                    )}
                                >
                                    {endIcon}
                                </div>
                            )}
                            <input
                                ref={ref}
                                {...computedProps}
                                className={twMerge([
                                    formInputSize === "lg" && "h-12",
                                    formInputSize === "md" && "h-10",
                                    //   DEFAULT
                                    "bg-white w-full focus:outline-none focus:ring-0 transition-all duration-200 ease-in-out appearance-none outline-none rounded-md border border-c_neutral-300 px-[10px] py-4 text-b-1-r text-c_neutral-800",
                                    // DEFAULT PLACEHOLDER
                                    "placeholder:text-b-1-r  placeholder:font-normal placeholder:text-c_neutral-500",
                                    // FOCUS
                                    "focus:border-c_primary-500",
                                    // DISABLED
                                    "disabled:border-c_neutral-200 disabled:bg-c_neutral-25 disabled:cursor-not-allowed disabled:text-c_neutral-400",
                                    // READONLY
                                    "[&[readonly]]:border-c_neutral-200 [&[readonly]]:bg-c_neutral-25 [&[readonly]]:text-c_neutral-400",
                                    startIcon && "pl-10",
                                    hasError && "border-c_error-400",
                                    className,
                                ])}
                            />
                            {rightElement && rightElement}
                        </>
                    ) : (
                        <Skeleton
                            width="100%"
                            className={twMerge([
                                formInputSize === "lg" && "h-12",
                                formInputSize === "md" && "h-10",
                            ])}
                        />
                    )}
                </div>
                {helperText && (
                    <ZHelperText
                        className="mt-[6px]"
                        {...(hasError && { variant: "error" })}
                    >
                        {helperText}
                    </ZHelperText>
                )}
            </div>
        );
    },
);

ZTextField.displayName = "ZTextField";

export default ZTextField;
