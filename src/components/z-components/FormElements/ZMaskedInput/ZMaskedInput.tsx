import { ChangeEvent, ComponentProps, FC } from "react";
import InputMask, { Props } from "react-input-mask";
import ZTextField from "@/components/z-components/FormElements/ZTextField";

export interface ZMaskedInputProps extends Omit<Props, "autoCapitalize"> {
    inputProps: ComponentProps<typeof ZTextField>;
    autoCapitalize?: boolean;
}

/**
 * A custom pattern format component that wraps around PatternFormat, allowing customization of input using ZTextField.
 * @param {Object} props - The props for ZMaskedInput component
 * @param {Object} [props.inputProps] - The props for the ZTextField component.
 * @returns {JSX.Element} - The JSX representation of the ZMaskedInput component.
 */

const ZMaskedInput: FC<ZMaskedInputProps> = (props) => {
    const {
        inputProps,
        autoCapitalize = false,
        onChange,
        ...computedProps
    } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (autoCapitalize) {
            e.target.value = e.target.value.toUpperCase();
        }

        onChange && onChange(e);
    };

    return (
        <InputMask
            {...computedProps}
            onChange={handleChange}
            //   onPaste={handlePaste}
        >
            {(textFieldProps) => (
                <ZTextField {...inputProps} {...textFieldProps} />
            )}
        </InputMask>
    );
};

export default ZMaskedInput;
