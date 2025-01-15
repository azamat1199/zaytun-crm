export const changePositionSerializer = (values, id, processId, employment) => {
    const body = {
        employee: employment,
        newEmployment: {
            id: values?.position?.value,
        },
        level: String(values?.level),
        newSalary: Number(values?.newSalary),
        newTotalAmount: Number(values?.newTotalAmount),
        salarySupplement: Number(values?.salarySupplement),
        documents: [
            {
                attachment: values?.photo,
                entityType: "ROTATION",
                documentType: "REASON",
            },
        ],
    };
    const params = processId;
    return { params, body };
};
