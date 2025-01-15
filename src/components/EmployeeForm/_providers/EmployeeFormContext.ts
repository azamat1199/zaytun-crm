import { createContext } from "react";
import useEmployeeForm from "../_hooks/useEmployeeForm";

type EmployeeFormContextType = Omit<
    ReturnType<typeof useEmployeeForm>,
    "resolver" | "validationSchema"
> & { readonly: boolean };

export const EmployeeFormContext =
    createContext<EmployeeFormContextType | null>(null);
