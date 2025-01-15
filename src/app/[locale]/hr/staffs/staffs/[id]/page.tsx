"use client";
import ArrowDown2 from "@/components/icons/ArrowDown2";
import ContentLayout from "@/components/layouts/ContentLayout";
import ZButton from "@/components/z-components/ZButton";
import ZContextMenu from "@/components/z-components/ZContextMenu";
import React from "react";
import Tabs from "./_components/Tabs";
import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "@/data/hr/employee";
import { useParams, useRouter } from "next/navigation";

const EmployeeCardPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const { isLoading, isSuccess } = useQuery({
        queryFn: () => getEmployeeById(id as string),
        queryKey: ["employee", { id }],
        enabled: Boolean(id),
        select: (res) => res.data?.result?.data,
    });

    const listData = [
        {
            label: "Редактировать",
            value: "create_employee",
            onClick: () => {
                router.push(`/hr/staffs/staffs/edit/${id}`);
            },
        },
    ];

    return (
        <ContentLayout
            title={"Карточка сотрудника"}
            rightActions={
                <ZContextMenu list={listData}>
                    <span>
                        <ZButton endIcon={<ArrowDown2 />} size="md">
                            Действия
                        </ZButton>
                    </span>
                </ZContextMenu>
            }
        >
            {isSuccess ? <Tabs /> : isLoading ? <></> : null}
        </ContentLayout>
    );
};

export default EmployeeCardPage;
