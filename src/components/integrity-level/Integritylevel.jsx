import { StatusTag } from "@zaytun/components";
import React from "react";

export default function Integritylevel() {
    return (
        <div className="px-6 py-4 border rounded-2xl">
            <p className="text-[#333] text-base leading-8 font-normal">
                Теги и категории
            </p>
            <StatusTag variant={"orange"} value={"54/100"} size="lg" />
        </div>
    );
}
