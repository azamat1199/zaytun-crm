import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";

export const useSourceList = (requestSourceProp: any) => {
    const { getWord } = useKeyTranslation();
    const list = requestSourceProp?.data?.data?.result?.data?.content || [];
    if (Array.isArray(list)) {
        return list.map((item) => ({
            label: getWord(
                item?.localaziableName ||
                    item?.departmentTemplate?.localaziableName ||
                    item?.position?.localaziableName,
            ),
            value: item.id,
        }));
    } else {
        return [];
    }
};
