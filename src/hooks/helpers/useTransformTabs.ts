import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";

type LocalizableName = {
    uzLat: string;
};

type BackendItem = {
    id: string;
    localaziableName: LocalizableName;
    type: string;
};

const useTransformTabs = (backendArray?: BackendItem[]) => {
    const { getWord } = useKeyTranslation();
    return (
        backendArray?.map((item) => ({
            value: item?.type,
            label: getWord(item?.localaziableName),
            id: item.id,
        })) || []
    );
};

export default useTransformTabs;
