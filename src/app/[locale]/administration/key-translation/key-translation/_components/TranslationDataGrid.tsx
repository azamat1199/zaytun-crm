import TableEdit from "@/components/icons/TableEdit";
import { ZTextField } from "@/components/z-components/FormElements";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import useZDataGridContext from "@/components/z-components/ZDataGrid/ZDataGridProvider/useZDataGridContext";
import { getTranslateList } from "@/data/admin/admin.requests";
import { updateKeyTranslation } from "@/data/translation";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import { selectDataWithPagination } from "@/utils/common";
import { IconButton } from "@material-tailwind/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TButton } from "@zaytun/components";
import React, { ChangeEvent, useState} from "react";

const initialValues = {
    uzCr: "",
    uzLat: "",
    ru: "",
    en: "",
};

const TranslationDataGrid = () => {
    const { t } = useAppTranslations();
    const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
    const [values, setValues] = useState(initialValues);
    const { page, size, debouncedSearch } = useZDataGridContext();

    const filter = {
        page,
        size,
        search: debouncedSearch,
    };

    const { data, isLoading, refetch, isRefetching } = useQuery({
        queryFn: () => getTranslateList(filter),
        queryKey: ["translation", filter],
        select: selectDataWithPagination,
    });

    const updateTranslateMutation = useMutation({
        mutationFn: updateKeyTranslation,
        mutationKey: ["update-translation"],
        onSuccess: () => {
            setSelectedKeyId(null);
            setValues(initialValues);
            refetch();
        },
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setValues((pre) => ({ ...pre, [e.target.name]: e.target.value }));

    const handleSave = (key: string) => {
        updateTranslateMutation.mutate({
            id: selectedKeyId !== null ? selectedKeyId.toString() : "",
            data: { key, translation: values },
        });
    };

    const columns = [
        {
            label: t("Код"),
            key: "key",
            width: "w-[19%]",
        },
        {
            label: t("Узбекский"),
            key: "uzCr",
            width: "w-[15%]",
            cellRender: (row: any) => {
                if (row.id === selectedKeyId) {
                    return (
                        <ZTextField
                            name="uzCr"
                            value={values?.uzCr}
                            onChange={handleChange}
                        />
                    );
                }

                return <div>{row?.translation?.uzCr || "N/A"}</div>;
            },
        },
        {
            label: t("O`zbekcha"),
            key: "uzLat",
            width: "w-[16%]",
            cellRender: (row: any) => {
                if (row.id === selectedKeyId) {
                    return (
                        <ZTextField
                            name="uzLat"
                            value={values?.uzLat}
                            onChange={handleChange}
                        />
                    );
                }

                return <div>{row?.translation?.uzLat || "N/A"}</div>;
            },
        },
        {
            label: t("Русский"),
            key: "ru",
            width: "w-[16%]",
            cellRender: (row: any) => {
                if (row.id === selectedKeyId) {
                    return (
                        <ZTextField
                            name="ru"
                            value={values?.ru}
                            onChange={handleChange}
                        />
                    );
                }

                return <div>{row?.translation?.ru || "N/A"}</div>;
            },
        },
        {
            label: t("Английский"),
            key: "en",
            width: "w-[16%]",
            cellRender: (row: any) => {
                if (row.id === selectedKeyId) {
                    return (
                        <ZTextField
                            name="en"
                            value={values?.en}
                            onChange={handleChange}
                        />
                    );
                }

                return <div>{row?.translation?.en || "N/A"}</div>;
            },
        },
        {
            label: "",
            key: "",
            width: "w-[18%]",
            className: "flex justify-end",
            cellRender: ({ translation, id, key }: any) =>
                id !== selectedKeyId ? (
                    <IconButton
                        variant="text"
                        onClick={() => {
                            setSelectedKeyId(id);
                            setValues(translation);
                        }}
                    >
                        <TableEdit size="md" />
                    </IconButton>
                ) : (
                    <div className="flex gap-1">
                        <TButton
                            size="sm"
                            variant="text"
                            onClick={() => setSelectedKeyId(null)}
                            className="text-red-500"
                        >
                            <p className="text-black">Отменить</p>
                        </TButton>
                        <TButton
                            size="sm"
                            variant="text"
                            loading={updateTranslateMutation.isPending}
                            type="submit"
                            // loading={updateTranslateMutation.isPending}
                            onClick={() => handleSave(key)}
                        >
                            Сохранить
                        </TButton>
                    </div>
                ),
        },
    ];

    return (
        <>
            <ZDataGrid
                columns={columns}
                rows={data?.list || []}
                loading={isLoading || isRefetching}
                pagination={{ totalPages: data?.totalPages }}
                hasActions={false}
            />
        </>
    );
};

export default TranslationDataGrid;
