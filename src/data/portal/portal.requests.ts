import { frontOfficeRequest } from "@/services/requests/basRequests";
import { AxiosResponse } from "axios";

type AxiosReq = {
    params: Promise<AxiosResponse<any, any>>;
};

export const getAppealsList = (params: AxiosReq) =>
    frontOfficeRequest.get("/appeals", { params });
