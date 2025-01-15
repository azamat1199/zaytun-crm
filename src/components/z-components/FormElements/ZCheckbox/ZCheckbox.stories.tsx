import { Meta } from "@storybook/react";

import ZCheckbox from "./ZCheckbox";

const meta: Meta<typeof ZCheckbox> = {
    title: "components/z-components/form-elements/ZCheckbox",
    component: ZCheckbox,
};

export default meta;

export const Template: any = () => {
    return <ZCheckbox hasError helperText="This is a helper text" checked />;
};

export const Checkbox = Template.bind({});
