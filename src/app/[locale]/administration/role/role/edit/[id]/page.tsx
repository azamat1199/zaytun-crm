"use client";
import React from "react";
import ContentLayout from "@/components/layouts/ContentLayout";
import RoleForm from "@/components/RoleForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editRole } from "@/data/roles";
import { openToast } from "@/components/notification";
import { getErrorMessages, getSuccessMessage } from "@/utils/common";
import { useParams, useRouter } from "next/navigation";
import useGetEditRoles from "@/hooks/api/useGetEditRoles";
import get from "lodash.get";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

export default function RoleEditPage() {
    const { id } = useParams();
    const { t } = useAppTranslations();
    const queryClient = useQueryClient();

    const { modules, data, isLoading, inValidateQuery } = useGetEditRoles(
        id as string,
    );
    const router = useRouter();
    const updateMutate = useMutation({
        mutationFn: editRole,
        mutationKey: ["edit-role"],
        onSuccess: (res) => {
            inValidateQuery();
            queryClient.invalidateQueries({ queryKey: ["admin-role"] });
            queryClient.invalidateQueries({ queryKey: ["history"] });
            openToast({ variant: "success", message: getSuccessMessage(res) });
            router.back();
        },
        onError: (err) => {
            openToast({
                variant: "error",
                message: getErrorMessages(err as any, false),
            });
        },
    });
    const handleSubmit = (values: any) =>
        updateMutate.mutate({ ...values, id });

    const initialValues = {
        id: data?.id,
        description: get(data, "description"),
        ...get(data, "localaziableName", {}),
        initialPage: {
            label: t(get(data, "initialPage.code", " ")),
            value: get(data, "initialPage.id", ""),
        },
    };

    return (
        <ContentLayout
            title={t("Изменить роль")}
        >
            <div className="pb-[120px]">
                <RoleForm
                    handleSubmit={handleSubmit}
                    modules={
                        Array.isArray(modules)
                            ? JSON.parse(JSON.stringify(modules))
                            : []
                    }
                    isEdit
                    initialValues={initialValues}
                    submitButtonText={t("Редактировать")}
                    pending={updateMutate.isPending}
                    loadingRoles={isLoading}
                />
            </div>
        </ContentLayout>
    );
}
