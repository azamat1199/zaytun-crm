export interface StructureColumnType {
    title: string;
    id: string;
    items: Array<ColumnItemType>;
    type: "branch" | "employment" | "committee" | "department" | "structure";
}

export interface StructureColItemSettingsType {
    hasEmployment: boolean;
    hasDepartment: boolean;
    hasBranch: boolean;
    hasCommittee: boolean;
}

export interface ColumnItemType extends Partial<StructureColItemSettingsType> {
    id: string;
    title: string;
    contentType: StructureColumnType["type"];
}

export type StructureOptions = StructureColumnType["type"];

export type StructureDataType = Record<
    string,
    {
        expanded: boolean;
        content: StructureColumnType[];
        prev: number | null;
        next: number | null;
    }
>;

export type ColSettingsType = {
    type: StructureOptions;
    validationSchema?: any;
    getChildren: (item: ColumnItemType) => Promise<void>;
    form: Record<
        "add" | "update",
        {
            title: string;
            pending: boolean;
            submit: (
                values: any,
                contentType: StructureOptions,
                itemId?: string,
            ) => void;
            initialValues?: any;
        }
    >;
};

export interface ColumnItemComponentProps extends ColumnItemType {
    colIndex: number;
    contentIndex: number;
    index: number;
    contentType: StructureColumnType["type"];
    columnExpanded: boolean;
    loading?: boolean;
}
