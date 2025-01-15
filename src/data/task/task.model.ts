import { EmployeeModel } from "../hr/employee";
import { TaskTemplateModel } from "../task-template";

export type TaskStatusType = "NEW" | "FINISH" | "IN_PROGRESS" | "FAIL";

export enum TASK_PRIORITY {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
}

export enum TASK_TYPES {
    CREATE_EMPLOYEE_TASK_CRM_APPROVE_DOCUMENTS_HRD = "CREATE_EMPLOYEE_TASK_CRM_APPROVE_DOCUMENTS_HRD",
    CREATE_EMPLOYEE_TASK_CRM_ENTERING_EMPLOYEE_DATA = "CREATE_EMPLOYEE_TASK_CRM_ENTERING_EMPLOYEE_DATA",
    CREATE_EMPLOYEE_TASK_CRM_CALCULATE_SALARY = "CREATE_EMPLOYEE_TASK_CRM_CALCULATE_SALARY",
    ROTATION_EMPLOYEE_TASK_CRM_APPROVE_POSITION_CHANGING = "ROTATION_EMPLOYEE_TASK_CRM_APPROVE_POSITION_CHANGING",
    ROTATION_EMPLOYEE_TASK_CRM_CALCULATE_SALARY = "ROTATION_EMPLOYEE_TASK_CRM_CALCULATE_SALARY",
    ROTATION_EMPLOYEE_TASK_CRM_ATTACH_ADD_AGREEMENT_DECREE_SCAN = "ROTATION_EMPLOYEE_TASK_CRM_ATTACH_ADD_AGREEMENT_DECREE_SCAN",
    ROTATION_EMPLOYEE_TASK_CRM_RECALCULATE_SALARY = "ROTATION_EMPLOYEE_TASK_CRM_RECALCULATE_SALARY",
}

export type TaskLayoutTabType = "treatment" | "document" | "history";

export interface TaskModel {
    id: string;
    taskTemplate: TaskTemplateModel;
    sortOrder: number;
    status: TaskStatusType;
    assignedEmploymentId: string;
    assignedEmployee: EmployeeModel;
    departmentId: string;
    taskResult: string;
    assignedAt: string;
    finishedAt: string;
    createdById: string;
    updatedById: string;
    updatedAt: string;
    bpmsStageMessage: string;
    // TODO write type for process
    actualProcess: any;
    priority: TASK_PRIORITY;
    uniqueNumber: string;
    codeCBU: string;
}
