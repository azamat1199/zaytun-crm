import DeleteConfirmation from "@/components/DeleteConfirmation";
import FileExtension from "@/components/FileExtension";
import { TrashIcon } from "@/components/icons/trash-icon";
import { openToast } from "@/components/notification";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import useZDataGridContext from "@/components/z-components/ZDataGrid/ZDataGridProvider/useZDataGridContext";
import { deleteDocumentId, getDocumentList } from "@/data/admin/admin.requests";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import { formatDateTime } from "@/services/time";
import {
    getErrorMessages,
    getSuccessMessage,
    selectDataWithPagination,
} from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PencilIcon } from "@zaytun/components";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const DocumentTemplatesDataGrid = () => {
    const { t } = useAppTranslations();
    const { getWord, getWord2 } = useKeyTranslation();
    const pathname = usePathname();
    const router = useRouter();
    const { debouncedSearch, page, size } = useZDataGridContext();
    const [selectedDocTemplateId, setSelectedDocTemplateId] = useState<
        string | null
    >(null);

    const filters = {
        page,
        size,
        search: debouncedSearch,
    };

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["document-templates", filters],
        queryFn: () => getDocumentList(filters),
        select: selectDataWithPagination,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteDocumentId,
        mutationKey: ["delete-doc"],
        onSuccess: (res) => {
            openToast({
                variant: "success",
                message: getSuccessMessage(res),
            });
            refetch();
            setSelectedDocTemplateId(null);
        },
        onError: (err: AxiosError) => {
            openToast({
                variant: "error",
                message: getErrorMessages(err, false),
            });
        },
    });

    const handleDelete = () =>
        deleteMutation.mutate(selectedDocTemplateId as string);



    const columns = [
        {
            label: t("Название документа"),
            key: "localaziableName",
            cellRender: (row) => getWord(row.localaziableName),
            width: "w-[15%]",
        },
        {
            label: t("Код BPMS"),
            key: "code",
            width: "w-[10%]",
        },
        {
            label: t("Тип документа шаблона"),
            key: "inputFormatType",
            cellRender: (row: any) => {
                return (
                    <div className="flex items-center gap-3">
                        <FileExtension extension={row.inputFormatType} />
                        <span className="text-b-2-r">
                            {row.inputFormatType.toUpperCase()}
                        </span>
                    </div>
                );
            },
            width: "w-[15%]",
        },
        {
            label: t("Тип генерируемого документа"),
            key: "outputFormatType",
            cellRender: (row: any) => {
                return (
                    <div className="flex items-center gap-3">
                        <FileExtension extension={row.outputFormatType} />
                        <span className="text-b-2-r">
                            {row.outputFormatType.toUpperCase()}
                        </span>
                    </div>
                );
            },
            width: "w-[15%]",
        },
        {
            label: t("Автор"),
            key: "",
            cellRender: ({ createdBy }: any) => (
                <div>
                    <p>
                        {getWord2(createdBy, "firstName")}{" "}
                        {getWord2(createdBy, "lastName")}
                    </p>
                    <span>{getWord2(createdBy, "middleName")}</span>
                </div>
            ),
            truncated: true,
            width: "w-[20%]",
        },
        {
            label: t("Дата создания"),
            key: "created_data",
            cellRender: (row: any) => {
                const { date, time } = formatDateTime(row.createdAt);
                return (
                    <div className="flex flex-col">
                        <span> {date}</span>
                        <span> {time} </span>
                    </div>
                );
            },
            width: "w-[20%]",
        },
        {
            label: "",
            key: "action",
            cellRender: (row: any) => (
                <span className="flex gap-4 items-center justify-end">
                    <span
                        onClick={() => {
                            router.push(`${pathname}/${row.id}`);
                        }}
                    >
                        <PencilIcon className="cursor-pointer" />
                    </span>
                    <span
                        className="cursor-pointer"
                        onClick={() => setSelectedDocTemplateId(row.id)}
                    >
                        <TrashIcon className="cursor-pointer" color="#F04438" />
                    </span>
                </span>
            ),
            width: "w-[5%]",
        },
    ];

    const buttons = [
        {
            value: "all",
            children: t("Все"),
        },
        {
            value: "mine",
            children: t("Мои"),
        },
    ];

    return (
        <>
            <ZDataGrid
                loading={isLoading}
                rows={data?.list || []}
                columns={columns}
                buttonKey={"tab"}
                pagination={{
                    totalPages: data?.totalPages,
                }}
                hasActions={false}
                buttons={buttons}
            />
            <DeleteConfirmation
                subTitle={t("Вы хотите удалить шаблон документа?")}
                handleCloseModal={() => setSelectedDocTemplateId(null)}
                handleDelete={handleDelete}
                open={Boolean(selectedDocTemplateId)}
                pending={deleteMutation.isPending}
            />
        </>
    );
};

export default DocumentTemplatesDataGrid;
