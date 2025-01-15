import { hrRequest } from "@/services/requests/basRequests";

export const getDepartmentsByBranchId = (branchId: string) =>
    hrRequest.get(`/departments/branch/${branchId}`);

export const getDepartments = (params?: any) =>
    hrRequest.get("/departments", { params });

export const getDepartmentsByParentId = (parentId: string) =>
    hrRequest.get(`/departments/parent/${parentId}`);

export const createDepartment = (body: any) =>
    hrRequest.post("/departments", body);

export const deleteDepartment = (id: string) =>
    hrRequest.delete(`/departments/${id}`);

export const updateDepartment = ({ id, body }: { id: string; body: any }) =>
    hrRequest.put(`/departments/${id}`, body);
