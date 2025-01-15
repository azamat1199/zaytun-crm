import {
    ZDatePicker,
    ZTextField,
} from "@/components/z-components/FormElements";
import ZButton from "@/components/z-components/ZButton";
import ZReactSelect from "@/components/z-components/ZReactSelect";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { object, string, lazy } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import get from "lodash.get";
import useRelative from "@/hooks/api/useRelative";
import useCountries from "@/hooks/api/useCountries";

interface RelativesFormProps {
    handleSubmit: (values: Record<string, any>) => void;
    defaultValues: Record<string, any>;
    handleCancel: () => void;
}

const RelativesForm: FC<RelativesFormProps> = ({
    defaultValues,
    handleCancel,
    ...props
}) => {
    const validationSchema = object({
        relativeType: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().required("Поле обязательно"),
                      value: string().required("Поле обязательно"),
                  })
                : string().required("Поле обязательно"),
        ),
        birthDate: string().required("Поле обязательно"),
        birthCountry: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().required("Поле обязательно"),
                      value: string().required("Поле обязательно"),
                  })
                : string().required("Поле обязательно"),
        ),
        workPlace: string().required("Поле обязательно"),
        position: string().required("Поле обязательно"),
        fullName: string().required("Поле обязательно"),
    });

    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(validationSchema),
    });
    console.log(errors);

    const { optionsRelative, refetch } = useRelative();
    const { options: countryOptions } = useCountries();

    const onSubmit = handleSubmit(props.handleSubmit);

    return (
        <form className="w-full" onSubmit={onSubmit}>
            <div className="w-full grid grid-cols-2 gap-x-6 gap-y-[27px]">
                <Controller
                    name="relativeType"
                    control={control}
                    render={({ field }) => (
                        <ZReactSelect
                            label="Степень родства"
                            options={optionsRelative}
                            {...field}
                            errors={errors}
                            refetch={refetch}
                            referenceType="RELATIVE_TYPE"
                        />
                    )}
                />
                <ZTextField
                    label="ФИО"
                    {...register("fullName")}
                    helperText={get(errors, "fullName.message") || ""}
                    hasError={Object.hasOwn(errors, "fullName")}
                />

                <Controller
                    control={control}
                    name="birthDate"
                    render={({ field }) => (
                        <ZDatePicker
                            {...field}
                            label="Работает по настоящее время"
                            className="col-span-2"
                            value={field.value || ""}
                            helperText={get(errors, "birthDate.message") || ""}
                            hasError={Object.hasOwn(errors, "birthDate")}
                        />
                    )}
                />

                <ZTextField
                    label="Место рождения"
                    {...register("birthPlace")}
                    helperText={get(errors, "birthPlace.message") || ""}
                    hasError={Object.hasOwn(errors, "birthPlace")}
                />
                <ZTextField
                    label="Место работы"
                    {...register("workPlace")}
                    helperText={get(errors, "workPlace.message") || ""}
                    hasError={Object.hasOwn(errors, "workPlace")}
                />

                <ZTextField
                    label="Должность"
                    {...register("position")}
                    helperText={get(errors, "position.message") || ""}
                    hasError={Object.hasOwn(errors, "position")}
                />

                <Controller
                    name="birthCountry"
                    control={control}
                    render={({ field }) => (
                        <ZReactSelect
                            label="Место жительство"
                            options={countryOptions}
                            {...field}
                            errors={errors}
                            enableMenuPortalTarget
                            maxMenuHeight={200}
                            rootClassName="col-span-2"
                        />
                    )}
                />
            </div>
            <div className="mt-8 border-t flex gap-4 col-span-2 p-6">
                <ZButton
                    pending={false}
                    className="w-full"
                    variant="secondary"
                    type="button"
                    onClick={handleCancel}
                >
                    Отменить
                </ZButton>

                <ZButton
                    pending={false}
                    className="w-full"
                    type="button"
                    onClick={onSubmit}
                >
                    Добавить
                </ZButton>
            </div>
        </form>
    );
};

export default RelativesForm;
