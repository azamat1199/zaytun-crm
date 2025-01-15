import HistoryDataGrid from "@/components/HistoryDataGrid";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import { useParams } from "next/navigation";
import React from "react";

const HistoryTab = () => {
    const { id } = useParams();
    return (
        <ZDataGridProvider values={{ filter: {}, search: "" }}>
            <HistoryDataGrid
                dataGridProps={{ buttons: [], scrollable: true }}
                entityId={id as string}
                entityName="ProcessSetting"
            />
        </ZDataGridProvider>
    );
};

export default HistoryTab;
