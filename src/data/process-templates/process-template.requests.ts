import { frontOfficeRequest } from "@/services/requests/basRequests";

export const getProcessTemplateById = (id: string) =>
    frontOfficeRequest.get(`/process-templates/${id}`);

export const getProcessTemplates = (params: { page: number; size: number }) =>
    frontOfficeRequest.get("/process-templates", { params });

export const updateProcessTemplate = (body: any) =>
    frontOfficeRequest.patch(`/process-templates/${body.id}`, body);
