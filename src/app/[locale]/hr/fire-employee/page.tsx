"use client";
import React, { useState } from "react";
import ContentLayout from "@/components/layouts/ContentLayout";
import { TButton } from "@zaytun/components";
import { UnderlineTabs } from "@zaytun/components";
import { LegalMainInfo } from "@/components/legal-maininfo/LegalMainInfo";
import useFilter from "@/hooks/useFilter";
import TreatmentTab from "./_components/TreatmentTab";
import Comments from "@/components/comments/Comments";
import CheckingData from "./_components/checkingData";
import EmployeePosition from "@/app/[locale]/hr/fire-employee/_components/employeePosition";

const tabsData = [
    { label: "Обработка", value: "treatment" },
    { label: "История", value: "history" },
    { label: "Документы", value: "documents" },
];
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
export default function Page() {
    const { replaceQuery } = useFilter({});
    const [currentComponent, setCurrentComponent] = useState(1);
    const nextComponent = () => {
        setCurrentComponent((current) => (current < 4 ? current + 1 : current));
    };

    return (
        <ContentLayout
            title="Увольнение сотрудника Тураев Амир Туравевич"
            rightActions={
                <div>
                    <TButton variant="filled" bgColor={"primary"}>
                        Действия
                    </TButton>
                </div>
            }
        >
            <UnderlineTabs
                data={tabsData}
                onChange={(item) => {
                    replaceQuery({ tab: item });
                }}
            />
            <div className="flex justify-between pt-6 gap-8">
                <div>
                    <div className={"w-full"}>
                        {currentComponent === 1 && <TreatmentTab />}
                        {currentComponent === 2 && <TreatmentTab />}
                        {currentComponent === 3 && <CheckingData />}
                        {currentComponent === 4 && <EmployeePosition />}
                    </div>
                    <div className={"w-full flex justify-between items-center"}>
                        {(currentComponent === 3 || currentComponent === 4) && (
                            <TButton
                                variant={"filled"}
                                className={"mt-8 !bg-warning-500"}
                            >
                                Вернуть на доработку
                            </TButton>
                        )}
                        <TButton
                            onClick={nextComponent}
                            variant={"filled"}
                            className={"mt-8"}
                        >
                            Подтвердить
                        </TButton>
                    </div>
                </div>
                <div className="flex flex-col gap-6 flex-wrap">
                    <LegalMainInfo />
                    {/* <MainInfo /> */}
                    <Comments commentedText={mockComment} />
                </div>
            </div>
        </ContentLayout>
    );
}
