import { createContext } from "react";
import useStructure from "./_hooks/useStructure";
import { StructureColumnType } from "./structure.types";

type UseStructureReturnType = ReturnType<typeof useStructure>;

export type StructureContextType = {
    handleAdd: ({
        colIndex,
        contentIndex,
        type,
    }: {
        colIndex: number;
        contentIndex: number;
        type: StructureColumnType["type"];
    }) => void;
    toggleActiveItems: UseStructureReturnType["toggleActiveItems"];
    columnStaticValues: UseStructureReturnType["columnStaticValues"];
    activeItems: UseStructureReturnType["activeItems"];
    deleteFuncs: UseStructureReturnType["deleteFuncs"];
    modal: any;
    setModal: any;
};

const StructureContext = createContext<StructureContextType | null>(null);

export default StructureContext;
