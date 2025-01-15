import { hrRequest } from "@/services/requests/basRequests";
import { CreatePositionDto } from "./dtos/create.position.dto";
import { PaginationParamsType } from "../data.types";

export const createPosition = (body: CreatePositionDto) =>
    hrRequest.post("/positions", body);

export const getPositions = (params: PaginationParamsType) =>
    hrRequest.get("/positions", { params });
