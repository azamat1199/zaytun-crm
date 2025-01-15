import { TranslationModel } from "../translation";

export interface PositionModel {
    code: string;
    id: string;
    localaziableName: TranslationModel;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
}
