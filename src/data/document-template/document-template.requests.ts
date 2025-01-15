import { frontOfficeRequest } from "@/services/requests/basRequests";


export const getDocumentTemplateById = (id: string) =>
    frontOfficeRequest.get(`/document-templates/${id}`);

export const getDocumentTemplateOptions = () =>
    frontOfficeRequest.get("/document-templates/options");
