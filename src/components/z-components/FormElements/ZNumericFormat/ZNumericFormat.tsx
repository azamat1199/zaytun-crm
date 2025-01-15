import { ComponentProps, FC } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import ZTextField from "@/components/z-components/FormElements/ZTextField";

export interface ZNumericFormatProps extends NumericFormatProps {
    inputProps?: ComponentProps<typeof ZTextField>;
}

/**
 * A custom pattern format component that wraps around PatternFormat, allowing customization of input using ZTextField.
 * @param {Object} props - The props for ZNumericFormat component
 * @param {Object} [props.inputProps] - The props for the ZTextField component.
 * @returns {JSX.Element} - The JSX representation of the ZNumericFormat component.
 */

const ZNumericFormat: FC<ZNumericFormatProps> = ({ inputProps, ...props }) => {
    return (
        // @ts-expect-error TODO
        <NumericFormat
            customInput={ZTextField}
            className={
                inputProps?.startIcon
                    ? "pl-12"
                    : inputProps?.endIcon
                      ? "pr-12"
                      : ""
            }
            allowNegative={false}
            thousandSeparator=" "
            startIconProps={{
                className:
                    "w-12 h-full left-0 flex items-center justify-center",
            }}
            endIconProps={{
                className:
                    "w-12 h-full right-0 flex items-center justify-center",
            }}
            {...inputProps}
            {...props}
        />
    );
};

export default ZNumericFormat;
