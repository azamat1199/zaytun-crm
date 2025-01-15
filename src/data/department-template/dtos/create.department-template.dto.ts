import { TranslationKeyModel } from "@/data/translation";

export interface CreateDepartmentTemplateDto {
    code: string;
    localaziableName: TranslationKeyModel;
    sortOrder: number;
}
