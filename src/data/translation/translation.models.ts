export interface TranslationModel {
    uzLat: string;
    uzCr: string;
    ru: string;
    en: string;
}

export interface TranslationKeyModel {
    id: string;
    key: string;
    translation?: TranslationModel;
}

export type TranslationOptionsType = "uzLat" | "uzCr" | "ru" | "en";

export type TranslationFrontOptionsType = "uz" | "ru" | "cr" | "en";
