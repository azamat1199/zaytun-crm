import React from "react";
import { Select as SelectComponent, Option } from "@material-tailwind/react";

export function Select(props) {
    const { data, selectWidth, label } = props;

    return (
        <div className={`w-${selectWidth}`}>
            <SelectComponent
                className={`w-full`}
                label={label}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                }}
                aria-required={true}
                {...props}
            >
                {data.map((item) => (
                    <Option key={item.value} value={item.value}>
                        {item.label}
                    </Option>
                ))}
            </SelectComponent>
        </div>
    );
}
