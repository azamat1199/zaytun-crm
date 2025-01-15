import { TranslationModel } from "../translation";

export interface DepartmentTemplateModel {
    id: string;
    code: string;
    localaziableName: TranslationModel;
    createdAt: string;
    updatedAt: string;
    sortOrder: number;
}
