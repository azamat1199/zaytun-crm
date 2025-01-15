"use client";
import DocumentTemplateForm from "@/components/DocumentTemplateForm";
import ContentLayout from "@/components/layouts/ContentLayout";
import { openToast } from "@/components/notification";
import { editDocumentList } from "@/data/admin/admin.requests";
import { prepareDocTemplateDtoToFormValues } from "@/data/document-template/document-template.services";
import useGetDocumentTemplateById from "@/hooks/api/useGetDocumentTemplateById";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import { getErrorMessages, getSuccessMessage } from "@/utils/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
    const { t } = useAppTranslations();
    const queryClient = useQueryClient();
    const router = useRouter();
    const { id } = useParams();

    const { isLoading, documentTemplate } = useGetDocumentTemplateById(
        id as string,
    );

    const editMutation = useMutation({
        mutationFn: editDocumentList,
        mutationKey: ["edit-document"],
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["document-templates"] });
            queryClient.invalidateQueries({
                queryKey: ["document-template", { id }],
            });
            queryClient.invalidateQueries({ queryKey: ["history"] });
            openToast({
                variant: "success",
                message: getSuccessMessage(res),
            });

            router.back();
        },
        onError: (err: any) => {
            openToast({
                variant: "error",
                message: getErrorMessages(err, false),
            });
        },
    });

    const handleSubmit = (values) => editMutation.mutate({ ...values, id });

    const defaultValues = prepareDocTemplateDtoToFormValues(
        documentTemplate || {},
    );


    return (
        <ContentLayout title={t("Редактирование шаблона документа")}>
            <DocumentTemplateForm
                handleSubmit={handleSubmit}
                pending={editMutation.isPending}
                defaultValues={defaultValues}
                loading={isLoading}
                isEdit
            />
        </ContentLayout>
    );
};

export default Page;
