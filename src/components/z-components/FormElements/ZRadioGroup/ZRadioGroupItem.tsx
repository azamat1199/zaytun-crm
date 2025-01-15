import React, {
    ComponentProps,
    ComponentPropsWithoutRef,
    FC,
    ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import ZRadioInput from "../ZRadioInput";
import ZFormLabel from "../ZFormLabel";
import ZTruncatedText from "../../ZTruncatedText";

export interface ZRadioGroupItemProps
    extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
    label?: ReactNode;
    inputProps?: ComponentProps<typeof ZRadioInput>;
    labelProps?: ComponentProps<typeof ZFormLabel>;
    value: string;
    currentValue?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    checked?: boolean;
    truncated?: boolean;
}

/**
 * ZRadioGroupItem component represents an individual radio button in a radio group.
 *
 * @param {ZRadioGroupItemProps} props - Props for configuring the radio group item.
 * @param {JSX.Element} [props.label] - Label for the radio button.
 * @param {ComponentProps<typeof ZRadioInput>} [props.inputProps] - Props for configuring the radio input element.
 * @param {ComponentProps<typeof ZFormLabel>} [props.labelProps] - Props for configuring the label element.
 * @param {string} props.value - Value of the radio button.
 * @param {string} [props.currentValue] - Value of the currently selected radio button in the group.
 * @param {boolean} [props.fullWidth] - Whether the radio button should take up the full width of its container.
 * @param {boolean} [props.disabled] - Whether the radio button is disabled.
 * @param {boolean} [props.checked] - Whether the radio button is checked.
 * @param {boolean} [props.truncated=false] - Whether the label is truncated
 * @param {ComponentPropsWithoutRef<'div'>} [props.className] - Additional class names for styling purposes.
 *
 * @returns {React.ReactElement} The rendered radio group item component.
 */

const ZRadioGroupItem: FC<ZRadioGroupItemProps> = (props) => {
    const {
        className,
        label,
        inputProps,
        labelProps,
        value,
        currentValue,
        fullWidth,
        disabled,
        truncated,
        ...computedProps
    } = props;

    const checked = computedProps?.checked || currentValue === value;

    return (
        <div
            {...computedProps}
            data-value={value}
            className={twMerge(
                "min-w-[200px]",
                fullWidth && "w-full",
                "radio-group-item rounded-lg transition-all duration-300 ease-in flex group items-center gap-2 p-4 border border-c_neutral-300 bg-white",
                checked && "border-c_primary",
                disabled && "border-c_neutral-200",
                className,
                !disabled && "hover:cursor-pointer",
            )}
        >
            <ZRadioInput
                {...inputProps}
                checked={checked}
                disabled={disabled}
                className={`group-hover:enabled:ring-1 group-hover:enabled:ring-c_primary`}
            />
            <ZFormLabel
                className={`${disabled && "text-c_neutral-400"} text-b-1-m`}
                {...labelProps}
            >
                {!truncated ? label : <ZTruncatedText>{label}</ZTruncatedText>}
            </ZFormLabel>
        </div>
    );
};

export default ZRadioGroupItem;
