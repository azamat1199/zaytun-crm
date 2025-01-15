import { TranslationModel } from "@/data/translation";
import { ModuleType } from "@/providers/redux/slices/userSlice";

export interface CreateRoleDto {
    localaziableName: TranslationModel;
    modules: ModuleType[];
}
