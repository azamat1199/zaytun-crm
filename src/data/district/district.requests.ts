import { hrRequest } from "@/services/requests/basRequests";

export const getDistrictsByRegionId = (regionId: string) =>
    hrRequest.get(`/districts/region/${regionId}`);
