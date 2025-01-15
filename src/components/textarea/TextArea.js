import React from "react";

export function TextareaValidations(props) {
    const { size, disabled, error, label, labelClassName } = props;
    return (
        <div className={`flex ${size} flex-col gap-6 `}>
            <label htmlFor={props.id || props.name} className={labelClassName}>
                {label}
            </label>
            <textarea
                {...props}
                disabled={disabled}
                className={`w-full border-[1px] border-[#CDD4DF] resize-none
        focus:border-primary rounded-[6px] py-[10px] outline-none px-[14px]
         ${error && "!border-red-600"} 
         ${disabled && "text-gray-300 bg-gray-[#FCFCFD]"}`}
            />
        </div>
    );
}
