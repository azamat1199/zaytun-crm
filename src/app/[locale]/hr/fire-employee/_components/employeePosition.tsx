import FormInput from "@/components/form-input/formInput";
import DownloadIcon from "@/components/icons/DownloadIcon";
import { EyeIcon } from "@/components/icons/eye-icon";
import { separateDateTime } from "@/utils/dateUtils";
import { Modal, SelectWithIcon, SimpleTable } from "@zaytun/components";
import { Form, Formik } from "formik";
import { useState } from "react";

export default function EmployeePosition() {
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
                                        Должность сотрудника
                                    </p>
                                </div>
                                <div className="flex gap-8 items-center flex-wrap">
                                    <SelectWithIcon
                                        name="department_select"
                                        options={optionData}
                                        label="Департамент"
                                        width={652}
                                        disabled
                                        onChange={(val) => console.log(val)}
                                    />
                                    <SelectWithIcon
                                        name="control_select"
                                        options={optionData}
                                        label="Управление"
                                        disabled
                                        width={310}
                                        onChange={(val) => console.log(val)}
                                    />
                                    <SelectWithIcon
                                        name="division_select"
                                        options={optionData}
                                        label="Отдел"
                                        width={310}
                                        disabled
                                        onChange={(val) => console.log(val)}
                                    />
                                    <SelectWithIcon
                                        name="sector_select"
                                        options={optionData}
                                        label="Сектор"
                                        width={310}
                                        disabled
                                        onChange={(val) => console.log(val)}
                                    />
                                    <SelectWithIcon
                                        name="job_title_select"
                                        options={optionData}
                                        label="Должность"
                                        width={310}
                                        disabled
                                        onChange={(val) => console.log(val)}
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
                                        label="Оклад"
                                        placeholder="Менеджер проекта"
                                        className="max-w-[310px]"
                                        disabled
                                        inputProps={{ rightText: "USD" }}
                                    />
                                    <FormInput
                                        name="arch"
                                        label="Сумма к получению"
                                        placeholder="Менеджер проекта"
                                        className="max-w-[310px]"
                                        disabled
                                        inputProps={{ rightText: "USD" }}
                                    />
                                    <FormInput
                                        name="pnfl"
                                        label="Надбавка к окладу"
                                        placeholder="Менеджер проекта"
                                        className="max-w-[310px]"
                                        disabled
                                        inputProps={{ rightText: "%" }}
                                    />
                                </div>
                            </div>
                            <div className="pb-0">
                                <p
                                    className="text-neutral-800
                    text-2xl font-sans font-medium"
                                >
                                    Основание
                                </p>
                            </div>
                            <SimpleTable columns={column} list={listData} />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
