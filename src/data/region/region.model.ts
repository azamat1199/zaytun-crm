import { TranslationModel } from "../translation";

export interface RegionModel {
    code: string;
    createdAt: string;
    id: string;
    localaziableName: TranslationModel;
    sortOrder: number;
    updatedAt: string;
}
