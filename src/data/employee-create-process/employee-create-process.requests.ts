import { frontOfficeRequest } from "@/services/requests/basRequests";

export const acceptEmployeeData = (dto: {
    taskId: string;
    accepted: boolean;
    rejectReason: string;
}) =>
    frontOfficeRequest.patch(
        "/employee-create-process/accept-employee-data",
        dto,
    );
