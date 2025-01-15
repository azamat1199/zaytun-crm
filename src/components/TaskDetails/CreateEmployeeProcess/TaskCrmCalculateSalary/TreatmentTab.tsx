import useGetEmployeeDetailById from "@/hooks/api/useGetEmployeeDetailById";
import { useGetTaskDetailByIdFromQueryStore } from "@/hooks/api/useGetTaskDetailById";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import { useParams } from "next/navigation";
import React from "react";
import ZDivider from "@/components/z-components/ZDivider";
import Skeleton from "react-loading-skeleton";
import { Controller, useForm } from "react-hook-form";

const TreatmentTab = () => {
    const { id } = useParams();
    const { getWord, getWord2 } = useKeyTranslation();
    const { subjectId } = useGetTaskDetailByIdFromQueryStore(id as string);
    const { employee, isLoading } = useGetEmployeeDetailById(subjectId);
    const { control } = useForm({});
    return (
        <div className="w-full">
            <h3 className="text-h3-r text-primary underline mt-4 uppercase">
                {!isLoading ? (
                    `${getWord2(employee, "lastName")} ${getWord2(employee, "firstName")} ${getWord2(employee, "middleName")} `
                ) : (
                    <Skeleton width={300} height={35} />
                )}
            </h3>
            <ZDivider className="mb-10 mt-10" />

            <form>
                
            </form>
        </div>
    );
};

export default TreatmentTab;
