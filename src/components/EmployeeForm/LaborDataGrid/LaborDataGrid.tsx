import TableEdit from "@/components/icons/TableEdit";
import ZButton from "@/components/z-components/ZButton";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import { IconButton } from "@material-tailwind/react";
import React, { useState, FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import TableTrash from "@/components/icons/TableTrash";
import LaborModal from "./LaborModal";
import DeleteConfirmation from "@/components/DeleteConfirmation";

interface LaborDataGridProps {
    readonly?: boolean;
}

const LaborDataGrid: FC<LaborDataGridProps> = ({ readonly = false }) => {
    const [modal, setModal] = useState<"create" | "delete" | "edit" | "closed">(
        "closed",
    );
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const { control } = useFormContext();

    const { fields, append, update, remove } = useFieldArray({
        control,
        name: "experiences",
    });

    const handleClose = () => setModal("closed");

    const columns = [
        {
            label: "Дата начала",
            key: "startedMonth",
            width: "w-[15%]",
            cellRender: (row: any) => `${row.startedMonth}-${row.startedYear}`,
        },
        {
            label: "Дата окончания",
            key: "",
            width: "w-[15%]",
            cellRender: (row: any) =>
                row.endedYear && row.endedMonth
                    ? `${row.endedMonth}-${row.endedYear}`
                    : "",
        },
        {
            label: "Наименование компании",
            key: "company",
            width: !readonly ? "w-[25%]" : "w-[30%]",
        },
        {
            label: "Должность",
            key: "position",
            width: !readonly ? "w-[25%]" : "w-[30%]",
        },
        {
            label: "Категория",
            key: "category",
            width: "w-[15%]",
            cellRender: (row: any) => row.category.label,
        },
        !readonly && {
            label: "",
            key: "major",
            width: "w-[10%]",
            className: "ml-auto",
            cellRender: (_row: any, rowIndex: number) => (
                <div className="flex flex-row items-center">
                    <IconButton
                        placeholder=""
                        variant="text"
                        onClick={() => {
                            setSelectedIndex(rowIndex);
                            setModal("edit");
                        }}
                    >
                        <TableEdit size="lg" />
                    </IconButton>
                    <IconButton
                        placeholder=""
                        variant="text"
                        onClick={() => {
                            setSelectedIndex(rowIndex);
                            setModal("delete");
                        }}
                    >
                        <TableTrash
                            size="lg"
                            className="[&_path]:stroke-error-500"
                        />
                    </IconButton>
                </div>
            ),
        },
    ];

    const handleAppend = ({
        endedYear,
        endedMonth,
        ...values
    }: Record<string, any>) => {
        const preparedValues = {
            ...values,
            startedYear: values.startedYear?.value,
            startedMonth: values.startedMonth?.value,
            ...(!values.currentWorking && {
                endedYear: endedYear?.value,
                endedMonth: endedMonth?.value,
            }),
        };

        append(preparedValues);
        handleClose();
    };

    const handleUpdate = ({
        endedYear,
        endedMonth,
        ...values
    }: Record<string, any>) => {
        const preparedValues = {
            ...values,
            startedYear: values.startedYear?.value,
            startedMonth: values.startedMonth?.value,
            ...(!values.currentWorking && {
                endedYear: endedYear?.value,
                endedMonth: endedMonth?.value,
            }),
        };

        update(selectedIndex as number, preparedValues);
        handleClose();
    };

    return (
        <>
            <ZDataGridProvider values={{ filter: {} }}>
                <div className="flex justify-end items-center mb-3">
                    <ZButton
                        type="button"
                        size="md"
                        onClick={() => setModal("create")}
                    >
                        Добавить
                    </ZButton>
                </div>
                <ZDataGrid
                    columns={columns}
                    rows={fields}
                    hasExport={false}
                    hasCheckbox={false}
                    hasFilter={false}
                    hasSearch={false}
                    hasSettings={false}
                    hasActions={false}
                    buttonKey={""}
                    pagination={{
                        totalPages: undefined,
                        defaultPage: undefined,
                    }}
                />
            </ZDataGridProvider>

            {modal === "create" && (
                <LaborModal
                    handleClose={handleClose}
                    handleSubmit={handleAppend}
                />
            )}

            <DeleteConfirmation
                subTitle="Хотите удалить образование?"
                handleCloseModal={handleClose}
                handleDelete={() => {
                    remove(selectedIndex as number);
                    handleClose();
                }}
                open={modal === "delete"}
                pending={false}
            />

            {modal === "edit" && typeof selectedIndex === "number" && (
                <LaborModal
                    handleClose={handleClose}
                    handleSubmit={handleUpdate}
                    defaultValues={{
                        ...fields[selectedIndex],
                        startedMonth: {
                            label: fields[selectedIndex].startedMonth,
                            value: fields[selectedIndex].startedMonth,
                        },
                        startedYear: {
                            label: fields[selectedIndex].startedYear,
                            value: fields[selectedIndex].startedYear,
                        },
                        endedMonth: {
                            label: fields[selectedIndex].endedMonth,
                            value: fields[selectedIndex].endedMonth,
                        },
                        endedYear: {
                            label: fields[selectedIndex].endedYear,
                            value: fields[selectedIndex].endedYear,
                        },
                    }}
                />
            )}
        </>
    );
};

export default LaborDataGrid;
