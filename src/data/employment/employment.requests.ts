import { hrRequest } from "@/services/requests/basRequests";
import { PaginationParamsType } from "../data.types";
import { CreateEmploymentDto, EmploymentModel } from ".";

export const getEmploymentsByDepartmentId = ({
    departmentId,
    ...rest
}: PaginationParamsType & { departmentId: string }) =>
    hrRequest.get(`/employments/department/${departmentId}`, { params: rest });

export const createEmployment = (body: CreateEmploymentDto) =>
    hrRequest.post("/employments", body);

export const updateEmployment = (
    body: Partial<CreateEmploymentDto> & { id: string },
) => hrRequest.put(`/employments/${body.id}`, body);

export const deleteEmployment = (id: EmploymentModel["id"]) =>
    hrRequest.delete(`/employments/${id}`);
