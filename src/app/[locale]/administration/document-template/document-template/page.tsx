"use client";
import React from "react";
import ContentLayout from "@/components/layouts/ContentLayout";
import ZContextMenu from "@/components/z-components/ZContextMenu";
import Link from "next/link";
import ArrowDown2 from "@/components/icons/ArrowDown2";
import ZButton from "@/components/z-components/ZButton";
import DocumentTemplatesDataGrid from "./_components/DocumentTemplatesDataGrid";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

export default function Page() {
    const { t } = useAppTranslations();

    const contextMenu = [
        {
            label: (
                <Link href={"document-template/create"}>
                    {t("Создать шаблон документов")}
                </Link>
            ),
        },
    ];

    return (
        <ContentLayout
            title={t("Шаблоны документов")}
            rightActions={
                <>
                    <ZContextMenu list={contextMenu}>
                        <span>
                            <ZButton endIcon={<ArrowDown2 />} size="md">
                                {t("Действия")}
                            </ZButton>
                        </span>
                    </ZContextMenu>
                </>
            }
        >
            <ZDataGridProvider values={{ filter: {}, search: "" }}>
                <DocumentTemplatesDataGrid />
            </ZDataGridProvider>
        </ContentLayout>
    );
}
