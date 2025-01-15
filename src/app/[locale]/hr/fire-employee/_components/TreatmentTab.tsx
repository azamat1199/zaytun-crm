import React, { useState } from "react";
import { Form, Formik } from "formik";
import FormInput from "@/components/form-input/formInput";
import { SelectWithIcon, TButton } from "@zaytun/components";
import ZDatePicker from "@/components/z-components/FormElements/ZDatePicker/ZDatePicker";

export default function TreatmentTab() {
    const [selectState, setSelectState] = useState();
    const [handleFile, setHandleFile] = useState(false);

    const optionData = [
        {
            label: "Ташкент",
            value: "tashkent",
        },
        { label: "Fergana", value: "fergana" },
        { label: "Namangan", value: "namangan" },
    ];

    return (
        <div>
            {!handleFile ? (
                <Formik
                    initialValues={[]}
                    onSubmit={(values) => console.log(values, "values of form")}
                >
                    {() => (
                        <Form>
                            <div className="flex flex-col gap-8">
                                <div>
                                    <div className="pb-8">
                                        <p className="text-neutral-800 text-2xl font-medium">
                                            Оргструктура
                                        </p>
                                    </div>
                                    <div className="flex gap-8 items-center flex-wrap">
                                        <FormInput
                                            label="Офис продаж"
                                            variant="outlined"
                                            placeholder="ДИТ"
                                            name="division"
                                            className="max-w-[310px]"
                                            disabled
                                        />
                                        <FormInput
                                            name="department"
                                            label="Отдел и сектор"
                                            placeholder="Проектный офис"
                                            className="max-w-[310px]"
                                            disabled
                                        />
                                        <FormInput
                                            label="Должность"
                                            variant="outlined"
                                            placeholder="-"
                                            name="department"
                                            className="max-w-[310px]"
                                            type="text"
                                            disabled
                                        />
                                        <FormInput
                                            name="sector"
                                            label="Разряд"
                                            placeholder="-"
                                            className="max-w-[310px]"
                                            disabled
                                        />
                                        <FormInput
                                            name="pnfl"
                                            label="ПИНФЛ"
                                            placeholder="Менеджер проекта"
                                            className="max-w-[310px]"
                                            disabled
                                        />
                                        <ZDatePicker
                                            label="Дата рождения"
                                            placeholder={"15 / 02 / 1990"}
                                            className={"w-[310px]"}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="border-b">
                                    <div className="pb-8">
                                        <p className="text-neutral-800 text-2xl font-medium">
                                            Общие сведения
                                        </p>
                                    </div>
                                    <div className="flex gap-8 items-end pb-8">
                                        <ZDatePicker
                                            label="Дата принятия на работу"
                                            placeholder={"15 / 02 / 1990"}
                                            className={"w-[310px]"}
                                        />
                                        <ZDatePicker
                                            label="Дата увольнения"
                                            placeholder={"15 / 02 / 1990"}
                                            className={"w-[310px]"}
                                        />
                                        <FormInput
                                            label="Компенсация за неиспользованный трудовой отпуск"
                                            variant="outlined"
                                            placeholder=""
                                            name="compensation"
                                        />
                                    </div>
                                </div>
                                <div className="border-b">
                                    <div className="pb-8">
                                        <p className="text-neutral-800 text-2xl font-medium">
                                            Основание
                                        </p>
                                    </div>
                                    <div className="pb-8 flex gap-8 items-end">
                                        <SelectWithIcon
                                            name="property"
                                            options={[
                                                {
                                                    label: "Cт.157 ТК РУз - По соглашению сторон",
                                                    value: "first",
                                                },
                                                {
                                                    label: "Cт.158 ТК РУз - Прекашение срочного",
                                                    value: "second",
                                                },
                                                {
                                                    label: "Cт.160 ТК  РУз - По инициативе работника",
                                                    value: "third",
                                                },
                                                {
                                                    label: "Cт.161 ТК  РУз - По соглашению работодателя",
                                                    value: "four",
                                                },
                                            ]}
                                            // label="Форма собственности"
                                            placeholder="Cт.160 ТК РУз - По инициативе сторон"
                                            onChange={(val) =>
                                                setSelectState(val)
                                            }
                                        />
                                        {(selectState?.value === "first" ||
                                            selectState?.value === "second" ||
                                            selectState?.value === "third" ||
                                            selectState?.value === "four") && (
                                            <FormInput
                                                label="П.1"
                                                variant="outlined"
                                                name="p_one"
                                                className="max-w-[310px]"
                                            />
                                        )}
                                    </div>
                                </div>
                                {selectState?.value === "four" && (
                                    <div className="border-b">
                                        <div className="flex gap-8 pb-8 flex-wrap items-end">
                                            <FormInput
                                                label="П.1 - Ликвидация организации"
                                                variant="outlined"
                                                name="liquidation"
                                                className="max-w-[310px]"
                                            />
                                            <SelectWithIcon
                                                name="layoff"
                                                options={optionData}
                                                label="П.2 - Изменение (сокрашение) штата"
                                                placeholder=""
                                                onChange={(val) =>
                                                    console.log(val)
                                                }
                                                className="max-w-[310px]"
                                            />
                                            <SelectWithIcon
                                                name="non_compliance"
                                                options={optionData}
                                                label="П.3 - Несоответствие работника"
                                                placeholder=""
                                                onChange={(val) =>
                                                    console.log(val)
                                                }
                                                className="max-w-[310px]"
                                            />
                                            <SelectWithIcon
                                                name="systematic_violation"
                                                options={optionData}
                                                label="П.4 - Систематическое нарушение трудовых обязанностей"
                                                placeholder=""
                                                onChange={(val) =>
                                                    console.log(val)
                                                }
                                                className="max-w-[310px]"
                                            />
                                            <SelectWithIcon
                                                name="gross_violation"
                                                options={optionData}
                                                label="П.5 - Грубое нарушение трудовых обязанностей"
                                                placeholder=""
                                                onChange={(val) =>
                                                    console.log(val)
                                                }
                                                className="max-w-[310px]"
                                            />
                                            <FormInput
                                                label="П.6 - Другие причины"
                                                variant="outlined"
                                                name="reason"
                                                className="max-w-[310px]"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div>
                                    {/* {(selectState?.value === "first" ||
                                        selectState?.value === "second" ||
                                        selectState?.value === "third" ||
                                        selectState?.value === "four") && (
                                        <FileInputv2
                                            label="Скачать"
                                            id="image"
                                            onChange={(image) =>
                                                console.log(image)
                                            }
                                        />
                                    )} */}
                                </div>
                                {/* <div>*/}
                                {/*  <TButton*/}
                                {/*    variant="filled"*/}
                                {/*    bgColor={'primary'}*/}
                                {/*    className="min-w-[200px]"*/}
                                {/*    onClick={() => setHandleFile(true)}*/}
                                {/*  >*/}
                                {/*    Далее*/}
                                {/*  </TButton>*/}
                                {/* </div>*/}
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <div>
                    <div className="pb-6">
                        {/* <FileInputv2
                            label="Загрузить документы"
                            id="image"
                            onChange={(image) => console.log(image)}
                        /> */}
                    </div>
                    <div className="">
                        <TButton
                            variant="filled"
                            bgColor={"primary"}
                            className="min-w-[200px]"
                            onClick={() => setHandleFile(false)}
                        >
                            Далее
                        </TButton>
                    </div>
                </div>
            )}
        </div>
    );
}
