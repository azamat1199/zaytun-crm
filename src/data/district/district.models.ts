import { RegionModel } from "../region/region.model";
import { TranslationModel } from "../translation";

export interface DistrictModel {
    id: string;
    code: string;
    localaziableName: TranslationModel;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
    region: {
        id: RegionModel["id"];
    };
}
