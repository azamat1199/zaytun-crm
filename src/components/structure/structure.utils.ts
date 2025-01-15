import { StructureColumnType } from "./structure.types";

export const STRUCTURE_SEPARATOR = "/";
export const extractIds = (key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [colIndex, _, itemId, contentType] = key.split(STRUCTURE_SEPARATOR);

    return {
        colIndex: Number(colIndex),
        contentIndex: Number(colIndex),
        itemId,
        contentType: contentType as StructureColumnType["type"],
    };
};

export const getItemIdByColIndex = (
    colIndex: number,
    activeItems: Record<string, boolean>,
) => {
    const [key] = Object.entries(activeItems).find(
        ([key, value]) =>
            key.startsWith(`${colIndex}${STRUCTURE_SEPARATOR}`) && value,
    ) || ["", ""];

    if (!key) {
        return {
            colIndex: null,
            contentIndex: null,
            itemId: null,
            contentType: null,
        };
    }

    return extractIds(key);
};

export const createStructureItemKey = ({
    colIndex,
    contentIndex,
    itemId,
    contentType,
}: {
    colIndex: number;
    contentIndex: number;
    itemId: string;
    contentType: StructureColumnType["type"];
}) =>
    `${colIndex}${STRUCTURE_SEPARATOR}${contentIndex}${STRUCTURE_SEPARATOR}${itemId}${STRUCTURE_SEPARATOR}${contentType}`;

export const DEFAULT_STRUCTURE_CONTENT_VALUES = {
    hasEmployment: false,
    hasDepartment: false,
    hasBranch: false,
    hasCommittee: false,
};
