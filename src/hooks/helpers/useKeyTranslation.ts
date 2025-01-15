import { getTranslatedWord } from "@/utils/language";
import useAppLocale from "./useAppLocale";
import { useCallback } from "react";

const useKeyTranslation = () => {
    const locale = useAppLocale();

    const getWord = useCallback(
        (obj: Parameters<typeof getTranslatedWord>["0"], errorCase = "") =>
            getTranslatedWord(obj, locale, errorCase),
        [locale],
    );

    const getWord2 = (obj: any, path: string) => {
        if (locale === "cr") {
            return obj?.[`${path}Cr`];
        }

        return obj?.[`${path}Lat`];
    };

    return {
        getWord,
        getWord2,
    };
};

export type GetWordType = ReturnType<typeof useKeyTranslation>["getWord"];

export default useKeyTranslation;
