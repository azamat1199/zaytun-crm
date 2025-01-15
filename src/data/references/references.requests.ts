import { hrRequest } from "@/services/requests/basRequests";
import { TranslationModel } from "../translation";

export const getReferences = (type: string) =>
    hrRequest.get(`/references?type=${type}`);

export const createReference = (data: {
    localaziableName: TranslationModel;
    referenceType: string;
}) => hrRequest.post("/references", data);
