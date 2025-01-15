"use client";
import React from "react";
import { TButton } from "@zaytun/components";
import ContentLayout from "@/components/layouts/ContentLayout";
import EmployeeList from "../../staffs/staffs/_components/EmployeeList";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import ZContextMenu from "@/components/z-components/ZContextMenu";
import { useRouter } from "next/navigation";
import ArrowDown2 from "@/components/icons/ArrowDown2";
import ZButton from "@/components/z-components/ZButton";
import useAppLocale from "@/hooks/helpers/useAppLocale";

export default function StaffsPage() {
    const router = useRouter();
    const locale = useAppLocale();

    const listData = [
        {
            label: "Создать сотрудника",
            value: "create_employee",
            onClick: () => {
                router.push(`/${locale}/hr/staffs/staffs/create`);
            },
        },
    ];

    return (
        <ZDataGridProvider values={{ filter: {}, keyExtractor: "id" }}>
            <ContentLayout
                title="Сотрудники"
                rightActions={
                    <div className="flex gap-6 items-center">
                        <TButton variant="outlined">Шаблоны документов</TButton>
                        <ZContextMenu list={listData}>
                            <span>
                                <ZButton endIcon={<ArrowDown2 />} size="md">
                                    Действия
                                </ZButton>
                            </span>
                        </ZContextMenu>
                    </div>
                }
                currentBreadCrumb={[{ label: "staffs", path: "staffs/staffs" }]}
            >
                <EmployeeList />
            </ContentLayout>
        </ZDataGridProvider>
    );
}
