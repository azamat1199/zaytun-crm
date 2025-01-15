"use client";
import React from "react";
import useFilter from "@/hooks/useFilter";
import ContentLayout from "@/components/layouts/ContentLayout";
import { TButton } from "@zaytun/components";
import UnderlineTabs from "@/components/tabs/UnderlineTabs";
import Information from "./modules/Information/Information";
import Comments from "@/components/comments/Comments";
import { SimpleMainInfo } from "@/components/simple-main-info/SimpleMainInfo";

const tabsData = [
    { label: "Информация", value: "information" },
    { label: "Документы", value: "documents" },
    { label: "История работы", value: "history_work" },
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
    const { filters, replaceQuery } = useFilter({});
    const individualTab = filters?.tab === "information";

    return (
        <ContentLayout
            title="Карточка заявки"
            rightActions={
                <div className="flex gap-6 items-center">
                    <TButton variant="filled" bgColor={"primary"}>
                        Взять в работу
                    </TButton>
                    <TButton variant="filled" bgColor={"primary"}>
                        Действия
                    </TButton>
                </div>
            }
        >
            <UnderlineTabs
                data={tabsData}
                className={"mb-5"}
                onChange={(item: { label: string; value: string }) =>
                    replaceQuery({ tab: item.value })
                }
            />
            <div className="flex gap-8 justify-between">
                <div className="w-[50%]">
                    {individualTab && <Information />}
                </div>
                <div className="flex flex-col gap-6  w-[23.2%]">
                    <SimpleMainInfo />
                    <Comments commentedText={mockComment} />
                </div>
            </div>
        </ContentLayout>
    );
}
