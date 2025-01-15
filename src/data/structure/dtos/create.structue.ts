import { TranslationOptionsType } from "@/data/translation";

export interface CreateStructureDto {
    code?: string;
    localaziableName: Record<TranslationOptionsType, string>;
    sortOrder: number;
    id?: string;
}
