"use client";
import DocumentTemplateForm from "@/components/DocumentTemplateForm";
import ContentLayout from "@/components/layouts/ContentLayout";
import { openToast } from "@/components/notification";
import { createDocumentList } from "@/data/admin/admin.requests";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import { getErrorMessages, getSuccessMessage } from "@/utils/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TButton } from "@zaytun/components";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
    const { t } = useAppTranslations();
    const queryClient = useQueryClient();
    const router = useRouter();

    const createDocMutation = useMutation({
        mutationFn: createDocumentList,
        mutationKey: ["create-document"],
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["document-templates"] });
            queryClient.invalidateQueries({ queryKey: ["history"] });
            openToast({
                variant: "success",
                message: getSuccessMessage(res),
            });
            router.back();
        },
        onError: (err: AxiosError) => {
            openToast({
                variant: "error",
                message: getErrorMessages(err, false),
            });
        },
    });

    const handleSubmit = createDocMutation.mutate;

    return (
        <ContentLayout title={t("Шаблоны документов")}>
            <DocumentTemplateForm
                handleSubmit={handleSubmit}
                pending={createDocMutation.isPending}
                defaultValues={{}}
            />
        </ContentLayout>
    );
};

export default Page;
