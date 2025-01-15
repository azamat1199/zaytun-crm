import React from "react";
import { useField } from "formik";
import { Checkbox } from "@/components/checkbox/Checkbox";

function FormCheckbox({ label, checked, ...props }) {
    const [field] = useField(props);
    return (
        <div className={`w-full mr-5`}>
            <label className={"text-black-600 text-sm"}>
                <Checkbox
                    type={"checkbox"}
                    label={label}
                    checked={checked}
                    {...field}
                    {...props}
                />
            </label>
        </div>
    );
}

export default FormCheckbox;
