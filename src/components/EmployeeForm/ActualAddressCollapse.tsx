import { ZTextField } from "@/components/z-components/FormElements";
import ZReactSelect from "@/components/z-components/ZReactSelect";
import useDistricts from "@/hooks/api/useDistricts";
import useRegions from "@/hooks/api/useRegions";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import useEmployeeFormContext from "./_hooks/useEmployeeFormContext";

const ActualAddressCollapse = () => {
    const {
        register,
        control,
        watch,
        formState: { errors },
    } = useFormContext();
    const region = watch("actualRegion");
    const { options: regionOptions } = useRegions();
    const { options: districtsOptions } = useDistricts(region?.value);
    const { readonly } = useEmployeeFormContext();

    return (
        <div className="w-full grid grid-cols-4 gap-4 pt-6">
            <ZTextField
                rootClassName="col-span-2"
                {...register("actualFullAddress")}
                label="Полный адрес"
                errors={errors}
            />
            <div className="col-span-2" />
            <Controller
                control={control}
                name="actualRegion"
                render={({ field }) => (
                    <ZReactSelect
                        options={regionOptions}
                        label="Область"
                        {...field}
                        enableMenuPortalTarget
                        errors={errors}
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
            <Controller
                name="actualDistrict"
                control={control}
                render={({ field }) => (
                    <ZReactSelect
                        enableMenuPortalTarget
                        label="Район"
                        options={districtsOptions}
                        {...field}
                        errors={errors}
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
            <ZTextField
                {...register("actualStreet")}
                label="Улица"
                errors={errors}
            />
            <div className="grid grid-cols-2 gap-4">
                <ZTextField
                    {...register("actualHouseNumber")}
                    label="Дом"
                    errors={errors}
                />
                <ZTextField
                    label="Квартира"
                    {...register("actualFlatNumber")}
                    errors={errors}
                />
            </div>
        </div>
    );
};

export default ActualAddressCollapse;
