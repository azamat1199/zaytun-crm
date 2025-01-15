import { Meta, StoryFn } from "@storybook/react";
import ZNumericFormat, { ZNumericFormatProps } from "./ZNumericFormat";

const meta: Meta<typeof ZNumericFormat> = {
    title: "components/z-components/form-elements/ZNumericFormat",
    component: ZNumericFormat,
};

export default meta;

const Template: StoryFn<ZNumericFormatProps> = ({ inputProps, ...rest }) => {
    return (
        <ZNumericFormat
            inputProps={{ ...inputProps, rootClassName: "w-[400px]" }}
            {...rest}
        />
    );
};

export const MoneyFormat = Template.bind({});
MoneyFormat.args = {
    inputProps: { label: "UZS", startIcon: "UZS" },
};

export const PercentageFormat = Template.bind({});
PercentageFormat.args = {
    inputProps: { endIcon: "%" },
    thousandSeparator: false,
    decimalSeparator: ".",
    fixedDecimalScale: false,
    decimalScale: 3,
    allowedDecimalSeparators: [",", "."],
};
