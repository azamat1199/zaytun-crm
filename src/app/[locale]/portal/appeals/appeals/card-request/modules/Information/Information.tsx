import React from "react";
import { TextareaValidations } from "@/components/textarea/TextArea";
import { StatusTag } from "@zaytun/components";

const TagsList = [
    { label: "В работе", type: "warning" },
    { label: "Label 1", type: "success" },
    { label: "Label 3", type: "primary" },
    { label: "Label 4", type: "disabled" },
    { label: "Label 5", type: "primary" },
    { label: "Label 6", type: "blocked" },
    { label: "Label 7", type: "blueLight" },
    { label: "Label 8", type: "blue" },
    { label: "Label 9", type: "purple" },
    { label: "Label 10", type: "indigo" },
    { label: "Label 11", type: "pink" },
    { label: "Label 12", type: "rose" },
    { label: "Label 13", type: "orange" },
];

export default function Information() {
    return (
        <div className="flex gap-4 flex-col">
            <div className="flex flex-col gap-6 w-">
                <div className="flex justify-between items-baseline border-b border-[#CDD4DF] pb-4 flex-wrap">
                    <p className="text-[#333]  text-xl font-medium font-sans">
                        Тема:
                    </p>
                    <p className="text-[#667085] font-normal text-base font-sans">
                        Мобильное приложения
                    </p>
                </div>
                <div className="flex justify-between items-baseline border-b border-[#CDD4DF] pb-4 flex-wrap">
                    <p className="text-[#333]  text-xl font-medium font-sans">
                        Номер телефона:
                    </p>
                    <p className="text-[#667085] font-normal text-base font-sans">
                        +998 94 950 18 81
                    </p>
                </div>
                <div className="flex justify-between items-baseline border-b border-[#CDD4DF] pb-4 flex-wrap">
                    <p className="text-[#333]  text-xl font-medium font-sans">
                        Контактное лицо:
                    </p>
                    <p className="text-[#039855] font-normal text-base font-sans underline">
                        TURAEV AMIR TURAEVICH
                    </p>
                </div>
            </div>
            <div className="border-b border-[#CDD4DF] pb-4">
                <TextareaValidations
                    name={"description"}
                    rows={5}
                    label="Описание"
                    placeholder="Введите описание"
                    required={false}
                    size={"w-80"}
                    labelClassname={"text-[#344054] text-sm font-medium"}
                />
            </div>
            <div>
                <StatusTag
                    variant={"warning"}
                    value={TagsList[0].label}
                    size="md"
                    withDot={true}
                    onChange={(item) =>
                        console.log("status---------------", item)
                    }
                    options={TagsList.map((item: any) => {
                        return { ...item, variant: item.type };
                    })}
                />
            </div>
        </div>
    );
}
