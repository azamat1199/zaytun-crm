import { CSSProperties, ReactNode } from "react";

export type DataGridColumnType<T = any> = {
    key: string;
    label?: string;
    className?: string | string[];
    headerClassName?: string;
    header?: ReactNode;
    align?: CSSProperties["textAlign"];
    cellRender?: (row: T, rowIndex: number, value: any) => ReactNode;
    type?: "first-capital-letter" | "link" | "social";
    visible?: boolean;
    truncated?: boolean;
    width?: string | number;
};
