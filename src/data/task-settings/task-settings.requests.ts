import { frontOfficeRequest } from "@/services/requests/basRequests";

export const getTaskSettings = ({
    processTemplateId,
    ...params
}: {
    page: number;
    size: number;
    processTemplateId: string;
}) =>
    frontOfficeRequest.get(
        `/task-settings/process-template/${processTemplateId}`,
        {
            params,
        },
    );

export const updateTaskSettings = (body: any) =>
    frontOfficeRequest.patch("/task-settings", body);
