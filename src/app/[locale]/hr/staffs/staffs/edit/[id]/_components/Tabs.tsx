import Comments from "@/components/comments/Comments";
import { LegalMainInfo } from "@/components/legal-maininfo/LegalMainInfo";
import useQueryString from "@/hooks/helpers/useQueryString";
import { UnderlineTabs } from "@zaytun/components";
import React, { startTransition } from "react";
import FormTab from "./FormTab";
import { TaskLayoutTabType } from "@/data/task";

const mockComment = [
    {
        name: "Джалол Уткиров (КЦ)",
        comment: "Комментарии по клиенту будут тут",
        time: "Сегодня, 11:19",
    },
    {
        name: "Martyn Eeles",
        comment:
            "Death valley curve is a term describing the budding phase of startups, which begins",
        time: "Сегодня, 09:19",
    },
    {
        name: "Martyn Eeles",
        comment:
            "The term refers to when you plot a company's cash flow activities on a graph",
        time: "Сегодня, 09:19",
    },
    {
        name: "Martyn Clark",
        comment:
            "Узбекистан, Ташкент, Алмазарский район, ул. Амира Темура, 6, 55",
        time: "yesterday, 09:19",
    },
];

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
                    <div>{activeTab === "treatment" && <FormTab />}</div>
                </div>
                <div className="flex flex-col gap-6 flex-wrap">
                    <LegalMainInfo />
                    <Comments commentedText={mockComment} />
                </div>
            </div>
        </>
    );
};

export default Tabs;
