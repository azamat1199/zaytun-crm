import { hrRequest } from "@/services/requests/basRequests";
import { CreateBranchDto, CreateStructureDto } from ".";
import { PaginationParamsType } from "../data.types";

export const getStructuresInitialList = () => hrRequest.get("/structures");

export const createStructure = async (body: CreateStructureDto) =>
    hrRequest.post("/structures", body);

export const updateStructure = ({
    id,
    body,
}: {
    id: string;
    body: Partial<CreateStructureDto>;
}) => hrRequest.put(`/structures/${id}`, body);

export const deleteStructure = (id: string) =>
    hrRequest.delete(`/structures/${id}`);

export const createBranch = (body: CreateBranchDto) =>
    hrRequest.post("/branches", body);

export const deleteBranch = (id: string) => hrRequest.delete(`/branches/${id}`);

export const updateBranch = ({
    id,
    body,
}: {
    id: string;
    body: Partial<CreateBranchDto> & { id: string };
}) => hrRequest.put(`/branches/${id}`, body);

export const getBranchesByStructureId = ({
    structureId,
    ...rest
}: PaginationParamsType & { structureId: string }) =>
    hrRequest.get(`/branches/structure/${structureId}`, { params: rest });

export const getBranchesByParentId = ({
    parentId,
    ...rest
}: PaginationParamsType & { parentId: string }) =>
    hrRequest.get(`/branches/parent/${parentId}`, { params: rest });
