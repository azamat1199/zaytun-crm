import { hrRequest } from "@/services/requests/basRequests";

export const getRegions = () => hrRequest.get("/regions");
