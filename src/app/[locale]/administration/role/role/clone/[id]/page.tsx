"use client";
import React from "react";
import { TButton } from "@zaytun/components";
import ContentLayout from "@/components/layouts/ContentLayout";
import RoleForm from "@/components/RoleForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole } from "@/data/roles";
import { openToast } from "@/components/notification";
import { getErrorMessages, getSuccessMessage } from "@/utils/common";
import { useParams, useRouter } from "next/navigation";
import useAppLocale from "@/hooks/helpers/useAppLocale";
import useGetEditRoles from "@/hooks/api/useGetEditRoles";
import get from "lodash.get";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

const RoleClonePage = () => {
    const { t } = useAppTranslations();
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { modules, data, isLoading, inValidateQuery } = useGetEditRoles(
        id as string,
    );
    const router = useRouter();
    const locale = useAppLocale();
    const cloneMutate = useMutation({
        mutationFn: createRole,
        mutationKey: ["create-role"],
        onSuccess: (res) => {
            inValidateQuery();
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

    // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
    const handleSubmit = ({ id, ...values }: any) => cloneMutate.mutate(values);

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
            rightActions={
                <TButton variant="filled" bgColor={"primary"}>
                    {t("Действия")}
                </TButton>
            }
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
                    submitButtonText={t("Клонировать")}
                    pending={cloneMutate.isPending}
                    loadingRoles={isLoading}
                />
            </div>
        </ContentLayout>
    );
};

export default RoleClonePage;
