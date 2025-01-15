import { Meta, StoryFn } from "@storybook/react";

import ZRadioGroupItem, { ZRadioGroupItemProps } from "./ZRadioGroupItem";

const meta: Meta<typeof ZRadioGroupItem> = {
    title: "components/z-components/form-elements/ZRadioGroup/ZRadioGroupItem",
    component: ZRadioGroupItem,
};

export default meta;

const Template: StoryFn<ZRadioGroupItemProps> = (props) => (
    <ZRadioGroupItem className="w-[400px]" label="This is a label" {...props} />
);

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
};

export const WithLongLabel = Template.bind({});

WithLongLabel.args = {
    label: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled i`,
};

export const WithTruncated = Template.bind({});

WithTruncated.args = {
    label: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled i`,
    truncated: true,
};
