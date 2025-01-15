"use client";
import React from "react";
import ContentLayout from "@/components/layouts/ContentLayout";
import RoleForm from "@/components/RoleForm";
import useGetAddRoles from "@/hooks/api/useGetAddRoles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole } from "@/data/roles";
import { openToast } from "@/components/notification";
import { getErrorMessages, getSuccessMessage } from "@/utils/common";
import { useRouter } from "next/navigation";
import useAppLocale from "@/hooks/helpers/useAppLocale";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

export default function RoleCreatePage() {
    const { t } = useAppTranslations();
    const queryClient = useQueryClient();
    const { data: modules, isLoading } = useGetAddRoles();
    const router = useRouter();
    const locale = useAppLocale();

    const createMutate = useMutation({
        mutationFn: createRole,
        mutationKey: ["create-role"],
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["admin-role"] });
            queryClient.invalidateQueries({ queryKey: ["history"] });
            openToast({ variant: "success", message: getSuccessMessage(res) });
            router.push(`/${locale}/administration/role/role`, {
                scroll: true,
            });
        },
        onError: (err) => {
            openToast({
                variant: "error",
                message: getErrorMessages(err as any, false),
            });
        },
    });

    const handleSubmit = createMutate.mutate;

    return (
        <ContentLayout
            title={t("Создать новую роль")}
        >
            <div className="pb-[140px]">
                <RoleForm
                    handleSubmit={handleSubmit}
                    modules={modules}
                    submitButtonText={t("Сохранить")}
                    pending={createMutate.isPending}
                    loadingRoles={isLoading}
                />
            </div>
        </ContentLayout>
    );
}
