"use client";
import ArrowDown2 from "@/components/icons/ArrowDown2";
import ContentLayout from "@/components/layouts/ContentLayout";
import ZButton from "@/components/z-components/ZButton";
import ZContextMenu from "@/components/z-components/ZContextMenu";
import { TaskLayoutTabType } from "@/data/task";
import useQueryString from "@/hooks/helpers/useQueryString";
import { UnderlineTabs } from "@zaytun/components";
import { FC, startTransition } from "react";
import Comments from "../comments/Comments";
import TaskShortDetailCard from "./TaskShortDetailCard";
import useGetTaskDetailById from "@/hooks/api/useGetTaskDetailById";
import { useParams } from "next/navigation";

interface TaskDetailLayoutProps {
    children: any;
}

const TaskDetailLayout: FC<TaskDetailLayoutProps> = ({ children }) => {
    const {id} =useParams();
    const { replaceQuery, searchParams } = useQueryString();

    const activeTab = (searchParams.get("tab") ||
        "treatment") as TaskLayoutTabType;

    const tabsData: Array<{ label: string; value: TaskLayoutTabType }> = [
        { label: "Обработка", value: "treatment" },
        { label: "Документы", value: "document" },
        { label: "История", value: "history" },
    ];

    useGetTaskDetailById(id as string)

    return (
        <ContentLayout
            title="Заполните данные для создания сотрудника"
            rightActions={
                <div className="flex gap-6 items-center">
                    <ZContextMenu list={[]}>
                        <span>
                            <ZButton endIcon={<ArrowDown2 />} size="md">
                                Действия
                            </ZButton>
                        </span>
                    </ZContextMenu>
                </div>
            }
        >
            <UnderlineTabs
                active={tabsData.find((item) => item.value === activeTab)}
                data={tabsData}
                onChange={(item) => {
                    startTransition(() => {
                        replaceQuery({ tab: item });
                    });
                }}
            />

            <div className="flex gap-8 justify-between pt-8">
                <div className="w-full">{children}</div>
                <div className="flex flex-col gap-6 flex-wrap">
                    <TaskShortDetailCard />
                    <Comments />
                </div>
            </div>
        </ContentLayout>
    );
};

export default TaskDetailLayout;
