import React from "react";
import { StatusTag } from "@zaytun/components";

export function SimpleMainInfo() {
    return (
        <div className="border rounded-2xl h-fit">
            <div className="p-[23px]">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col flex-wrap gap-1">
                        <h4 className="text-[#000] font-medium text-2xl">
                            Открытие карты для{" "}
                        </h4>
                        <p className="text-[#2E90FA] font-medium text-xl uppercase underline">
                            TURAEV AMIR TURAEVICHA
                        </p>
                        <p className="text-[#667085] font-normal text-base leading-[20px]">
                            В5495-001231133
                        </p>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between items-center pb-5 border-b">
                            <p className="text-[#333] text-base font-medium font-sans">
                                Крайний срок
                            </p>
                            <p className="text-[#667085] text-base font-medium font-sans">
                                29.09.2023
                            </p>
                        </div>
                        <div className="flex justify-between items-center pb-5 border-b">
                            <p className="text-[#333] text-base font-medium font-sans">
                                Инициатор
                            </p>
                            <p className="text-[#667085] text-base font-medium font-sans">
                                Икрамов. С.Т.
                            </p>
                        </div>
                        <div className="flex justify-between items-center pb-5 border-b">
                            <p className="text-[#333] text-base font-medium font-sans">
                                Приоритет
                            </p>
                            <p>
                                <StatusTag
                                    variant={"canceled"}
                                    value={"Высокий"}
                                    size="md"
                                />
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-[#333] text-base font-medium font-sans">
                                Статус
                            </p>
                            <p>
                                <StatusTag
                                    variant={"success"}
                                    value={"Новый"}
                                    size="md"
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
