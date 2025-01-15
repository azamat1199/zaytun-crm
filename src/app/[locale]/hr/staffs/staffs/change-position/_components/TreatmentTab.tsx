import React from "react";
import { useMutation } from "@tanstack/react-query";
import { openToast } from "@/components/notification";
import { getErrorMessages, getSuccessMessage } from "@/utils/common";
import {
    getEmployeeById,
    postEmployeeChangePosition,
} from "@/data/hr/employee";
import ChangeEmployeePositionForm from "@/components/ChangeEmployeePositionForm";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";

export default function Treatment(props: any) {
    const { setCurrentComponent } = props;
    const { id } = useParams();
    const { getWord } = useKeyTranslation();
    const router = useRouter();
    const { data } = useQuery({
        queryFn: () => getEmployeeById(id as string),
        queryKey: ["employee", { id }],
        enabled: Boolean(id),
        select: (res) => res.data?.result?.data,
    });
    const employmentData = data?.employment;
    const createMutate = useMutation({
        mutationFn: postEmployeeChangePosition,
        mutationKey: ["create-change-position"],
        onSuccess: (res) => {
            openToast({ variant: "success", message: getSuccessMessage(res) });
            router.push("/portal/tasks/tasks", { scroll: true });
        },
        onError: (err) => {
            openToast({
                variant: "error",
                message: getErrorMessages(err as any, false),
            });
        },
    });
    const handleSubmit = (values: any) => {
        createMutate.mutate(values);
    };

    return (
        <ChangeEmployeePositionForm
            handleSubmit={handleSubmit}
            defaultValues={{
                prePosition: getWord(
                    employmentData?.position?.localaziableName,
                ),
                preDepartment: getWord(
                    employmentData?.department?.departmentTemplate
                        ?.localaziableName,
                ),
                preBranch: getWord(
                    employmentData?.department?.branch?.localaziableName,
                ),
                prePinfl: data?.pinfl,
                preBirthDate: data?.birthDate,
                preLevel: data?.level,
            }}
            employmentData={data}
            setCurrentComponent={setCurrentComponent}
            id={id}
        />
    );
}
