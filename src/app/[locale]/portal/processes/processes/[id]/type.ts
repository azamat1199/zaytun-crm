export interface CreatedData {
    created_time: string;
    created_date: string;
}

export interface TaskRowData {
    taskTemplate: any;
    priority: string;
    updatedAt: string;
    lastNameLat: string;
    firstNameLat: string;
    assignedEmployee: any;
    uniqueNumber: string;
    created_data: CreatedData;
    createdAt: string;
    id: string;
    taskName: string;
    responsible: string;
    deadline: string;
    taskPriority: string;
    sla: string;
    status: string;
    action?: React.ReactNode;
}

export interface TaskColumn {
    label: React.ReactNode;
    key: keyof TaskRowData;
    headerClassName: string;
    cellRender?: (row: TaskRowData) => React.ReactNode;
}

export interface HistoryRowData {
    created_data: CreatedData;
    act: string;
    action?: React.ReactNode;
}
export interface HistoryColumn {
    label: React.ReactNode;
    key: keyof HistoryRowData;
    headerClassName: string;
    renderCell?: (row: HistoryRowData) => React.ReactNode;
}
