import { DepartmentModel } from "@/data/department";
import { PositionModel } from "@/data/position";

export interface CreateEmploymentDto {
    sortOrder: number;
    department: {
        id: DepartmentModel["id"];
    };
    position: {
        id: PositionModel["id"];
    };
}
