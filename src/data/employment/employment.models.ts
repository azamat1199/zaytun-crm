import { DepartmentModel } from "../department";

export interface EmploymentModel {
    id: string;
    department: Pick<DepartmentModel, "id">;
    position: any;
    createdAt: string;
    updatedAt: string;
    sortOrder: number;
}
