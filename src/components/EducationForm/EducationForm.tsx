import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import ZReactSelect from "../z-components/ZReactSelect";
import { ZCheckboxItem, ZTextField } from "../z-components/FormElements";
import useDegree from "@/hooks/api/useDegree";
import useTypeEducation from "@/hooks/api/useTypeEducation";
import { generateYears, month } from "@/utils/common";
import ZButton from "../z-components/ZButton";
import { object, string, lazy, bool } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useStaticData from "@/hooks/helpers/useStaticData";
import get from "lodash.get";

interface EducationFormProps {
    defaultValues: any;
    handleSubmit: (values: any) => void;
}

const EducationForm: FC<EducationFormProps> = ({ defaultValues, ...props }) => {
    const { months, years: startedYears } = useStaticData();
    const validationSchema = object({
        currentWorking: bool().optional(),
        startedMonth: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().required("Поле обязательно"),
                      value: string().required("Поле обязательно"),
                  })
                : string().required("Поле обязательно"),
        ),
        startedYear: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().required("Поле обязательно"),
                      value: string().required("Поле обязательно"),
                  })
                : string().required("Поле обязательно"),
        ),
        endedMonth: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().when("currentWorking", {
                          is: true,
                          then: (schema) => schema.optional(),
                          otherwise: (schema) =>
                              schema.required("Поле обязательно"),
                      }),
                      value: string().when("currentWorking", {
                          is: true,
                          then: (schema) => schema.optional(),
                          otherwise: (schema) =>
                              schema.required("Поле обязательно"),
                      }),
                  })
                : string().when("currentWorking", {
                      is: true,
                      then: (schema) => schema.optional(),
                      otherwise: (schema) =>
                          schema.required("Поле обязательно"),
                  }),
        ),
        endedYear: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().when("currentWorking", {
                          is: true,
                          then: (schema) => schema.optional(),
                          otherwise: (schema) =>
                              schema.required("Поле обязательно"),
                      }),
                      value: string().when("currentWorking", {
                          is: true,
                          then: (schema) => schema.optional(),
                          otherwise: (schema) =>
                              schema.required("Поле обязательно"),
                      }),
                  })
                : string().when("currentWorking", {
                      is: true,
                      then: (schema) => schema.optional(),
                      otherwise: (schema) =>
                          schema.required("Поле обязательно"),
                  }),
        ),
        educationLevel: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().required("Поле обязательно"),
                      value: string().required("Поле обязательно"),
                  })
                : string().required("Поле обязательно"),
        ),
        educationType: lazy((output) =>
            typeof output === "object"
                ? object().shape({
                      label: string().required("Поле обязательно"),
                      value: string().required("Поле обязательно"),
                  })
                : string().required("Поле обязательно"),
        ),
        school: string().required("Поле обязательно"),
        major: string().required("Поле обязательно"),
        direction: string().required("Поле обязательно"),
    });

    const {
        handleSubmit,
        control,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = handleSubmit(props.handleSubmit);
    const { options: degreeOptions, refetch: degreeRefetch } = useDegree();
    const { optionsEdu, refetch: eduRefetch } = useTypeEducation();

    const currentWorking: boolean = watch("currentWorking") || false;

    const startedYear = watch("startedYear")?.value;

    const endYears = generateYears(startedYear);

    return (
        <form className="w-full" onSubmit={onSubmit}>
            <div className="w-full grid grid-cols-2 gap-x-6 gap-y-[27px]">
                <Controller
                    name="educationLevel"
                    control={control}
                    render={({ field }) => (
                        <ZReactSelect
                            label="Степень"
                            {...field}
                            options={degreeOptions}
                            errors={errors}
                            referenceType="EDUCATION_LEVEL"
                            refetch={degreeRefetch}
                        />
                    )}
                />
                <Controller
                    name="educationType"
                    control={control}
                    render={({ field }) => (
                        <ZReactSelect
                            label="Тип образования"
                            options={optionsEdu}
                            {...field}
                            errors={errors}
                            referenceType="EDUCATION_TYPE"
                            refetch={eduRefetch}
                        />
                    )}
                />
                <Controller
                    name="startedMonth"
                    control={control}
                    render={({ field }) => (
                        <ZReactSelect
                            label="Дата начала"
                            placeholder="Месяц"
                            options={month}
                            {...field}
                            errors={errors}
                        />
                    )}
                />
                <Controller
                    name="startedYear"
                    control={control}
                    render={({ field }) => (
                        <ZReactSelect
                            label="Год"
                            options={startedYears}
                            {...field}
                            errors={errors}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="currentWorking"
                    render={({ field }) => (
                        <ZCheckboxItem
                            label="Работает по настоящее время"
                            className="col-span-2 h-[42px]"
                            onChange={(_name, checked) => {
                                setValue("currentWorking", checked);
                            }}
                            checked={field.value}
                        />
                    )}
                />

                <Controller
                    name="endedMonth"
                    control={control}
                    render={({ field }) => (
                        <ZReactSelect
                            label="Дата окончания"
                            placeholder="Месяц"
                            options={months}
                            {...field}
                            errors={errors}
                            isDisabled={currentWorking}
                        />
                    )}
                />
                <Controller
                    name="endedYear"
                    control={control}
                    render={({ field }) => (
                        <ZReactSelect
                            label="Год"
                            options={endYears}
                            {...field}
                            errors={errors}
                            isDisabled={currentWorking}
                        />
                    )}
                />

                <ZTextField
                    label="Место обучения"
                    {...register("school")}
                    helperText={get(errors, "school.message") || ""}
                    hasError={Object.hasOwn(errors, "school")}
                />
                <ZTextField
                    label="Направление"
                    {...register("direction")}
                    helperText={get(errors, "direction.message") || ""}
                    hasError={Object.hasOwn(errors, "direction")}
                />
                <ZTextField
                    label="Специальность"
                    {...register("major")}
                    helperText={get(errors, "major.message") || ""}
                    hasError={Object.hasOwn(errors, "major")}
                />
            </div>
            <div className="pt-6 pb-2 border-t">
                <ZButton type="button" onClick={onSubmit} className="w-full">
                    Добавить
                </ZButton>
            </div>
        </form>
    );
};

export default EducationForm;
