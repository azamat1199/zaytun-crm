import { timeToSeconds } from "@/utils/common";
import { TaskTemplateModel } from "../task-template";

export const prepareProcessTemplateForUpdate = (
    values: any,
    taskTemplates: TaskTemplateModel[],
) => {
    const { times } = values;
    return {
        ...values,
        priority: values?.priority?.value,
        processTemplate: values.processTemplate?.value,
        taskTemplates: taskTemplates.map((taskTemplate, i) => {
            const correspondingTime = times[i];

            return {
                id: taskTemplate.id,
                slaInSeconds: timeToSeconds(correspondingTime),
            };
        }),
    };
};
