import { FC, useCallback } from "react";
import XScrollableDiv from "../XScrollableDiv";
import Column from "./Column";
import DeleteConfirmation from "./DeleteConfirmation";
import EmployeeCard from "./EmployeeCard";
import FormModals from "./FormModals";
import StructureContext, { StructureContextType } from "./StructureContext";
import useStructure from "./_hooks/useStructure";

interface StructureProps {}

const Structure: FC<StructureProps> = () => {
    const {
        columnStaticValues,
        data,
        setData,
        modal,
        setModal,
        toggleActiveItems,
        activeItems,
        deleteFuncs,
        handleCloseModal,
        employeeCard,
    } = useStructure();

    const handleAdd = useCallback(
        ({
            colIndex,
            contentIndex,
            type,
            itemId,
        }: Parameters<StructureContextType["handleAdd"]>[0] & {
            itemId: string;
        }) => {
            setModal({
                colIndex,
                contentIndex,
                type,
                action: "add",
                itemId,
            });
        },
        [],
    );

    const toggleExpand = useCallback(
        (colIndex: number) => {
            const newData = { ...data };

            data[colIndex].expanded = !data[colIndex].expanded;
            setData(newData);
        },
        [data],
    );

    return (
        <StructureContext.Provider
            value={{
                handleAdd,
                deleteFuncs,
                columnStaticValues,
                toggleActiveItems,
                activeItems,
                modal,
                setModal,
            }}
        >
            <XScrollableDiv
                // style={{ width: `${width}px` }}
                style={{ flexShrink: 0 }}
                className="flex overflow-x-auto h-full w-full border rounded-md border-neutral-300"
                enableVelocity={false}
            >
                {Object.values(data).map(
                    ({ content, expanded, next, loading }, i) => (
                        <Column
                            next={next}
                            index={i}
                            content={content}
                            key={i}
                            expanded={expanded}
                            toggleExpand={toggleExpand}
                            loading={loading}
                        />
                    ),
                )}
                {employeeCard.open && <EmployeeCard {...employeeCard.item} />}
            </XScrollableDiv>
            {modal.type !== null &&
                modal.colIndex !== null &&
                modal.contentIndex !== null &&
                modal.action === "add" && (
                    <FormModals {...modal} handleClose={handleCloseModal} />
                )}

            {modal.type !== null &&
                modal.colIndex !== null &&
                modal.contentIndex !== null &&
                modal.action === "update" && (
                    <FormModals {...modal} handleClose={handleCloseModal} />
                )}

            <DeleteConfirmation handleCloseModal={handleCloseModal} />
        </StructureContext.Provider>
    );
};

export default Structure;
