import { Meta, StoryFn } from "@storybook/react";
import ZMaskedInput, { ZMaskedInputProps } from "./ZMaskedInput";

const meta: Meta<typeof ZMaskedInput> = {
    title: "components/z-components/form-elements/ZMaskedInput",
    component: ZMaskedInput,
};

export default meta;

const Template: StoryFn<ZMaskedInputProps> = ({ inputProps, ...rest }) => {
    return (
        <ZMaskedInput
            inputProps={{ ...inputProps, rootClassName: "w-[400px]" }}
            {...rest}
        />
    );
};

export const PassportSerial = Template.bind({});
PassportSerial.args = {
    inputProps: { label: "Passport Serial" },
    mask: "AB",
    formatChars: {
        A: "[A-Z,a-z]",
        B: "[A-Z,a-z]",
    },
    autoCapitalize: true,
};
