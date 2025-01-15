"use client";
import React, { useState } from "react";
import ContentLayout from "@/components/layouts/ContentLayout";
import { TButton } from "@zaytun/components";
import { UnderlineTabs } from "@zaytun/components";
import { LegalMainInfo } from "@/components/legal-maininfo/LegalMainInfo";
import useFilter from "@/hooks/useFilter";
import TreatmentTab from "../_components/TreatmentTab";
import Comments from "@/components/comments/Comments";
import ZButton from "@/components/z-components/ZButton";
import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

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
    const { t } = useAppTranslations();
    const getLabel = (currentComponent: number) => {
        switch (currentComponent) {
            case 1:
                return "Изменение должности сотрудника Тураев Амир Тураевич";
            case 2:
                return "Проверка данных и загруженных документов";
            case 3:
                return "Зафиксировать заработную плату";
            case 4:
                return "Загрузить подписанные документы и подтвердить изменение должности";
            case 5:
                return "Перерасчет заработной платы";
            default:
                return "Unknown Component";
        }
    };
    return (
        <ContentLayout
            title={getLabel(currentComponent)}
            rightActions={
                <div className={"flex gap-8"}>
                    <ZButton variant="secondary">
                        {t("Шаблоны документов")}
                    </ZButton>
                    <TButton variant="filled" bgColor={"primary"}>
                        {t("Действия")}
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
                <ZDataGridProvider values={{ filter: {} }}>
                    <div className={"w-full"}>
                        {currentComponent === 1 && (
                            <TreatmentTab
                                setCurrentComponent={setCurrentComponent}
                            />
                        )}
                    </div>
                </ZDataGridProvider>
                <div className="flex flex-col gap-6 flex-wrap">
                    <LegalMainInfo />
                    {/* <MainInfo /> */}
                    <Comments commentedText={mockComment} />
                </div>
            </div>
        </ContentLayout>
    );
}
