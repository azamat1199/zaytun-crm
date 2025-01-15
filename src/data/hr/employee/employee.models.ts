export interface EmployeeModel {
    id: string;
    userId: string;
    username: string;
    firstNameLat: string;
    lastNameLat: string;
    middleNameLat: string;
    createdAt: string;
    updatedAt: string;
    pinfl: string | null;
    employment: {
        id: string;
    };
    avatarUrl: string;
    internalPhoneNumber: string | null;
    birthDate: string | null;
}

export interface EmployeeRotationDTO {
    id: string;
    employee: {
        id: string;
        actualProcessId: string;
        level: string;
        employment: {
            id: string;
        };
        department: {
            id: string;
        };
        sortOrder: number;
        branch: {
            id: string | number;
        };
    };
    newEmployment: {
        id: string;
        department: {
            id: string;
        };
        branch: {
            id: string;
            code: string;
        };
        position: {
            id: string;
            code: string;
        };
    };
    level: number | string;
    newSalary: number;
    newTotalAmount: number;
    salarySupplement: number;
}
