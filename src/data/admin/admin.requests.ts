import {
    frontOfficeRequest,
    historyRequest,
} from "@/services/requests/basRequests";

export const getTranslateList = (params: {
    page: number;
    size: number;
    search: string;
}) => frontOfficeRequest.get("/key-translation/for-admin", { params });

export const getRoleList = (params: any) =>
    frontOfficeRequest.get("/roles", { params });

export const getDocumentList = (params: any) =>
    frontOfficeRequest.get("/document-templates", { params });

export const createDocumentList = (body: any) =>
    frontOfficeRequest.post("/document-templates", body);

export const getDocumentIdList = (id: string) =>
    frontOfficeRequest.get(`/document-templates/${id}`);

export const editDocumentList = ({ id, ...body }: any) =>
    frontOfficeRequest.patch(`/document-templates/${id}`, { ...body, id });

export const deleteDocumentId = (id: string) =>
    frontOfficeRequest.delete(`/document-templates/${id}`);

export const getHistoryList = ({
    search,
    page,
    size,
    operation,
    ...rest
}: any) =>
    historyRequest.post(
        "/history",
        { search, operation, ...rest },
        { params: { page, size } },
    );

export const getHistoryListId = ({ id, params }: any) => {
    return historyRequest.get(`/history/${id}`, { params });
};

export const getDocumentTemplates = (params: any) =>
    frontOfficeRequest.get(`/process-templates`, { params });
