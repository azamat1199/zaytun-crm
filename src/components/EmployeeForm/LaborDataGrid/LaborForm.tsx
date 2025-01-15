import {
    ZCheckboxItem,
    ZTextField,
} from "@/components/z-components/FormElements";
import ZButton from "@/components/z-components/ZButton";
import ZReactSelect from "@/components/z-components/ZReactSelect";
import useWorkCategory from "@/hooks/api/useWorkCategory";
import useStaticData from "@/hooks/helpers/useStaticData";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { object, string, lazy, bool } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import get from "lodash.get";
import { generateYears } from "@/utils/common";

interface LaborFormProps {
    handleSubmit: (values: Record<string, any>) => void;
    defaultValues: Record<string, any>;
    handleCancel: () => void;
}

const LaborForm: FC<LaborFormProps> = ({
    defaultValues,
    handleCancel,
    ...props
}) => {
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
        category: lazy((output) =>
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
        company: string().required("Поле обязательно"),
        position: string().required("Поле обязательно"),
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

    const { optionsCategory, refetch } = useWorkCategory();
    const onSubmit = handleSubmit(props.handleSubmit);

    const currentWorking: boolean = watch("currentWorking") || false;

    const startedYear = watch("startedYear")?.value;

    const endYears = generateYears(startedYear);

    return (
        <form className="w-full" onSubmit={onSubmit}>
            <div className="w-full grid grid-cols-2 gap-x-6 gap-y-[27px]">
                <Controller
                    name="startedMonth"
                    control={control}
                    render={({ field }) => (
                        <ZReactSelect
                            label="Дата начала"
                            placeholder="Месяц"
                            options={months}
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
                    label="Наименование компании"
                    {...register("position")}
                    helperText={get(errors, "position.message") || ""}
                    hasError={Object.hasOwn(errors, "position")}
                />
                <ZTextField
                    label="Должность"
                    {...register("company")}
                    helperText={get(errors, "company.message") || ""}
                    hasError={Object.hasOwn(errors, "company")}
                />

                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <ZReactSelect
                            label="Категория"
                            options={optionsCategory}
                            {...field}
                            errors={errors}
                            refetch={refetch}
                            referenceType="WORKED_CATEGORY"
                        />
                    )}
                />
            </div>
            <div className="mt-8 border-t flex gap-4 col-span-2 pt-6 pb-2">
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

export default LaborForm;
