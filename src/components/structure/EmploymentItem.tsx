import { DepartmentModel } from "@/data/department";
import { EmployeeModel } from "@/data/hr/employee";
import { PositionModel } from "@/data/position";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import { joinArray } from "@/utils/common";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import ZTruncatedText from "../z-components/ZTruncatedText";

interface EmploymentItemProps
    extends Pick<EmployeeModel, "id" | "createdAt" | "updatedAt"> {
    employee: EmployeeModel;
    position: PositionModel;
    department: Pick<DepartmentModel, "id">;
    active: boolean;
    roles: any[];
}

const EmploymentItem: FC<EmploymentItemProps> = ({
    employee,
    position,
    active,
    roles,
}) => {
    const { getWord, getWord2 } = useKeyTranslation();
    const roleCount = Array.isArray(roles) ? `(${roles.length})` : "";

    return (
        <div>
            <p
                className={twMerge(
                    "text-b-2-r text-c_neutral-600 flex flex-row gap-1",
                    active && "text-white",
                )}
            >
                <ZTruncatedText>
                    {getWord(position.localaziableName)}
                </ZTruncatedText>
                <span
                    className={twMerge(
                        "text-c_primary-500",
                        active && "text-white",
                    )}
                >
                    {roleCount}
                </span>
            </p>
            <ZTruncatedText>
                {joinArray([
                    getWord2(employee, "firstName"),
                    getWord2(employee, "lastName"),
                ])}
            </ZTruncatedText>
        </div>
    );
};

export default EmploymentItem;
