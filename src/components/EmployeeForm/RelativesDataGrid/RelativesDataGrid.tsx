import TableEdit from "@/components/icons/TableEdit";
import ZButton from "@/components/z-components/ZButton";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import { IconButton } from "@material-tailwind/react";
import React, { useState, FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import TableTrash from "@/components/icons/TableTrash";
import RelativesModal from "./RelativesModal";
import DeleteConfirmation from "@/components/DeleteConfirmation";

interface RelativesDataGridProps {
    readonly?: boolean;
}

const RelativesDataGrid: FC<RelativesDataGridProps> = ({
    readonly = false,
}) => {
    const [modal, setModal] = useState<"create" | "delete" | "edit" | "closed">(
        "closed",
    );
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const { control } = useFormContext();

    const { fields, append, update, remove } = useFieldArray({
        control,
        name: "relatives",
    });

    const handleClose = () => setModal("closed");

    const columns = [
        {
            label: "Степень родства",
            key: "startedMonth",
            cellRender: (row) => (
                <span className="font-medium text-c_neutral-800">
                    {row.relativeType?.label}
                </span>
            ),
            width: "w-[20%]",
        },
        {
            label: "ФИО",
            key: "fullName",
            cellRender: (row) => row.fullName,
            width: "w-[15%]",
        },
        {
            label: "Дата и место рождения",
            key: "birthDate",
            cellRender: (row) => (
                <div className="flex flex-col">
                    <span>{row.birthDate}</span>
                    <span>{row.birthPlace}</span>
                </div>
            ),
            width: "w-[25%]",
        },
        {
            label: "Место работы/должность",
            key: "workPlace",
            width: !readonly ? "w-[25%]" : "w-[30%]",
            cellRender: (row: any) => (
                <div className="flex flex-col">
                    <span>{row.workPlace}</span>
                    <span>{row.position}</span>
                </div>
            ),
        },
        {
            label: "Место жительство",
            key: "actualAddress",
            width: !readonly ? "w-[15%]" : "w-[20%]",
            cellRender: (row) => row.birthCountry?.label,
        },
        !readonly && {
            label: "",
            key: "actualAddress",
            width: "w-[10%]",
            className: "ml-auto",
            cellRender: (row, rowIndex: number) => (
                <div className="flex flex-row items-center">
                    <IconButton
                        variant="text"
                        onClick={() => {
                            setSelectedIndex(rowIndex);
                            setModal("edit");
                        }}
                    >
                        <TableEdit size="lg" />
                    </IconButton>
                    <IconButton
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

    const handleAppend = (values: Record<string, any>) => {
        append(values);
        handleClose();
    };

    const handleUpdate = (values: Record<string, any>) => {
        update(selectedIndex as number, values);
        handleClose();
    };

    return (
        <>
            <ZDataGridProvider values={{ filter: {} }}>
                <div className="flex justify-end items-center mb-3">
                    {!readonly && (
                        <ZButton
                            type="button"
                            size="md"
                            onClick={() => setModal("create")}
                        >
                            Добавить
                        </ZButton>
                    )}
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
                <RelativesModal
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
                <RelativesModal
                    handleClose={handleClose}
                    handleSubmit={handleUpdate}
                    defaultValues={fields[selectedIndex]}
                />
            )}
        </>
    );
};

export default RelativesDataGrid;
