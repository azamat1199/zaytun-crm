import { hrRequest } from "@/services/requests/basRequests";

export const getEmployeeDetailById = (id: string) =>
    hrRequest.get(`/employees/${id}`);
