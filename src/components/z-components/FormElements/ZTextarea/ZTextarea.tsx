import { ComponentPropsWithoutRef, forwardRef, FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import ZHelperText from "../ZHelperText";
import ZFormLabel from "../ZFormLabel";
import get from "lodash.get";

export interface ZTextareaProps extends ComponentPropsWithoutRef<"textarea"> {
    rootClassName?: string;
    fullWidth?: boolean;
    hasError?: boolean;
    helperText?: ReactNode;
    label?: ReactNode;
    errors?: Record<string, any>;
}

type FormInputRef = React.ComponentPropsWithRef<"textarea">["ref"];

/**
 * ZTextarea is a customizable textarea component.
 *
 * @component
 *
 * @example
 * <ZTextarea />
 *
 * // With label, helper text, and custom end icon
 * <ZTextarea
 *    label="Description"
 *    helperText="Please enter your description"
 *    endIcon={<Icon />}
 * />
 *
 * @param {Object} props - The props for ZTextarea component.
 * @param {string} [props.rootClassName] - Additional class name for the root element.
 * @param {boolean} [props.fullWidth] - Whether the textarea should take full width.
 * @param {ReactNode} [props.endIcon] - Icon displayed at the end of the textarea.
 * @param {boolean} [props.hasError] - Indicates whether there's an error with the input.
 * @param {ReactNode} [props.helperText] - Helper text to provide additional information.
 * @param {ReactNode} [props.label] - Label for the textarea.
 * @returns {JSX.Element} - Rendered ZTextarea component.
 */

const ZTextarea: FC<ZTextareaProps> = forwardRef((props, ref: FormInputRef) => {
    const {
        rootClassName,
        className,
        fullWidth,
        errors = {},
        label,

        ...computedProps
    } = props;

    const helperText = props.helperText || get(errors, `${props.name}.message`);
    const hasError =
        props.hasError || (props.name && Object.hasOwn(errors, props.name));

    return (
        <div className={twMerge([fullWidth && "w-full", rootClassName])}>
            {label && (
                <ZFormLabel disabled={props.disabled} className="mb-[6px]">
                    {label}
                </ZFormLabel>
            )}
            <div className="relative">
                <textarea
                    ref={ref}
                    {...computedProps}
                    className={twMerge([
                        //   DEFAULT
                        "bg-white h-[128px] resize-none w-full focus:outline-none focus:ring-0 transition-all duration-200 ease-in-out appearance-none outline-none rounded-md border border-c_neutral-300 pl-[10px] pr-[14px] py-[10px] text-b-1-r text-c_neutral-800",
                        // DEFAULT PLACEHOLDER
                        "placeholder:text-b-1-r  placeholder:font-normal placeholder:text-c_neutral-500",
                        // FOCUS
                        "focus:border-c_primary-500",
                        // DISABLED
                        "disabled:border-c_neutral-200 disabled:bg-c_neutral-25 disabled:cursor-not-allowed disabled:text-c_neutral-400",
                        // READONLY
                        "[&[readonly]]:border-c_neutral-200 [&[readonly]]:bg-c_neutral-25 [&[readonly]]:text-c_neutral-400",
                        hasError && "border-c_error-400",
                        className,
                    ])}
                />
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
});

ZTextarea.displayName = "ZTextarea";

export default ZTextarea;
