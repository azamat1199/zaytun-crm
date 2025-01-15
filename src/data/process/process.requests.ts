import { frontOfficeRequest } from "@/services/requests/basRequests";
import { AxiosResponse } from "axios";

type AxiosReq = {
    params: Promise<AxiosResponse<any, any>>;
};

export const getProcessList = (params: AxiosReq) =>
    frontOfficeRequest.get("/actual-processes", { params });

export const getProcessListId = (id: string) =>
    frontOfficeRequest.get(`/actual-processes/${id}`);
