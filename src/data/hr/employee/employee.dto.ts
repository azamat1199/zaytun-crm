import { EmployeeModel } from ".";

export const prepareEmployeeForList = (employee: EmployeeModel) => ({
    fio: {
        name: `${employee.firstName || ""} ${employee.lastName || ""}`,
        jobTitle: "",
    },
    internalNumber: "",
    email: "",
    status: "",
});

export type EmployeeListRowType = ReturnType<typeof prepareEmployeeForList>;
