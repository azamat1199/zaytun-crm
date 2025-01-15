"use client";
import React, { useState } from "react";
import ContentLayout from "@/components/layouts/ContentLayout";
import { TButton, SelectWithIcon } from "@zaytun/components";
import { Form, Formik } from "formik";
import FormInput from "@/components/form-input/formInput";
import { TextareaValidations } from "@/components/textarea/TextArea";

export default function Page() {
    const [handleForm, setHandleForm] = useState(false);
    return (
        <ContentLayout title="Заявки">
            <div className="">
                <Formik
                    onSubmit={(values) => console.log(values)}
                    initialValues={[]}
                    enableReinitialize={true}
                >
                    {() => (
                        <Form>
                            <div>
                                {!handleForm ? (
                                    <div className="flex flex-col gap-6 pb-6">
                                        <FormInput
                                            name="phoneNumber"
                                            label="Номер телефона *"
                                            placeholder="+998"
                                            className="max-w-[310px]"
                                        />
                                        <FormInput
                                            name="typeDul"
                                            label="Тип ДУЛ"
                                            className="max-w-[310px]"
                                        />
                                        <FormInput
                                            name="seriesDul"
                                            label="Серия ДУЛ"
                                            className="max-w-[310px]"
                                        />
                                        <FormInput
                                            name="numberDul"
                                            label="Номер ДУЛ"
                                            className="max-w-[310px]"
                                        />
                                        <FormInput
                                            name="pinfl"
                                            label="ПИНФЛ"
                                            className="max-w-[310px]"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex  gap-6 pb-6 border-b">
                                            <FormInput
                                                name="lastName"
                                                label="Фамилия"
                                                placeholder="Turaev"
                                                className="max-w-[320px] cursor-no-drop"
                                                disabled
                                            />
                                            <FormInput
                                                name="firstName"
                                                label="Имя"
                                                placeholder="Amir"
                                                className="max-w-[320px] cursor-no-drop"
                                                disabled
                                            />
                                            <FormInput
                                                name="surname"
                                                label="Отчество"
                                                placeholder="Amirovich"
                                                className="max-w-[320px] cursor-no-drop"
                                                disabled
                                            />
                                            <FormInput
                                                name="pinfl"
                                                label="ПИНФЛ"
                                                placeholder="5923658135"
                                                className="max-w-[320px] cursor-no-drop"
                                                disabled
                                            />
                                        </div>
                                        <div className="flex gap-6 pt-8">
                                            <SelectWithIcon
                                                name="opf"
                                                options={[
                                                    {
                                                        label: "133 - Частная собственность",
                                                        value: "private_property",
                                                    },
                                                    {
                                                        label: "250 - Частное предприятие",
                                                        value: "private_company",
                                                    },
                                                    {
                                                        label: "122 - ЮР.ЛИЦА",
                                                        value: "legal",
                                                    },
                                                ]}
                                                label="ОПФ"
                                                placeholder="250 - Частное предприятие"
                                            />
                                            <FormInput
                                                name="daedline"
                                                label="Крайний срок"
                                                placeholder="2 часа"
                                                className="max-w-[320px] cursor-no-drop"
                                                disabled
                                            />
                                            <FormInput
                                                name="responsibleDepartment"
                                                label="Ответственный отдел"
                                                placeholder="IT"
                                                className="max-w-[320px] cursor-no-drop"
                                                disabled
                                            />
                                        </div>
                                        <div className="pb-8 pt-8">
                                            <TextareaValidations
                                                name={"description"}
                                                rows={5}
                                                label="Описание"
                                                placeholder="Введите описание"
                                                required={false}
                                                size={"w-[600px]"}
                                                labelClassname={
                                                    "text-[#344054] text-sm font-medium"
                                                }
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="pt-6 border-t">
                                {!handleForm ? (
                                    <TButton
                                        variant="filled"
                                        bgColor={"primary"}
                                        onClick={() => setHandleForm(true)}
                                    >
                                        Далее
                                    </TButton>
                                ) : (
                                    <TButton
                                        variant="filled"
                                        bgColor={"primary"}
                                        onClick={() => setHandleForm(false)}
                                    >
                                        Создать заявку
                                    </TButton>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </ContentLayout>
    );
}
