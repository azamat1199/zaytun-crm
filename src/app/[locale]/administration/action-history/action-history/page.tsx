"use client";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import ContentLayout from "@/components/layouts/ContentLayout";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import HistoryDataGrid from "@/components/HistoryDataGrid/HistoryDataGrid";

export default function Page() {
    const { t } = useAppTranslations();
    return (
        <ContentLayout
            title={t("Журнал действий")}
            currentBreadCrumb={[
                {
                    label: "action_history",
                    path: "action_history/action_history",
                },
            ]}
        >
            <ZDataGridProvider
                values={{ filter: {}, search: "", keyExtractor: "entityId" }}
            >
                <HistoryDataGrid />
            </ZDataGridProvider>
        </ContentLayout>
    );
}
