import {
    TranslationFrontOptionsType,
    TranslationModel,
    TranslationOptionsType,
} from "@/data/translation";
import { isPlainObject } from "./common";

export const mappedServerFrontTranslationLangs: Record<
    TranslationOptionsType,
    TranslationFrontOptionsType
> = {
    en: "en",
    ru: "ru",
    uzCr: "cr",
    uzLat: "uz",
};

export const mappedFrontServerTranslationLangs: Record<
    TranslationFrontOptionsType,
    TranslationOptionsType
> = {
    cr: "uzCr",
    ru: "ru",
    uz: "uzLat",
    en: "en",
};

/**
 * Retrieves the translated word from a given object based on the specified language.
 * @param {Partial<TranslationModel>} obj - The object containing translated words for different languages.
 * @param {TranslationFrontOptionsType} lang - The language code to retrieve the translation for.
 * @param {string} [errorCase=''] - The default value to return if the translation is not found.
 * @returns {string} The translated word for the specified language, or the default value if not found.
 */

export const getTranslatedWord = (
    obj: Partial<TranslationModel>,
    lang: TranslationFrontOptionsType,
    errorCase = "--",
) => {
    if (!isPlainObject(obj)) {
        return errorCase;
    }

    const correspondingLocale = mappedFrontServerTranslationLangs[lang] || "ru";

    if (correspondingLocale in obj) {
        return obj[correspondingLocale] || errorCase;
    }

    return errorCase;
};
