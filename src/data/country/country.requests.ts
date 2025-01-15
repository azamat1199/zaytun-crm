import { hrRequest } from "@/services/requests/basRequests";

export const getCountries = () => hrRequest.get("/countries");
