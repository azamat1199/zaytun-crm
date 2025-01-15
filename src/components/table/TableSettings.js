import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Reorder } from "framer-motion";
import DragIcon from "../icons/drag-icon";
import { Checkbox } from "../checkbox/Checkbox";
import { TButton } from "../button/Button";

const TableSettings = ({ calcelBtn, settingData }) => {
    const [initialValues, setInitialValues] = useState([]);

    useEffect(() => {
        setInitialValues(() => {
            const newArr = [];

            settingData.forEach((item) => {
                const key = item.field;
                newArr.push({
                    key,
                    active: false,
                });
            });

            return newArr;
        });
    }, [settingData]);

    return (
        <div className="relative top-12 right-80">
            <Formik
                initialValues={{
                    columns: initialValues,
                }}
                enableReinitialize
                onSubmit={async (values) => {
                
                    // console.log(values, 'all data');
                }}
            >
                {({ values, setFieldValue }) =>
                    values && (
                        <Form>
                            <Reorder.Group
                                axis="y"
                                onReorder={(items) => {
                                    setFieldValue("columns", items);
                                }}
                                values={values.columns}
                                className="absolute w-80
                z-10 p-6 bg-white
                rounded-xl shadow-md"
                            >
                                <h4 className="pb-5 text-gray-900 font-semibold text-lg">
                                    Настройки таблицы
                                </h4>
                                {values.columns?.map((item, i) => {
                                    return (
                                        item !== "actions" && (
                                            <Reorder.Item
                                                key={item.key}
                                                value={item}
                                                className="flex items-center"
                                            >
                                                <DragIcon
                                                    className={"cursor-pointer"}
                                                />
                                                <Checkbox
                                                    name={`columns.${i}.active`}
                                                    value={
                                                        values.columns[i].active
                                                    }
                                                    type="checkbox"
                                                />
                                                <p
                                                    className="font-medium
                          text-sm
                          text-gray-700
                          font-sans"
                                                >
                                                    {item.key}
                                                </p>
                                            </Reorder.Item>
                                        )
                                    );
                                })}
                                <div className="flex gap-3 pt-8">
                                    <TButton
                                        onClick={calcelBtn}
                                        className={"text-red-500"}
                                        fullWidth={true}
                                        size="lg"
                                    >
                                        Сброс
                                    </TButton>
                                    <TButton
                                        className={"bg-primary text-white"}
                                        fullWidth={true}
                                        type={"submit"}
                                    >
                                        Сохранить
                                    </TButton>
                                </div>
                            </Reorder.Group>
                            {/* <Reorder.Group axis="y" onReorder={setItems} values={items}>
              {items.map((item) => (
                <div key={item}  >
                  {item}
                </div>
              ))}
            </Reorder.Group> */}
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
};

export default TableSettings;
