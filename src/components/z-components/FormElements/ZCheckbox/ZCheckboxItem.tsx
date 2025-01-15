import React, {
    ComponentProps,
    ComponentPropsWithoutRef,
    FC,
    ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import ZFormLabel from "../ZFormLabel";
import ZCheckbox from "./ZCheckbox";
import Skeleton from "react-loading-skeleton";

interface ZCheckboxItemProps
    extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
    label?: ReactNode;
    inputProps?: ComponentProps<typeof ZCheckbox>;
    labelProps?: ComponentProps<typeof ZFormLabel>;
    value?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    checked?: boolean;
    onChange?: (name: string, checked: boolean) => void;
    name?: string;
    loading?: boolean;
    size?: "md" | "lg";
}

/**
 * ZCheckboxItem component represents an individual checkbox item.
 *
 * @param {ZCheckboxItemProps} props - Props for configuring the checkbox item.
 * @param {ReactNode} [props.label] - Label for the checkbox item.
 * @param {ComponentProps<typeof ZCheckbox>} [props.inputProps] - Props for configuring the checkbox input element.
 * @param {ComponentProps<typeof ZFormLabel>} [props.labelProps] - Props for configuring the label element.
 * @param {string} [props.value] - Value of the checkbox item.
 * @param {boolean} [props.fullWidth] - Whether the checkbox should take up the full width of its container.
 * @param {boolean} [props.disabled] - Whether the checkbox is disabled.
 * @param {boolean} [props.checked] - Whether the checkbox is checked.
 * @param {(name: string, value: string) => void} [props.onChange] - Event handler for the change event.
 * @param {string} [props.name] - Name of the checkbox item.
 * @param {ComponentPropsWithoutRef<'div'>} [props.className] - Additional class names for styling purposes.
 * @param {boolean} [props.loading=false] - Whether skeleton implemented
 * @param {'md' | 'lg'} [props.size] - size for container
 *
 * @returns {React.ReactElement} The rendered checkbox item component.
 */

const ZCheckboxItem: FC<ZCheckboxItemProps> = (props) => {
    const {
        className,
        label,
        inputProps,
        labelProps,
        value,
        fullWidth,
        disabled,
        checked,
        onChange,
        name,
        loading = false,
        size,
        ...computedProps
    } = props;

    const handleClick = () => {
        if (!onChange) {
            return;
        }

        onChange(name || "", !checked);
    };

    return (
        <div
            {...computedProps}
            onClick={handleClick}
            data-value={value}
            className={twMerge(
                "min-w-[200px]",
                fullWidth && "w-full",
                "radio-group-item rounded-lg transition-all duration-300 ease-in flex group items-center gap-2 p-4 border border-c_neutral-30",
                checked && "border-c_primary",
                disabled && "border-c_neutral-200",
                className,
                !disabled && "hover:cursor-pointer",
                !loading && "bg-white",
                size === "lg" && "h-12",
                size === "md" && "h-10",
            )}
        >
            {!loading ? (
                <ZCheckbox
                    {...inputProps}
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => {
                        e.stopPropagation();
                        onChange && onChange(name || "", !checked);
                    }}
                    className={`group-hover:enabled:ring-1 group-hover:enabled:ring-c_primary`}
                />
            ) : (
                <Skeleton width={20} height={20} />
            )}
            {!loading ? (
                <ZFormLabel disabled={disabled} {...labelProps}>
                    {label}
                </ZFormLabel>
            ) : (
                <Skeleton height={20} containerClassName="flex-1 h-full" />
            )}
        </div>
    );
};

export default ZCheckboxItem;
