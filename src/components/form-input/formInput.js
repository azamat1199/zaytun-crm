import React from "react";
import { useField } from "formik";
import { TextField } from "@zaytun/components";
import cx from "classnames";
import { twMerge } from "tailwind-merge";

function FormInput({
    label,
    className = "",
    name,
    width = 310,
    fullWidth = false,
    withAsterisk = false,
    ...props
}) {
    const [field, meta] = useField(name);
    return (
        <div
            className={cx(className, "w-full")}
            style={{
                maxWidth: !fullWidth ? width : "100%",
            }}
        >
            <label className="text-gray-700 text-sm">
                <p className="mb-[6px] font-medium text-gray-700">
                    {label}{" "}
                    {withAsterisk && (
                        <span className="text-c_error-500">*</span>
                    )}
                </p>
                <TextField
                    auto
                    {...field}
                    {...props}
                    className={twMerge(className, "placeholder:opacity-100")}
                    error={meta.touched && meta.error}
                />
            </label>
            {meta.touched && meta.error ? (
                <div className="error text-red-700 text-[14px]">
                    {meta.error}
                </div>
            ) : null}
        </div>
    );
}

export default FormInput;
