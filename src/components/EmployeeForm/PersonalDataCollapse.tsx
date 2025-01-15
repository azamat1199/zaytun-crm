import {
    ZPatternFormat,
    ZTextField,
} from "@/components/z-components/FormElements";
import ZReactSelect from "@/components/z-components/ZReactSelect";
import useNationality from "@/hooks/api/useNationality";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import useEmployeeFormContext from "./_hooks/useEmployeeFormContext";

const PersonalDataCollapse = () => {
    const {
        register,
        control,
        watch,
        formState: { errors },
    } = useFormContext();

    const { readonly } = useEmployeeFormContext();
    const { optionsNationality, refetch } = useNationality();

    console.log(watch("tin"), "tin");

    return (
        <div className="w-full grid grid-cols-4 gap-4 pt-6">
            <ZTextField
                label={"Фамилия (лат)"}
                {...register("lastNameLat")}
                errors={errors}
            />
            <ZTextField
                label={"Имя (лат)"}
                {...register("firstNameLat")}
                errors={errors}
            />
            <ZTextField
                label={"Имя (кир)"}
                {...register("firstNameLat")}
                errors={errors}
            />
            <ZTextField
                label={"Отчество (лат)"}
                {...register("middleNameLat")}
                errors={errors}
            />
            <Controller
                control={control}
                name="nationality"
                render={({ field }) => (
                    <ZReactSelect
                        errors={errors}
                        options={optionsNationality}
                        label={"Национальность"}
                        {...field}
                        enableMenuPortalTarget
                        referenceType="nationality"
                        refetch={refetch}
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
            <ZTextField
                label={"Фамилия (кир)"}
                {...register("lastNameCrl")}
                errors={errors}
            />
            <ZTextField
                label={"Отчество (кир)"}
                {...register("middleNameCrl")}
                errors={errors}
            />

            <Controller
                name="tin"
                control={control}
                render={({ field }) => (
                    <ZPatternFormat
                        inputProps={{ label: "ИНН", errors }}
                        format="#########"
                        {...field}
                    />
                )}
            />
        </div>
    );
};

export default PersonalDataCollapse;
