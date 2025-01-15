import { ZTextField } from "@/components/z-components/FormElements";
import ZReactSelect from "@/components/z-components/ZReactSelect";
import useDistricts from "@/hooks/api/useDistricts";
import useRegions from "@/hooks/api/useRegions";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import useEmployeeFormContext from "./_hooks/useEmployeeFormContext";

const RegistrationCollapse = () => {
    const {
        register,
        control,
        watch,
        formState: { errors },
    } = useFormContext();
    const region = watch("registeredRegion");
    const { options: regionOptions } = useRegions();
    const { options: districtsOptions } = useDistricts(region?.value);
    const { readonly } = useEmployeeFormContext();

    return (
        <div className="w-full grid grid-cols-4 gap-4 pt-6">
            <ZTextField
                rootClassName="col-span-2"
                {...register("registeredFullAddress")}
                label="Полный адрес"
                errors={errors}
            />
            <div className="col-span-2" />
            <Controller
                control={control}
                name="registeredRegion"
                render={({ field }) => (
                    <ZReactSelect
                        options={regionOptions}
                        label="Область"
                        errors={errors}
                        {...field}
                        enableMenuPortalTarget
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
            <Controller
                name="registeredDistrict"
                control={control}
                render={({ field }) => (
                    <ZReactSelect
                        label="Район"
                        options={districtsOptions}
                        {...field}
                        errors={errors}
                        enableMenuPortalTarget
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
            <ZTextField
                {...register("registeredStreet")}
                label="Улица"
                errors={errors}
            />
            <div className="grid grid-cols-2 gap-4">
                <ZTextField
                    {...register("registeredHouseNumber")}
                    label="Дом"
                    errors={errors}
                />
                <ZTextField
                    label="Квартира"
                    errors={errors}
                    {...register("registeredFlatNumber")}
                />
            </div>
        </div>
    );
};

export default RegistrationCollapse;
