import {
    ZDatePicker,
    ZPatternFormat,
    ZTextField,
} from "@/components/z-components/FormElements";
import ZReactSelect from "@/components/z-components/ZReactSelect";
import useCountries from "@/hooks/api/useCountries";
import useGender from "@/hooks/api/useGender";
import useNationality from "@/hooks/api/useNationality";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import useEmployeeFormContext from "./_hooks/useEmployeeFormContext";
import ZMaskedInput from "../z-components/FormElements/ZMaskedInput";

const DULCollapse = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext();
    const { options: genderOptions } = useGender();
    const { optionsNationality } = useNationality();
    const { options: countryOptions } = useCountries();
    const { readonly } = useEmployeeFormContext();

    return (
        <div className="w-full grid grid-cols-4 gap-4 pt-6">
            <div className="grid grid-cols-2 gap-4">
                <Controller
                    name="passportSerial"
                    control={control}
                    render={({ field }) => (
                        <ZMaskedInput
                            inputProps={{
                                label: "Серия ДУЛ",
                                errors,
                                name: field.name,
                            }}
                            {...field}
                            autoCapitalize
                            mask={"AB"}
                            formatChars={{ A: "[A-Z, a-z]", B: "[A-Z, a-z]" }}
                        />
                    )}
                />

                <Controller
                    name="passportNumber"
                    control={control}
                    render={({ field }) => (
                        <ZPatternFormat
                            format="#######"
                            {...field}
                            inputProps={{ label: "Номер ДУЛ", errors }}
                        />
                    )}
                />
            </div>

            <ZTextField
                label="Кем выдан"
                {...register("passportIssuedBy")}
                errors={errors}
            />
            <Controller
                control={control}
                name="passportIssuedDate"
                render={({ field }) => (
                    <ZDatePicker
                        label="Когда выдан"
                        {...field}
                        errors={errors}
                    />
                )}
            />

            <Controller
                control={control}
                name="passportValidityDate"
                render={({ field }) => (
                    <ZDatePicker
                        label="Действителен до"
                        {...field}
                        errors={errors}
                    />
                )}
            />
            <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                    <ZReactSelect
                        {...field}
                        label="Пол"
                        options={genderOptions}
                        enableMenuPortalTarget
                        errors={errors}
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />

            <Controller
                control={control}
                name="birthDate"
                render={({ field }) => (
                    <ZDatePicker
                        label="Дата рождения"
                        {...field}
                        errors={errors}
                    />
                )}
            />
            <Controller
                control={control}
                name="nationality"
                render={({ field }) => (
                    <ZReactSelect
                        {...field}
                        label="Национальность"
                        options={optionsNationality}
                        enableMenuPortalTarget
                        errors={errors}
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />

            <Controller
                control={control}
                name="birthCountry"
                render={({ field }) => (
                    <ZReactSelect
                        {...field}
                        label="Дата рождения"
                        options={countryOptions}
                        enableMenuPortalTarget
                        errors={errors}
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
        </div>
    );
};

export default DULCollapse;
