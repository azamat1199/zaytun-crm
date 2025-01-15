export const prepareEmploymentDto = (values: Record<string, any>) => ({
    ...values,
    roles: values.roles.map((role) => ({ id: role.value })),
    department: {
        id: values.departmentId,
    },
    position: {
        id: values.position?.value,
    },
    sortOrder: values.sortOrder,
    ...(values.id && { id: values.id }),
});
