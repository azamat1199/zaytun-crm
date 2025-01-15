"use client";
import React from "react";
import TreatmentTab from "./TreatmentTab";
import { useSearchParams } from "next/navigation";
import { TaskLayoutTabType } from "@/data/task";

export default function TaskCrmEnteringEmployeeData() {
    const searchParams = useSearchParams();
    const tab = (searchParams.get("tab") as TaskLayoutTabType) || "treatment";

    switch (tab) {
        case "treatment":
            return <TreatmentTab />;
        default:
            return null;
    }
}
