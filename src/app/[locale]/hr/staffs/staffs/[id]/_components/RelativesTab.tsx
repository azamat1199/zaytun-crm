import RelativesDataGrid from "@/components/EmployeeForm/RelativesDataGrid";
import { prepareEmployeeForEdit } from "@/data/hr/employee/employee.services";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import useQueryEmployee from "@/hooks/helpers/useQueryEmployee";
import { FormProvider, useForm } from "react-hook-form";

const RelativesTab = () => {
    const { getWord } = useKeyTranslation();
    const { employeeData } = useQueryEmployee();

    const defaultValues = {
        relatives: prepareEmployeeForEdit({
            dto: employeeData,
            getWord,
            property: "relatives",
        }),
    };

    const methods = useForm({ defaultValues });

    return (
        <FormProvider {...methods}>
            <RelativesDataGrid readonly />
        </FormProvider>
    );
};

export default RelativesTab;
