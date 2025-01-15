"use client";
import { useGetTaskDetailByIdFromQueryStore } from "@/hooks/api/useGetTaskDetailById";
import { useParams, useRouter } from "next/navigation";
import useGetEmployeeDetailById from "@/hooks/api/useGetEmployeeDetailById";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import EmployeeForm from "@/components/EmployeeForm";
import { prepareEmployeeForEdit } from "@/data/hr/employee/employee.services";
import useGender from "@/hooks/api/useGender";

const TreatmentTab = () => {
    const { id } = useParams();
    const { options: genderOptions } = useGender();
    const { getWord } = useKeyTranslation();
    const { subjectId } = useGetTaskDetailByIdFromQueryStore(id as string);
    const { employee } = useGetEmployeeDetailById(subjectId);

    console.log(employee)

    const defaultValues = prepareEmployeeForEdit({
        dto: employee,
        getWord,
        genderOptions,
    });

    return <EmployeeForm defaultValues={defaultValues} />;
};

export default TreatmentTab;
