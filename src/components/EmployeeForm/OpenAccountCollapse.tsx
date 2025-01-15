import { Controller, useFormContext } from "react-hook-form";
import { ZCheckboxItem } from "../z-components/FormElements";

const OpenAccountCollapse = () => {
    const { control, setValue } = useFormContext();
    return (
        <div className="w-full gap-6 flex pt-6">
            <Controller
                name="hasAccessBank"
                control={control}
                render={({ field }) => (
                    <ZCheckboxItem
                        {...field}
                        label="Доступ в банк"
                        onChange={setValue}
                        checked={field.value}
                    />
                )}
            />
            <Controller
                name="hasEmail"
                control={control}
                render={({ field }) => (
                    <ZCheckboxItem
                        {...field}
                        label="Электронная почта"
                        onChange={setValue}
                        checked={field.value}
                    />
                )}
            />
            <Controller
                name="hasAccount"
                control={control}
                render={({ field }) => (
                    <ZCheckboxItem
                        {...field}
                        label="Учетная запись"
                        onChange={setValue}
                        checked={field.value}
                    />
                )}
            />
        </div>
    );
};

export default OpenAccountCollapse;
