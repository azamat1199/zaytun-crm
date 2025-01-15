"use client";
import ArrowDown2 from "@/components/icons/ArrowDown2";
import ContentLayout from "@/components/layouts/ContentLayout";
import ZButton from "@/components/z-components/ZButton";
import ZContextMenu from "@/components/z-components/ZContextMenu";
import Tabs from "./_components/Tabs";
import { useQuery } from "@tanstack/react-query";
import { getEmployeeById } from "@/data/hr/employee";
import { useParams } from "next/navigation";

const EditEmployeePage = () => {
    const { id } = useParams();
    useQuery({
        queryFn: () => getEmployeeById(id as string),
        queryKey: ["employee", { id }],
        enabled: Boolean(id),
        select: (res) => res.data?.result?.data,
    });

    return (
        <ContentLayout
            title="Заполните данные для создания сотрудника"
            rightActions={
                <div className="flex gap-6 items-center">
                    <ZContextMenu list={[]}>
                        <span>
                            <ZButton endIcon={<ArrowDown2 />} size="md">
                                Действия
                            </ZButton>
                        </span>
                    </ZContextMenu>
                </div>
            }
        >
            <Tabs />
        </ContentLayout>
    );
};

export default EditEmployeePage;
