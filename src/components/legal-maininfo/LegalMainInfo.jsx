import React from "react";
import { StatusTag } from "@zaytun/components";

export function LegalMainInfo() {
    return (
        <div className="border rounded-2xl h-fit min-w-[424px]">
            <div className="">
                <div className="flex flex-col flex-wrap gap-5 p-6">
                    <div className="flex justify-between items-center">
                        <h4 className="text-[#344054] text-base font-medium font-sans">
                            Основная информация
                        </h4>
                        <StatusTag
                            variant={"warning"}
                            value={"Юр. лицо"}
                            size="md"
                        />
                    </div>
                    <p className="text-[#2E90FA] font-medium text-xl uppercase ">
                        ООО Golden Group
                    </p>
                </div>
                <div>
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center  border-b border-t px-6">
                            <p className="text-[#333] text-base font-medium font-sans">
                                ID картотеки
                            </p>
                            <div className="flex flex-col gap-1">
                                <p className="text-[#667085] text-base font-medium font-sans">
                                    29.09.2023
                                </p>
                                <p className="text-[#667085] text-base font-medium font-sans">
                                    13:27:00
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center  border-b px-6 py-3">
                            <p className="text-[#333] text-base font-medium font-sans">
                                Источник картотеки
                            </p>
                            <p className="text-[#667085] text-base font-medium font-sans">
                                24.09.2023
                            </p>
                        </div>
                        <div className="flex justify-between items-center  border-b px-6 py-3">
                            <p className="text-[#333] text-base font-medium font-sans">
                                Всего к оплате
                            </p>
                            <p className="text-[#667085] text-base font-medium font-sans">
                                10 000 000,00 UZS
                            </p>
                        </div>
                        <div className="flex justify-between items-center px-6 py-3">
                            <p className="text-[#333] text-base font-medium font-sans">
                                Остаток к оплате
                            </p>
                            <p className="text-[#667085] text-base font-medium font-sans">
                                6 000 000,UZS
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
