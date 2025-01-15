import { useContext } from "react";
import RoleFormContext from "./RoleFormContext";

const useRoleFormContext = () => {
    const context = useContext(RoleFormContext);

    if (!context) {
        throw new Error(
            "Component need to be wrapped by RoleFormContext 🔥🔥🔥",
        );
    }

    return context;
};

export default useRoleFormContext;
