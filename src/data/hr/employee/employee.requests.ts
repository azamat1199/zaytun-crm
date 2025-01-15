import { PaginationParamsType } from "@/data/data.types";
import { frontOfficeRequest, hrRequest } from "@/services/requests/basRequests";

interface CustomAxiosReq {
    localaziableName?: string;
    code?: string;
    referenceType?: string;
}

// export const getEmployeeList = (params: PaginationParamsType) =>
//   hrRequest.get('/employees', { params });

export const getBranchesList = ({ page = 0, size = 1000 }) =>
    hrRequest.get("/branches", { params: { page, size } });

export const getRegionsList = () => hrRequest.get("/regions");

export const getDistrictsList = ({ id, data }: any) =>
    hrRequest.get(`/districts/region/${id}`, data);

export const getDegreeType = ({ type }: any) =>
    hrRequest.get(`/references?type=${type}`);

export const postDegreeList = (data: CustomAxiosReq) =>
    hrRequest.post("/references", data);

export const getDepartmentListId = ({ id, data }: any) =>
    hrRequest.get(`/departments/branch/${id}`, data);

export const getEmploymentListId = ({ id, data }: any) =>
    hrRequest.get(`employments/department/${id}`, data);

export const createEmployee = (body: any) => hrRequest.post("/employees", body);

export const getEmployeeList = (
    params: PaginationParamsType & { search: string },
) => hrRequest.get("/employees", { params });

export const getEmployeeById = (id: string) =>
    hrRequest.get(`/employees/${id}`);

export const postEmployeeChangePosition = (data: any) => {
    return hrRequest.post("/employee-rotations", data?.body, {
        params: {
            processId: data?.params,
        },
    });
};
export const postEmployeeRotation = (data: any) =>
    frontOfficeRequest.post("/employee-rotation-process/create-process", data);
export const getEmployeeRotationsById = (id: string) =>
    hrRequest.get(`/employee-rotations/${id}`);
export const editNewEmployee = (body: any) =>
    hrRequest.put(
        `/employee-rotations/accept-manager/${body.rotationId}`,
        body,
    );
export const editSalaryRecalculation = (body: any) =>
    hrRequest.put(`/employee-rotations/recalculate-salary`, body);
export const editNewEmployeeFix = (body: any) =>
    hrRequest.put(`/employee-rotations/calculate-salary`, body);
export const postEmployeeDocuments = (data: any) =>
    hrRequest.post("/employee-rotations/documents", data);

export const getEmployeeByProcessId = (processId: string) =>
    frontOfficeRequest.get(
        `/employee-create-process/get-info-by-process-id/${processId}`,
    );

export const getEmployeeCreateProcessId = ({
    pinfl,
    birthDate,
}: {
    pinfl: string;
    birthDate: string;
}) => frontOfficeRequest.post("/employee-create-process", { pinfl, birthDate });
