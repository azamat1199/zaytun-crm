import { frontOfficeRequest } from "@/services/requests/basRequests";
import { CreateRoleDto } from ".";

export const getAddRoles = async () => {
    return frontOfficeRequest.get("/roles/add-form");
};

export const getEditRoles = async (id: string) => {
    return frontOfficeRequest.get(`/roles/for-edit/${id}`);
};

export const createRole = (body: CreateRoleDto) =>
    frontOfficeRequest.post("/roles", body);

export const editRole = (body: any) =>
    frontOfficeRequest.put(`/roles/${body.id}`, body);

export const deleteRole = (id: string) =>
    frontOfficeRequest.delete(`/roles/${id}`);
