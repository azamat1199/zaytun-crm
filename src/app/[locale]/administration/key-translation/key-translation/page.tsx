"use client";
import ContentLayout from "@/components/layouts/ContentLayout";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import TranslationDataGrid from "./_components/TranslationDataGrid";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import { exportTranslationFile } from "@/data/translation";
import ZButton from "@/components/z-components/ZButton";
import ZContextMenu from "@/components/z-components/ZContextMenu";
import ArrowDown2 from "@/components/icons/ArrowDown2";
import ImportExcelModal from "@/app/[locale]/administration/key-translation/key-translation/_components/ImportExcelModal";
import { useState } from "react";

export default function Page() {
    const { t } = useAppTranslations();
    const [modal, setModal] = useState<"closed" | "import">("closed");

    const contextMenu = [
        {
            label: t("Импортировать"),
            value: "create_role",
            onClick: () => setModal("import"),
        },
    ];

    const handleCloseModal = () => setModal("closed");

    return (
        <>
            <ContentLayout
                title={t("Перевод текстов")}
                rightActions={
                    <ZContextMenu list={contextMenu}>
                        <span>
                            <ZButton endIcon={<ArrowDown2 />} size="md">
                                {t("Действия")}
                            </ZButton>
                        </span>
                    </ZContextMenu>
                }
            >
                <ZDataGridProvider
                    values={{
                        filter: {},
                        keyExtractor: "id",
                        exportRequest: exportTranslationFile,
                    }}
                >
                    <TranslationDataGrid />
                </ZDataGridProvider>
            </ContentLayout>
            <ImportExcelModal
                open={modal === "import"}
                handleClose={handleCloseModal}
            />
        </>
    );
}
