import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
    ZDatePicker,
    ZRadioGroup,
    ZRadioGroupItem,
} from "../z-components/FormElements";

const ContractCollapse = () => {
    const { control, setValue, watch } = useFormContext();

    const fixedTermedContract = watch("fixedTermedContract") === "false";

    return (
        <div className="w-full flex gap-6 pt-6">
            <Controller
                control={control}
                name="fixedTermedContract"
                render={({ field }) => (
                    <ZRadioGroup
                        {...field}
                        onChange={setValue}
                        rootClassName="flex items-end col-span-2"
                    >
                        <ZRadioGroupItem value="false" label="Срочный" />
                        <ZRadioGroupItem value="true" label="Бессрочный" />
                    </ZRadioGroup>
                )}
            />
            <Controller
                name="hireDate"
                control={control}
                render={({ field }) => (
                    <ZDatePicker label="Дата принятия на работу" {...field} />
                )}
            />

            {fixedTermedContract && (
                <Controller
                    name="terminationDate"
                    control={control}
                    render={({ field }) => (
                        <ZDatePicker label="Дата отставки" {...field} />
                    )}
                />
            )}
        </div>
    );
};

export default ContractCollapse;
