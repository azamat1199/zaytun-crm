import React, { FC } from "react";
import RoleFormContext from "./RoleFormContext";
import PlainForm from "./PlainForm";
import useRoleFormController from "./useRoleFormController";
import { ModuleType } from "@/providers/redux/slices/userSlice";

interface RoleFormProps {
    modules: ModuleType[];
    handleSubmit: (values: any) => void;
    isEdit?: boolean;
    initialValues?: Record<string, any>;
    submitButtonText: string;
    loadingRoles?: boolean;
    pending: boolean;
}

const RoleForm: FC<RoleFormProps> = ({
    modules,
    handleSubmit,
    isEdit,
    initialValues,
    submitButtonText,
    loadingRoles,
    pending,
}) => {
    const values = useRoleFormController(modules, isEdit);

    return (
        <RoleFormContext.Provider value={{ ...values, loadingRoles, pending }}>
            <PlainForm
                handleSubmit={handleSubmit}
                initialValues={initialValues}
                submitButtonText={submitButtonText}
            />
        </RoleFormContext.Provider>
    );
};

export default RoleForm;
