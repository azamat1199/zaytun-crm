import { BranchModel } from "../structure";
import { TranslationModel } from "../translation";

export interface DepartmentModel {
    id: string;
    departmentTemplate: {
        id: string;
        code: string;
        localaziableName: TranslationModel;
    };
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
    branch: Pick<BranchModel, "id" | "code" | "localaziableName">;
}
