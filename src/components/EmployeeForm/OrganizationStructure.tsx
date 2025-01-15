import useBranches from "@/hooks/api/useBranches";
import useDepartmentsByBranchId from "@/hooks/api/useDepartmentsByBranchId";
import useEmploymentsByDepartmentId from "@/hooks/api/useEmploymentsByDepartmentId";
import { Controller, useFormContext } from "react-hook-form";
import { ZNumericFormat, ZTextField } from "../z-components/FormElements";
import ZReactSelect from "../z-components/ZReactSelect";
import useEmployeeFormContext from "./_hooks/useEmployeeFormContext";

const OrganizationStructure = () => {
    const {
        control,
        register,
        watch,
        formState: { errors },
    } = useFormContext();
    const { options } = useBranches();
    const { readonly } = useEmployeeFormContext();

    const branch = watch("branch");
    const department = watch("department");

    const { options: departmentOptions } = useDepartmentsByBranchId(
        branch?.value,
    );
    const { options: employmentOptions } = useEmploymentsByDepartmentId({
        departmentId: department?.value,
    });

    return (
        <div className="w-full grid grid-cols-4 gap-4 pt-6">
            <Controller
                control={control}
                name="branch"
                render={({ field }) => (
                    <ZReactSelect
                        options={options}
                        label="Офис продаж"
                        enableMenuPortalTarget
                        {...field}
                        errors={errors}
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
            <Controller
                control={control}
                name="department"
                render={({ field }) => (
                    <ZReactSelect
                        label="Отдел и сектор"
                        options={departmentOptions}
                        enableMenuPortalTarget
                        {...field}
                        errors={errors}
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
            <Controller
                control={control}
                name="employment"
                render={({ field }) => (
                    <ZReactSelect
                        label="Должность"
                        options={employmentOptions}
                        enableMenuPortalTarget
                        {...field}
                        errors={errors}
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
            <ZTextField {...register("level")} label="Разряд" errors={errors} />
            <Controller
                name="Оклад"
                render={({ field }) => (
                    <ZNumericFormat
                        inputProps={{ label: "Оклад", startIcon: "UZS" }}
                        {...field}
                    />
                )}
            />
        </div>
    );
};

export default OrganizationStructure;
