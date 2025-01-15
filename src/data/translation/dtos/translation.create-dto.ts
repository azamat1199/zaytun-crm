import { TranslationKeyModel } from "..";

export interface TranslationCreateDto {
    key: string;
    translation: TranslationKeyModel;
}
