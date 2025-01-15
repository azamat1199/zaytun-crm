"use client";
import ArrowDown2 from "@/components/icons/ArrowDown2";
import ContentLayout from "@/components/layouts/ContentLayout";
import ZButton from "@/components/z-components/ZButton";
import ZContextMenu from "@/components/z-components/ZContextMenu";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import TaskList from "./_components/TaskList";

export default function TasksPage() {
    return (
        <ZDataGridProvider values={{ filter: {}, keyExtractor: "id" }}>
            <ContentLayout
                title="Задачи"
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
                <TaskList />
            </ContentLayout>
        </ZDataGridProvider>
    );
}
