import {
    crmRequest,
    frontOfficeRequest,
} from "@/services/requests/basRequests";
import { AxiosResponse } from "axios";

type AxiosReq = {
    params: Promise<AxiosResponse<any, any>>;
};

export const getPhysicalClientList = (params: AxiosReq) =>
    crmRequest.get("/physical-clients", { params });

export const getLeadsList = (params: AxiosReq) =>
    frontOfficeRequest.get("/leads", { params });

export const getLeadsListById = ({ id, data }: any) =>
    frontOfficeRequest.get(`/leads/${id}`, data);

export const getListLeadSource = (params: AxiosReq) =>
    frontOfficeRequest.get("/lead-sources/for-select", { params });

export const getListCampaign = (params: AxiosReq) =>
    frontOfficeRequest.get("/campaigns/for-select", { params });

export const getLeadseEnquire = (params: AxiosReq) =>
    frontOfficeRequest.get("/lead-enquiries/for-select", { params });

export const postLead = (body: any) => frontOfficeRequest.post("/leads", body);

export const getLeadsTabsList = () => frontOfficeRequest.get("/lead-statuses");
