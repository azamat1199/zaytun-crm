"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { TaskLayoutTabType } from "@/data/task";
import EmployeeDocuments from "@/components/TaskDetails/TaskRotationDocuments/EmployerDocuments";

export default function TaskEmployeeDocuments() {
    const searchParams = useSearchParams();
    const tab = (searchParams.get("tab") as TaskLayoutTabType) || "treatment";

    switch (tab) {
        case "treatment":
            return <EmployeeDocuments />;
        default:
            return null;
    }
}
