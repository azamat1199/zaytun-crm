import { TranslationModel } from "../translation";

export interface UserRoleModel {
    createdAt: string;
    createdByFullName: string;
    id: string;
    initialPage: { id: string; code: string };
    localaziableName: TranslationModel;
}
