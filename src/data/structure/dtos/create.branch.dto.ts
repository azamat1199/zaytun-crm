import { TranslationModel } from "@/data/translation";

export interface CreateBranchDto {
    localaziableName: TranslationModel;
    sortOrder: number;
    structure: {
        id: string;
    };
    region: {
        id: string;
    };
    district: {
        id: string;
    };
    lat?: number;
    lon?: number;
    cbuCode?: string;
    hasEmployment: boolean;
    hasDepartment: boolean;
    hasBranch: boolean;
    hasCommittee: boolean;
}
