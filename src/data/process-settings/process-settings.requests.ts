import { frontOfficeRequest } from "@/services/requests/basRequests";
import { ProcessSettingsCreateDto } from ".";
import { ProcessSettingsUpdateDto } from "./dtos/process-settings-update.dto";

export const getProcessSettings = (params: { page: number; size: number }) =>
    frontOfficeRequest.get("/process-settings", { params });

export const createProcessSettings = (body: ProcessSettingsCreateDto) =>
    frontOfficeRequest.post("/process-settings", body);

export const deleteProcessSettings = (id: string) =>
    frontOfficeRequest.delete(`/process-settings/${id}`);

export const updateProcessSettings = (body: ProcessSettingsUpdateDto) =>
    frontOfficeRequest.patch(`/process-settings/${body.id}`, body);
