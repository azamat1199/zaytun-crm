import React from "react";
import EmployeeForm from "@/components/EmployeeForm";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import useGender from "@/hooks/api/useGender";
import { prepareEmployeeForEdit } from "@/data/hr/employee/employee.services";
import useQueryEmployee from "@/hooks/helpers/useQueryEmployee";
import { Loader } from "@zaytun/components";

const FormTab = () => {
    const { getWord } = useKeyTranslation();
    const { options: genderOptions } = useGender();
    const { employeeData, status } = useQueryEmployee();

    const defaultValues = prepareEmployeeForEdit({
        dto: employeeData,
        getWord,
        genderOptions,
    });

    if (status === "pending") {
        return <Loader />;
    }

    return <EmployeeForm defaultValues={defaultValues} readonly />;
};

export default FormTab;
