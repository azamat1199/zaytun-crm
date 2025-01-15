"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { TaskLayoutTabType } from "@/data/task";
import SalaryRecalculation from "./SalaryRecalculation";

export default function TaskRotationNewEmployeeData() {
    const searchParams = useSearchParams();
    const tab = (searchParams.get("tab") as TaskLayoutTabType) || "treatment";

    switch (tab) {
        case "treatment":
            return <SalaryRecalculation />;
        default:
            return null;
    }
}
