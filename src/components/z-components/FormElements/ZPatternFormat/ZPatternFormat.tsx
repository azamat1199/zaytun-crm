import { ComponentProps, FC } from "react";
import { PatternFormat, PatternFormatProps } from "react-number-format";
import ZTextField from "@/components/z-components/FormElements/ZTextField";

export interface ZPatternFormatProps extends PatternFormatProps {
    inputProps?: ComponentProps<typeof ZTextField>;
}

/**
 * A custom pattern format component that wraps around PatternFormat, allowing customization of input using ZTextField.
 * @param {Object} props - The props for ZPatternFormat component
 * @param {Object} [props.inputProps] - The props for the ZTextField component.
 * @returns {JSX.Element} - The JSX representation of the ZPatternFormat component.
 */

const ZPatternFormat: FC<ZPatternFormatProps> = ({ inputProps, ...props }) => {
    return (
        // @ts-expect-error TODO
        <PatternFormat
            customInput={ZTextField}
            className={
                inputProps?.startIcon
                    ? "pl-12"
                    : inputProps?.endIcon
                      ? "pr-12"
                      : ""
            }
            startIconProps={{
                className:
                    "w-12 h-full left-0 flex items-center justify-center",
            }}
            endIconProps={{
                className:
                    "w-12 h-full right-0 flex items-center justify-center",
            }}
            mask="-"
            {...inputProps}
            {...props}
        />
    );
};

export default ZPatternFormat;
