import { hrRequest } from "@/services/requests/basRequests";
import { CreateDepartmentTemplateDto } from "./dtos/create.department-template.dto";
import { PaginationParamsType } from "../data.types";

export const createDepartmentTemplate = (body: CreateDepartmentTemplateDto) =>
    hrRequest.post("/department-templates", body);

export const getDepartmentTemplates = (params: PaginationParamsType) =>
    hrRequest.get("/department-templates", { params });
