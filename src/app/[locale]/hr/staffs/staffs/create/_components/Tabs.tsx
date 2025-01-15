import Comments from "@/components/comments/Comments";
import { LegalMainInfo } from "@/components/legal-maininfo/LegalMainInfo";
import useQueryString from "@/hooks/helpers/useQueryString";
import { UnderlineTabs } from "@zaytun/components";
import React, { startTransition } from "react";
import CreateTab from "./CreateTab";
import { TaskLayoutTabType } from "@/data/task";

const Tabs = () => {
    const { replaceQuery, searchParams } = useQueryString();
    const activeTab = (searchParams.get("tab") ||
        "treatment") as TaskLayoutTabType;
    const tabsData: Array<{ label: string; value: TaskLayoutTabType }> = [
        { label: "Обработка", value: "treatment" },
        { label: "Документы", value: "document" },
        { label: "История", value: "history" },
    ];

    return (
        <>
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
                <div className="w-full">
                    <div>{activeTab === "treatment" && <CreateTab />}</div>
                </div>
                <div className="flex flex-col gap-6 flex-wrap">
                    <LegalMainInfo />
                    <Comments />
                </div>
            </div>
        </>
    );
};

export default Tabs;
