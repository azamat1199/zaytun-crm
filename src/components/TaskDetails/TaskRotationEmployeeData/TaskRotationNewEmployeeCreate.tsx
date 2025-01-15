"use client";
import React from "react";
import ChangePosition from "./changePosition";
import { useSearchParams } from "next/navigation";
import { TaskLayoutTabType } from "@/data/task";

export default function TaskEmployeeSalaryCalculation() {
    const searchParams = useSearchParams();
    const tab = (searchParams.get("tab") as TaskLayoutTabType) || "treatment";

    switch (tab) {
        case "treatment":
            return <ChangePosition />;
        default:
            return null;
    }
}
