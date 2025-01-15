import { ProcessTemplateModelFull } from "../process-templates/process-template.models";
import { TranslationModel } from "../translation";

export interface TaskTemplateModel {
    asyncTask: boolean;
    id: string;
    localaziableName: TranslationModel;
    orderNumber: number;
    slaInSeconds: number;
    type: string;
}

export interface TaskTemplateModelFull extends TaskTemplateModel {
    processTemplate: ProcessTemplateModelFull;
}
