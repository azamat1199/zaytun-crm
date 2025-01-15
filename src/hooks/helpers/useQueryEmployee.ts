import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import get from "lodash.get";

const useQueryEmployee = () => {
    const { id } = useParams();

    const queryClient = useQueryClient();

    const queryKey = ["employee", { id }];

    const data = queryClient.getQueryData(queryKey);

    const state = queryClient.getQueryState(queryKey);

    const employeeData: any = get(data, "data.result.data");

    return {
        employeeData,
        ...state,
    };
};

export default useQueryEmployee;
