"use client";
import React from "react";
import ContentLayout from "@/components/layouts/ContentLayout";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import ConfigProcessDataGrid from "./_components/ConfigProcessDataGrid";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

export default function Page() {
    const { t } = useAppTranslations();

    return (
        <ContentLayout
            title={t("Конфигурации процесса")}
            currentBreadCrumb={[]}
        >
            <ZDataGridProvider
                values={{ filter: {}, search: "", keyExtractor: "id" }}
            >
                <ConfigProcessDataGrid />
            </ZDataGridProvider>
        </ContentLayout>
    );
}
