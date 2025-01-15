import React from "react";
// import { useField } from 'formik';
import { Checkbox as Check } from "@material-tailwind/react";

export function Checkbox({
    label,
    name,
    checked,
    color = "primary",
    ...props
}) {
    // const [field] = useField(props);
    return (
        <Check
            {...props}
            // {...field}
            label={label}
            // checked={field.value[props.name]}
            // checked={field.value}
            checked={checked}
            color={color}
            // onChange={field.onChange}
            width={20}
            height={20}
            name={name}
            className={` rounded-[4px] checked:border-0 checked:bg-${color}`}
        />
    );
}
