import { createContext } from "react";
import useRoleFormController from "./useRoleFormController";

const RoleFormContext = createContext<
    | (ReturnType<typeof useRoleFormController> & {
          loadingRoles?: boolean;
          pending: boolean;
      })
    | null
>(null);

export default RoleFormContext;
