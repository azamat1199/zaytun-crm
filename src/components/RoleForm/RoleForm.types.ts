export type ColumnType = {
    expanded: boolean;
    prev: number | null;
    next: number | null;
    content: Record<string, ContentType>;
};

export type ContentType = {
    title: string;
    items: Record<string, ItemType>;
};

export type ItemType = {
    id: string;
    title: string;
    type: "module" | "sub-module" | "page" | "tab" | "permission";
    end?: boolean;
};

export type StructurePrimaryObject = {
    colIndex: number;
    contentIndex: number;
    itemIndex: number;
};
