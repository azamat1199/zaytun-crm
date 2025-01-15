import { useTranslations } from "next-intl";

const useAppTranslations = () => {
    const intlT = useTranslations();

    const t = (key: string) => {
        if (typeof key !== "string") {
            return "";
        }

        return intlT(key) || key;
    };

    return {
        t,
    };
};

export default useAppTranslations;
