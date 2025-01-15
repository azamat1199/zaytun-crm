import { frontOfficeRequest } from "@/services/requests/basRequests";

export const getTasks = (params: {
    page: number;
    size: number;
    search?: string;
}) =>
    frontOfficeRequest.get("/tasks", {
        params: { ...params, sort: "createdAt,desc" },
    });

export const getTaskDetailById = (id: string) =>
    frontOfficeRequest.get(`/tasks/${id}`);
