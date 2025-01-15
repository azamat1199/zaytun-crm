import get from "lodash.get";
import { getTaskDetailById } from "@/data/task";
import { QueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";

const getQueryKey = (id: string) => ["task-detail", { id }];

const getPreparedData = (res: any) => get(res, "data.data.result.data", {});

const useGetTaskDetailById = (id: string, options?: QueryOptions) => {
    const queryKey = getQueryKey(id);

    const res = useQuery({
        queryKey,
        queryFn: () => getTaskDetailById(id),
        ...options,
    });

    const preparedData = getPreparedData(res);

    return {
        ...res,
        task: preparedData,
    };
};

export const useGetTaskDetailByIdFromQueryStore = (id: string) => {
    const queryClient = useQueryClient();
    const queryKey = getQueryKey(id);

    const taskState = queryClient.getQueryState(queryKey);

    const preparedData = getPreparedData(taskState);

    return {
        ...taskState,
        task: preparedData,
        subjectId: get(preparedData, "actualProcess.subjectId"),
    };
};

export default useGetTaskDetailById;
