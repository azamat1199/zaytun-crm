import { Meta, StoryFn } from "@storybook/react";
import ZPatternFormat, { ZPatternFormatProps } from "./ZPatternFormat";

const meta: Meta<typeof ZPatternFormat> = {
    title: "components/z-components/form-elements/ZPatternFormat",
    component: ZPatternFormat,
};

export default meta;

const Template: StoryFn<ZPatternFormatProps> = ({ inputProps, ...rest }) => {
    return (
        <ZPatternFormat
            inputProps={{ ...inputProps, rootClassName: "w-[400px]" }}
            {...rest}
        />
    );
};

export const PassportNumber = Template.bind({});
PassportNumber.args = {
    format: "#######",
    inputProps: {
        label: "Passport number",
        onChange: () => {},
        placeholder: "Passport number",
        value: "",
    },
    allowEmptyFormatting: true,
};

export const TinNumber = Template.bind({});
TinNumber.args = {
    format: "#########",
    inputProps: {
        label: "Tin number",
        onChange: () => {},
        placeholder: "Tin number",
        value: "",
    },
    allowEmptyFormatting: true,
};
export const CardNumber = Template.bind({});
CardNumber.args = {
    format: "#### #### #### ####",
    inputProps: {
        label: "Card number",
        onChange: () => {},
        placeholder: "Card number",
    },
    allowEmptyFormatting: true,
};
