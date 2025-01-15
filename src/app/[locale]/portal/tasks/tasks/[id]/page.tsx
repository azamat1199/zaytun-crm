"use client";
import TaskDetailLayout from "@/components/TaskDetailLayout";
import { TASK_TYPES } from "@/data/task";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { ComponentType } from "react";

const TaskCrmEnteringEmployeeData = dynamic(
    () =>
        import(
            "@/components/TaskDetails/CreateEmployeeProcess/TaskCrmEnteringEmployeeData"
        ),
);
const TaskCrmApproveDocumentsHrd = dynamic(
    () =>
        import(
            "@/components/TaskDetails/CreateEmployeeProcess/TaskCrmApproveDocumentsHrd"
        ),
);
const TaskCrmCalculateSalary = dynamic(
    () =>
        import(
            "@/components/TaskDetails/CreateEmployeeProcess/TaskCrmCalculateSalary"
        ),
);
const TaskRotationNewEmployeeApprove = dynamic(
    () => import("@/components/TaskDetails/TaskRotationEmployeeData"),
);
const TaskSalaryCalculation = dynamic(
    () => import("@/components/TaskDetails/TaskEmployeeCalculationSalary"),
);
const TaskEmployeeDocuments = dynamic(
    () => import("@/components/TaskDetails/TaskRotationDocuments"),
);
const TaskReSalaryCalculation = dynamic(
    () => import("@/components/TaskDetails/TaskEmployeeReCalculationSalary"),
);

const TaskDetailPage = () => {
    const searchParams = useSearchParams();
    let Component: ComponentType | null = null;
    const taskCode = searchParams.get("task-code") as TASK_TYPES;

    switch (taskCode) {
        case TASK_TYPES.CREATE_EMPLOYEE_TASK_CRM_ENTERING_EMPLOYEE_DATA:
            Component = TaskCrmEnteringEmployeeData;
            break;
        case TASK_TYPES.CREATE_EMPLOYEE_TASK_CRM_APPROVE_DOCUMENTS_HRD:
            Component = TaskCrmApproveDocumentsHrd;
            break;
        case TASK_TYPES.ROTATION_EMPLOYEE_TASK_CRM_APPROVE_POSITION_CHANGING:
            Component = TaskRotationNewEmployeeApprove;
            break;
        case TASK_TYPES.ROTATION_EMPLOYEE_TASK_CRM_CALCULATE_SALARY:
            Component = TaskSalaryCalculation;
            break;
        case TASK_TYPES.CREATE_EMPLOYEE_TASK_CRM_CALCULATE_SALARY:
            Component = TaskCrmCalculateSalary;
            break;
        case TASK_TYPES.ROTATION_EMPLOYEE_TASK_CRM_ATTACH_ADD_AGREEMENT_DECREE_SCAN:
            Component = TaskEmployeeDocuments;
            break;
        case TASK_TYPES.ROTATION_EMPLOYEE_TASK_CRM_RECALCULATE_SALARY:
            Component = TaskReSalaryCalculation;
            break;
        default:
            break;
    }

    return (
        <TaskDetailLayout>
            {Component ? <Component /> : <h1>Not found task type</h1>}
        </TaskDetailLayout>
    );
};

export default TaskDetailPage;
