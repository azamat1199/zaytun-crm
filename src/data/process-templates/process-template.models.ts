import { TaskTemplateModel } from "../task-template";

export interface ProcessTemplateModel {
    id: string;
    type: string;
    priority: string;
    slaInSeconds: number;
}

export interface ProcessTemplateModelFull extends ProcessTemplateModel {
    taskTemplates: TaskTemplateModel[];
}
