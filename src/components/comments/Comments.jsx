"use client";
import { IconButton } from "@material-tailwind/react";
import React from "react";
import { SendIcon } from "../icons/send-icon";
import { TextField } from "@zaytun/components";
import {
    formatCreatedAtTime,
    formatCreatedAtDate,
} from "@/utils/timeFormatter";

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

export default function Comments() {
    return (
        <div className="border rounded-2xl min-w-[424px]">
            <div>
                <p className="p-4 text-[#344054] font-normal text-2xl font-sans bg-[#F9FAFB] rounded-t-2xl">
                    Комментарии
                </p>
            </div>
            <div className="flex flex-col items-end p-4 h-[29rem] comment-card overflow-y-scroll">
                {mockComment.map((item, key) => {
                    return (
                        <div
                            className="flex flex-col gap-1 w-72 items-end"
                            key={key}
                        >
                            <div className="flex gap-1">
                                <h5 className="text-gray-700 font-normal text-xs leading-5 font-sans">
                                    {item.author?.firstNameLat}
                                </h5>
                                <h5 className="text-gray-700 font-normal text-xs leading-5 font-sans">
                                    {item.author?.lastNameLat}
                                </h5>
                            </div>
                            <p className="text-gray-700 text-base font-normal font-sans p-3 bg-[#F2F4F7] rounded-lg rounded-br-none">
                                {item.comment}
                            </p>
                            <span className="text-gray-500 font-normal text-[10px] leading-[18px]">
                                <span>
                                    {" "}
                                    {formatCreatedAtTime(item?.createdAt)}
                                </span>
                                <span>
                                    {" "}
                                    {formatCreatedAtDate(item?.createdAt)}{" "}
                                </span>
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="flex items-center justify-between px-[30px] py-2 bg-[#F9FAFB] rounded-b-lg gap-3">
                {/* <p className="text-[#667085] text-lg font-normal font-sans">
          Сообщение
        </p> */}
                <TextField
                    variant="static"
                    placeholder="Сообщение"
                    className="border-none text-lg"
                />
                <IconButton className="bg-[#039855]">
                    <SendIcon />
                </IconButton>
            </div>
        </div>
    );
}
