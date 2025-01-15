"use client";
import ArrowDown2 from "@/components/icons/ArrowDown2";
import ContentLayout from "@/components/layouts/ContentLayout";
import ZButton from "@/components/z-components/ZButton";
import ZContextMenu from "@/components/z-components/ZContextMenu";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import { useParams, usePathname, useRouter } from "next/navigation";
import useGetProcessTemplateById from "@/hooks/api/useGetProcessTemplateById";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import { UnderlineTabs } from "@zaytun/components";
import { startTransition } from "react";
import useQueryString from "@/hooks/helpers/useQueryString";
import ProcessConfigCard from "./_components/ProcessConfigCard";
import dynamic from "next/dynamic";

const TasksTab = dynamic(() => import("./_components/TasksTab"));
const ProcessAccessTab = dynamic(
    () => import("./_components/ProcessAccessTab"),
);
const HistoryTab = dynamic(() => import("./_components/HistoryTab"));

type TabType = "tasks" | "process-access" | "history";

const Page = () => {
    const { t } = useAppTranslations();
    const { id } = useParams();
    const { replaceQuery, searchParams } = useQueryString();
    const pathname = usePathname();
    const router = useRouter();
    useGetProcessTemplateById(id as string);

    const activeTab = (searchParams.get("tab") || "tasks") as TabType;
    const listData = [
        {
            label: t("Создать конфинурацию процесса"),
            value: "create_",
            onClick: () => {
                router.push(`${pathname}/create`);
            },
        },
    ];

    const tabsData: Array<{ label: string; value: TabType }> = [
        { label: t("Задачи"), value: "tasks" },
        { label: t("Доступы к процессу"), value: "process-access" },
        { label: t("История изменений"), value: "history" },
    ];

    return (
        <ContentLayout
            title={t("Карточка конфигурации процесса")}
            rightActions={
                <ZContextMenu list={listData}>
                    <span>
                        <ZButton endIcon={<ArrowDown2 />} size="md">
                            {t("Действия")}
                        </ZButton>
                    </span>
                </ZContextMenu>
            }
            currentBreadCrumb={[]}
        >
            <div className="mb-10">
                <UnderlineTabs
                    active={tabsData.find((item) => item.value === activeTab)}
                    data={tabsData}
                    onChange={(item) => {
                        startTransition(() => {
                            replaceQuery({ tab: item });
                        });
                    }}
                />
            </div>
            <div className="flex gap-8">
                <div className="flex-1">
                    {activeTab === "tasks" && (
                        <ZDataGridProvider
                            values={{ keyExtractor: "id", filter: {} }}
                        >
                            <TasksTab />
                        </ZDataGridProvider>
                    )}
                    {activeTab === "process-access" && <ProcessAccessTab />}
                    {activeTab === "history" && <HistoryTab />}
                </div>
                <div className="w-[420px]">
                    <ProcessConfigCard />
                </div>
            </div>
        </ContentLayout>
    );
};

export default Page;
