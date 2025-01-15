import { frontOfficeRequest } from "@/services/requests/basRequests";

export const getUser = () => frontOfficeRequest.get("/user/me");
