import LaborDataGrid from "@/components/EmployeeForm/LaborDataGrid";
import { prepareEmployeeForEdit } from "@/data/hr/employee/employee.services";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import useQueryEmployee from "@/hooks/helpers/useQueryEmployee";
import { FormProvider, useForm } from "react-hook-form";

const LaborActivityTab = () => {
    const { getWord } = useKeyTranslation();
    const { employeeData } = useQueryEmployee();

    const defaultValues = {
        experiences: prepareEmployeeForEdit({
            dto: employeeData,
            getWord,
            property: "experiences",
        }),
    };

    const methods = useForm({ defaultValues });

    return (
        <FormProvider {...methods}>
            <LaborDataGrid readonly />
        </FormProvider>
    );
};

export default LaborActivityTab;
