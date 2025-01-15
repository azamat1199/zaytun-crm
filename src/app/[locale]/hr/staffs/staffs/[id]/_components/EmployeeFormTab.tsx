import EmployeeForm from "@/components/EmployeeForm";
import { prepareEmployeeForEdit } from "@/data/hr/employee/employee.services";
import useGender from "@/hooks/api/useGender";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import useQueryEmployee from "@/hooks/helpers/useQueryEmployee";

const EmployeeFormTab = () => {
    const { getWord } = useKeyTranslation();
    const { options: genderOptions } = useGender();
    const { employeeData } = useQueryEmployee();

    const defaultValues = prepareEmployeeForEdit({
        dto: employeeData,
        getWord,
        genderOptions,
    });

    return <EmployeeForm defaultValues={defaultValues} readonly />;
};

export default EmployeeFormTab;
