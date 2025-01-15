"use client";
import React, { useRef, useState, useEffect } from "react";
import { TButton } from "@zaytun/components";
import ContentLayout from "@/components/layouts/ContentLayout";
import Structure from "@/components/structure/Structure";
import { useAppSelector } from "@/hooks/helpers/useAppSelector";

export default function Page() {
    const [height, setHeight] = useState<number | null>(650);
    const rootRef = useRef<HTMLDivElement>(null);
    const sidebarView = useAppSelector((store) => store.navbar.sidebarView);

    useEffect(() => {
        if (!rootRef.current) {
            return;
        }

        setHeight(rootRef.current.clientHeight);
    }, [rootRef.current, sidebarView]);

    return (
        <ContentLayout
            title="Сотрудники"
            rightActions={
                <div className="flex gap-6 items-center">
                    <TButton variant="outlined">Шаблоны документов</TButton>
                    <TButton variant="filled" bgColor={"primary"}>
                        Действия
                    </TButton>
                </div>
            }
            currentBreadCrumb={[
                { label: "structure", path: "structure/structure" },
            ]}
        >
            <div
                ref={rootRef}
                style={{
                    ...(height && { height: `${height}px` }),
                }}
                className="w-full h-full"
            >
                <Structure />
            </div>
        </ContentLayout>
    );
}
