import React from "react";
import { Radio } from "@material-tailwind/react";

export default function RadioCheckbox({
    icon,
    ripple = true,
    label,
    name,
    className,
    handleChangeRadio,
    color,
    ...props
}) {
    return (
        <Radio
            {...props}
            name={name}
            ripple={ripple}
            color={color}
            icon={icon}
            label={label}
            className={className}
            onChange={handleChangeRadio}
        />
    );
}
