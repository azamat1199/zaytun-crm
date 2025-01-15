import { Meta, StoryFn } from "@storybook/react";

import ZTextarea, { ZTextareaProps } from "./ZTextarea";

const meta: Meta<typeof ZTextarea> = {
    title: "components/z-components/form-elements/ZTextarea",
    component: ZTextarea,
};

export default meta;

const Template: StoryFn<ZTextareaProps> = (props) => {
    return <ZTextarea {...props} rootClassName="w-[400px]" />;
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
    placeholder: "This is a placeholder",
};

export const WithLabel = Template.bind({});
WithLabel.args = {
    label: "This is a label",
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
    helperText: "This is a helper text",
};

export const Error = Template.bind({});
Error.args = {
    helperText: "Error text",
    hasError: true,
    label: "This is a label",
    placeholder: "This is a placeholder",
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    placeholder: "This is a placeholder",
    label: "This is a label",
};
