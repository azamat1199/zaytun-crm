import FormInput from "@/components/form-input/formInput";
import DownloadIcon from "@/components/icons/DownloadIcon";
import { EyeIcon } from "@/components/icons/eye-icon";
import ZDatePicker from "@/components/z-components/FormElements/ZDatePicker/ZDatePicker";
import { separateDateTime } from "@/utils/dateUtils";
import { Modal, SelectWithIcon, SimpleTable } from "@zaytun/components";
import { Form, Formik } from "formik";
import { useState } from "react";

export default function CheckingData() {
    const [selectState, setSelectState] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    // Accessing the pathname

    const optionData = [
        {
            label: "Ташкент",
            value: "tashkent",
        },
        { label: "Fergana", value: "fergana" },
        { label: "Namangan", value: "namangan" },
    ];
    const column = [
        {
            headerName: "Дата создания",
            field: "createdAt",
            width: 267,
            renderCell: (row) => (
                <div>
                    <p>{separateDateTime(row?.createdAt).date}</p>
                    <p>{separateDateTime(row?.createdAt).second}</p>
                </div>
            ),
        },
        {
            headerName: "Название документа",
            field: "namingBank",
            width: 267,
            renderCell: (row) => (
                <div className="flex flex-col">
                    <span>{row.namingBank.name}</span>
                    <span>{row.namingBank.branch}</span>
                </div>
            ),
        },
        {
            headerName: "Кем создан",
            field: "accountNumber",
            width: 267,
        },
        {
            headerName: "",
            field: "currency",
            width: 267,
            renderCell: () => (
                <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => setModalVisible(true)}
                >
                    <EyeIcon color={"#039855"} />
                    <p className={"text-primary underline"}>Посмотреть</p>
                </div>
            ),
        },
        {
            headerName: "",
            field: "type",
            width: 80,
            renderCell: () => (
                <div
                    className="flex items-center border-2 justify-around
           p-2 pl-1 pr-1 rounded-md cursor-pointer"
                    onClick={() => console.log("download file")}
                >
                    <DownloadIcon size={"md"} />
                </div>
            ),
        },
    ];
    const listData = [
        {
            id: 1,
            createdAt: "12.09.2023 09:14:28",
            namingBank: {
                name: "АКБ Капиталбанк",
                branch: "Ф-л Яшнобод",
            },
            accountNumber: "226180001000052100107",
            currency: "USD",
            type: "Валютный",
        },
        {
            id: 2,
            createdAt: "12.09.2022 12:14:28",
            namingBank: {
                name: "АКБ Капиталбанк",
                branch: "Ф-л Яшнобод",
            },
            accountNumber: "226680001000052100107",
            currency: "USD",
            type: "Сумовой",
        },
    ];
    return (
        <div>
            <Formik
                initialValues={[]}
                onSubmit={(values) => console.log(values, "values of form")}
            >
                {() => (
                    <Form>
                        <Modal
                            open={modalVisible}
                            size={"lg"}
                            onHandleChange={() =>
                                setModalVisible((prev) => !prev)
                            }
                        >
                            <div>Children</div>
                        </Modal>
                        <div className="flex flex-col gap-8">
                            <div className={"border-b mb-2 pb-8"}>
                                <p
                                    className={
                                        "text-primary text-2xl font-medium underline"
                                    }
                                >
                                    TURAEV AMIR TURAEVICH
                                </p>
                            </div>
                            <div>
                                <div className="pb-8">
                                    <p
                                        className="text-neutral-800 text-xl
                    font-sans font-medium"
                                    >
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
                                    <p
                                        className="text-neutral-800
                     text-2xl font-sans font-medium"
                                    >
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
                                    <p
                                        className="text-neutral-800
                    text-2xl font-sans font-medium"
                                    >
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
                                        onChange={(val) => setSelectState(val)}
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
                                            onChange={(val) => console.log(val)}
                                            className="max-w-[310px]"
                                        />
                                        <SelectWithIcon
                                            name="non_compliance"
                                            options={optionData}
                                            label="П.3 - Несоответствие работника"
                                            placeholder=""
                                            onChange={(val) => console.log(val)}
                                            className="max-w-[310px]"
                                        />
                                        <SelectWithIcon
                                            name="systematic_violation"
                                            options={optionData}
                                            label="П.4 - Систематическое нарушение
                        трудовых обязанностей"
                                            placeholder=""
                                            onChange={(val) => console.log(val)}
                                            className="max-w-[310px]"
                                        />
                                        <SelectWithIcon
                                            name="gross_violation"
                                            options={optionData}
                                            label="П.5 - Грубое нарушение трудовых обязанностей"
                                            placeholder=""
                                            onChange={(val) => console.log(val)}
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
                            <SimpleTable columns={column} list={listData} />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
