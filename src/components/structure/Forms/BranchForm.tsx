import {
    ZCheckboxItem,
    ZTextField,
} from "@/components/z-components/FormElements";
import ZReactSelect from "@/components/z-components/ZReactSelect";
import useDistricts from "@/hooks/api/useDistricts";
import useEmployeeList from "@/hooks/api/useEmployeeList";
import useRegions from "@/hooks/api/useRegions";
import { Controller, useFormContext } from "react-hook-form";

const SalesForm = () => {
    const { watch, setValue, register, control } = useFormContext();
    const { options } = useEmployeeList();
    const { options: regions } = useRegions();

    const region = watch("region");

    const { options: districts } = useDistricts(region?.value);

    return (
        <div className="grid grid-cols-4 gap-4">
            <ZTextField
                {...register("uzCr")}
                label={`Название (узб)`}
                placeholder="Название (узб)"
                className="col-span-2"
            />
            <ZTextField
                {...register("uzLat")}
                label={`Название (lat)`}
                placeholder="Название (lat)"
                className="col-span-2"
            />
            <ZTextField
                {...register("ru")}
                label="Название (рус)"
                placeholder="Название (рус)"
                className="col-span-2"
            />
            <ZTextField
                {...register("en")}
                label="Название (анг)"
                placeholder="Название (анг)"
                className="col-span-2"
            />

            <Controller
                control={control}
                name="region"
                render={({ field }) => (
                    <ZReactSelect options={regions} label="Region" {...field} />
                )}
            />
            <Controller
                control={control}
                name="district"
                render={({ field }) => (
                    <ZReactSelect
                        options={districts}
                        label="District"
                        {...field}
                    />
                )}
            />

            <Controller
                control={control}
                // TODO set correct name
                name="t"
                render={({ field }) => (
                    <ZReactSelect
                        options={options}
                        label="Куратор филиала"
                        {...field}
                    />
                )}
            />

            <ZTextField
                {...register("sortOrder")}
                label="Порядковый номер"
                placeholder="Порядковый номер"
                type="number"
            />

            <ZTextField {...register("code")} label="Код" placeholder="Код" />
            <div className="col-span-3" />

            <div className="col-span-4 grid grid-cols-3 gap-4">
                <Controller
                    control={control}
                    name="hasDepartment"
                    render={({ field }) => (
                        <ZCheckboxItem
                            {...field}
                            label="Есть отдел"
                            onChange={setValue}
                            checked={field.value}
                        />
                    )}
                />
                {/* <Controller
          control={control}
          name="hasBranch"
          render={({ field }) => (
            <ZCheckboxItem
              {...field}
              label="Офиcе продаж"
              onChange={setValue}
              checked={field.value}
            />
          )}
        /> */}
                <Controller
                    control={control}
                    name="hasCommittee"
                    render={({ field }) => (
                        <ZCheckboxItem
                            {...field}
                            label="Имеет комитет"
                            onChange={setValue}
                            checked={field.value}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default SalesForm;
