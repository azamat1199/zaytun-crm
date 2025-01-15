import { getProcessTemplates } from "@/data/process-templates";
import { useQuery } from "@tanstack/react-query";
import get from "lodash.get";
import useKeyTranslation from "../helpers/useKeyTranslation";

const useGetProcessTemplates = (params: { page: number; size: number }) => {
    const { getWord } = useKeyTranslation();
    const queryKey = ["process-templates", params];

    const { data, isSuccess, ...rest } = useQuery({
        queryFn: () => getProcessTemplates(params),
        queryKey,
    });

    const options = isSuccess
        ? get(data, "data.result.data.content").map((option) => ({
              label: getWord(option.localaziableName),
              value: option.id,
          }))
        : [];

    return {
        ...rest,
        data,
        isSuccess,
        options,
    };
};

export default useGetProcessTemplates;
