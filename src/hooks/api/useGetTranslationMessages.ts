import { TranslationKeyModel, getAllKeyTranslation } from "@/data/translation";
import { setKeys } from "@/providers/redux/slices/translation";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppDispatch } from "../helpers/useAppDispatch";
import { AxiosResponse } from "axios";

const useGetTranslationMessages = (
    options?: Omit<UseQueryOptions, "queryKey">,
    handleSuccess?: () => void,
) => {
    const dispatch = useAppDispatch();
    const { data, isSuccess, ...rest } = useQuery<any>({
        queryKey: ["messages"],
        queryFn: getAllKeyTranslation,
        select: (res: AxiosResponse<any>): TranslationKeyModel[] =>
            res.data?.result?.data || [],
        ...options,
    });

    useEffect(() => {
        if (isSuccess) {
            handleSuccess && handleSuccess();
            dispatch(setKeys(data as any));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, data, dispatch]);

    return {
        data,
        isSuccess,
        ...rest,
    };
};

export default useGetTranslationMessages;
