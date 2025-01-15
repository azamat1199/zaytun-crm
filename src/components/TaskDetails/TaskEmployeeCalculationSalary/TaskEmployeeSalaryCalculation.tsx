"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { TaskLayoutTabType } from "@/data/task";
import FixSalaryEmployee from "./employeeChangePostion";

export default function TaskRotationNewEmployeeData() {
    const searchParams = useSearchParams();
    const tab = (searchParams.get("tab") as TaskLayoutTabType) || "treatment";

    switch (tab) {
        case "treatment":
            return <FixSalaryEmployee />;
        default:
            return null;
    }
}
