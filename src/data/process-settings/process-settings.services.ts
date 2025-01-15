import { ProcessSettingsCreateDto } from ".";

export const prepareProcessSettingsDto = (
    values: any,
): ProcessSettingsCreateDto => ({
    ...values,
    role: {
        id: values?.role?.value,
    },
});
