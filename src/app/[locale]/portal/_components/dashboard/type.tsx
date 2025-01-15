export interface CreatedData {
    created_time: string;
    created_date: string;
}

export interface RowData {
    created_data: CreatedData;
    id: string;
    taskName: string;
    process: string;
    responsible: string;
    deadline: string;
    taskPriority: string;
    sla: string;
    status: string;
    action?: React.ReactNode;
}

export interface Column {
    headerName: React.ReactNode;
    field: keyof RowData;
    width: number;
    renderCell?: (row: RowData) => React.ReactNode;
}

export interface ActivityRowData {
    created_data: CreatedData;
    login: string;
    ip: string;
    macAddress: string;
    act: string;
    action?: React.ReactNode;
}

export interface ActivityColumn {
    headerName: React.ReactNode;
    field: keyof ActivityRowData;
    width: number;
    renderCell?: (row: RowData) => React.ReactNode;
}
