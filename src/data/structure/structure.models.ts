import { TranslationModel } from "../translation";

export type StructureOccupationModel = {
    code: string;
    createdAt: string;
    id: string;
    localaziableName: {
        uzLat: string;
        uzCr: string;
        ru: string;
        en: string;
    };
    sortOrder: string;
    updatedAt: string;
};

export interface BranchModel {
    id: string;
    code: string;
    localaziableName: TranslationModel;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
    structure: {
        id: string;
    };
    region: {
        id: string;
    };
    district: {
        id: string;
    };
    lat: number;
    lon: number;
    cbuCode: number;
}
