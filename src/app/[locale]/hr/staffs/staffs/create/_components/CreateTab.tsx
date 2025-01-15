import EmployeeForm from "@/components/EmployeeForm";
import { openToast } from "@/components/notification";
import { createEmployee } from "@/data/hr/employee";
import { prepareEmployeeDto } from "@/data/hr/employee/employee.services";
import { getErrorMessages, getSuccessMessage } from "@/utils/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const CreateTab = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: createEmployee,
        mutationKey: ["create-employee"],
        onSuccess: (res) => {
            openToast({ variant: "success", text: getSuccessMessage(res) });
            queryClient.invalidateQueries({ queryKey: ["employee-list"] });
        },
        onError: (err: AxiosError) => {
            openToast({ variant: "error", text: getErrorMessages(err, false) });
        },
    });

    const handleSubmit = (values: Record<string, any>) => {
        mutate(prepareEmployeeDto(values));
    };

    return (
        <EmployeeForm
            handleSubmit={handleSubmit}
            defaultValues={{ fixedTermedContract: "true" }}
            pending={isPending}
        />
    );
};

export default CreateTab;
