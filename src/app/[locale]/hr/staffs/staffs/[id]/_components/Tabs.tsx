import { startTransition } from "react";
import { LegalMainInfo } from "@/components/legal-maininfo/LegalMainInfo";
import useQueryString from "@/hooks/helpers/useQueryString";
import { UnderlineTabs } from "@zaytun/components";
import React from "react";
import EmployeeFormTab from "./EmployeeFormTab";
import LaborActivityTab from "./LaborActivityTab";
import RelativesTab from "./RelativesTab";
import Comments from "@/components/comments/Comments";

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
    const activeTab = searchParams.get("tab") || "about_employee";
    const tabsData = [
        { label: "О сотруднике", value: "about_employee" },
        { label: "Трудовая деятельность", value: "labor_activity" },
        { label: "Близкие родственники", value: "relatives" },
        { label: "Доступы", value: "accesses" },
        { label: "Рейтинги", value: "rating" },
        { label: "Зарплатный проект", value: "salary_project" },
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
                <div className="w-full pb-40">
                    <div>
                        {activeTab === "about_employee" && <EmployeeFormTab />}
                        {activeTab === "labor_activity" && <LaborActivityTab />}
                        {activeTab === "relatives" && <RelativesTab />}
                        {/* {activeTab === 'close_relatives' && <CloseRelatives />} */}
                    </div>
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
