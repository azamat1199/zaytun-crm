import { useState } from "react";
import ZButton from "@/components/z-components/ZButton";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import { useFieldArray, useFormContext } from "react-hook-form";
import EducationModal from "./EducationModal";
import { IconButton } from "@material-tailwind/react";
import TableEdit from "@/components/icons/TableEdit";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import TableTrash from "@/components/icons/TableTrash";

const EducationDataGrid = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [modal, setModal] = useState<"create" | "delete" | "edit" | "closed">(
        "closed",
    );

    const { control } = useFormContext();

    const { fields, append, update, remove } = useFieldArray({
        control,
        name: "educations",
    });

    const columns = [
        {
            label: "Степень",
            key: "educationLevel",
            cellRender: (row) => row.educationLevel?.label,
            width: "w-[15%]",
        },
        {
            label: "Тип образования",
            key: "educationType",
            cellRender: (row) => row.educationType?.label,
            width: "w-[15%]",
        },
        {
            label: "Дата начала",
            key: "startDateEdu",
            cellRender: (row) => `${row.startedMonth}-${row.startedYear}`,
            width: "w-[15%]",
        },
        {
            label: "Дата окончания",
            key: "endDateEdu",
            cellRender: (row) =>
                row.endedYear && row.endedMonth
                    ? `${row.endedMonth}-${row.endedYear}`
                    : "",
            width: "w-[15%]",
        },
        {
            label: "Место обучения",
            key: "school",
            width: "w-[15%]",
        },
        {
            label: "Направление",
            key: "direction",
            width: "w-[15%]",
        },
        {
            label: "Специальность",
            key: "major",
            width: "w-[15%]",
        },
        {
            label: "",
            key: "major",
            width: "w-[15%]",
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

    const handleCloseModal = () => setModal("closed");

    return (
        <div className="w-full">
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
                />
            </ZDataGridProvider>
            {(modal === "create" || modal === "edit") && (
                <EducationModal
                    handleSubmit={({
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
                        if (modal === "create") {
                            append(preparedValues);
                        } else {
                            update(selectedIndex as number, preparedValues);
                            setSelectedIndex(null);
                        }

                        setModal("closed");
                    }}
                    handleClose={handleCloseModal}
                    defaultValues={
                        modal === "create"
                            ? {}
                            : {
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
                              }
                    }
                />
            )}

            <DeleteConfirmation
                subTitle="Хотите удалить образование?"
                handleCloseModal={handleCloseModal}
                handleDelete={() => {
                    remove(selectedIndex as number);
                    handleCloseModal();
                }}
                open={modal === "delete"}
                pending={false}
            />
        </div>
    );
};

export default EducationDataGrid;
