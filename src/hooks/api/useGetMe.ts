import { getUser } from "@/data/user/user.requests";
import { QueryOptions, useQuery, useQueryClient } from "@tanstack/react-query";

const useGetMe = (options: QueryOptions) => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        select: (res) => res.data,
        enabled: true,
        ...options,
    });
};

export const useGetMeFromQuery = () => {
    const queryClient = useQueryClient();

    const state = queryClient.getQueryState(["user"]);

    return state;
};

export default useGetMe;
