"use client";
import React from "react";
import ContentLayout from "@/components/layouts/ContentLayout";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import RoleDataGrid from "./_components/RoleDataGrid";
import ZContextMenu from "@/components/z-components/ZContextMenu";
import ZButton from "@/components/z-components/ZButton";
import { usePathname, useRouter } from "next/navigation";
import ArrowDown2 from "@/components/icons/ArrowDown2";
import useAppLocale from "@/hooks/helpers/useAppLocale";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

export default function Page() {
    const { t } = useAppTranslations();
    const pathname = usePathname();
    const locale = useAppLocale();
    const router = useRouter();

    const listData = [
        {
            label: t("Создать роль"),
            value: "create_role",
            onClick: () => {
                router.push(`${pathname}/create`);
            },
        },
        {
            label: t("Создать структуру"),
            value: "create_structure",
            onClick: () => {
                router.push(`/${locale}/hr/structure/structure`);
            },
        },
    ];
    const currentBreadCrumbs = [{ label: "role", path: "role/role" }];
    return (
        <ContentLayout
            title="Роли"
            rightActions={
                <ZContextMenu list={listData}>
                    <span>
                        <ZButton endIcon={<ArrowDown2 />} size="md">
                            {t("Действия")}
                        </ZButton>
                    </span>
                </ZContextMenu>
            }
            currentBreadCrumb={currentBreadCrumbs}
        >
            <ZDataGridProvider
                values={{
                    filter: {},
                    keyExtractor: "id",
                }}
            >
                <RoleDataGrid />
            </ZDataGridProvider>
        </ContentLayout>
    );
}
