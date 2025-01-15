import { useContext } from "react";
import { EmployeeFormContext } from "../_providers/EmployeeFormContext";

const useEmployeeFormContext = () => {
    const context = useContext(EmployeeFormContext);

    if (!context) {
        throw new Error(
            "Component need to be wrapped by EmployeeFormContext 🔥🔥🔥🔥",
        );
    }

    return context;
};

export default useEmployeeFormContext;
