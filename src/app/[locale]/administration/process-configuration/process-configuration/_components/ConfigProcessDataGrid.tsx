import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import { convertSeconds } from "@/utils/common";
import { getDocumentTemplates } from "@/data/admin/admin.requests";
import { useQuery } from "@tanstack/react-query";
import useZDataGridContext from "@/components/z-components/ZDataGrid/ZDataGridProvider/useZDataGridContext";
import { ZTextField } from "@/components/z-components/FormElements";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import cx from "classnames";
import { StatusTag } from "@zaytun/components";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";

const ConfigProcessDataGrid = () => {
    const { t } = useAppTranslations();
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { getWord } = useKeyTranslation();

    const priority = searchParams.get("priority");
    const { debouncedSearch, page, size } = useZDataGridContext();

    const filters = {
        page,
        size,
        search: debouncedSearch,
        priority: priority,
    };
    const { data, isLoading } = useQuery({
        queryKey: ["process-templates", filters],
        queryFn: () => getDocumentTemplates(filters),
        select: (res) => res.data?.result?.data?.content,
    });

    const buttons = [
        {
            value: "LOW",
            children: t("Низкий"),
        },
        {
            value: "MEDIUM",
            children: t("Средний"),
        },
        {
            value: "HIGH",
            children: t("Высокий"),
        },
    ];

    const columns = [
        {
            label: t("Процессы"),
            key: "process",
            cellRender: (row: any, index: number) => (
                <span className="flex gap-1 cursor-pointer items-center break-all">
                    <span className="text-input-label">{`${index + 1}`}.</span>
                    <span>{t(row.type)}</span>
                </span>
            ),
            width: "w-[20%]",
        },
        {
            label: t("BPMS код"),
            key: "bpmsCode",
            width: "w-[15%]",
        },
        {
            label: t("Доступы к процеcсу"),
            key: "role",
            width: "w-[30%]",
            cellRender: (row: any) => {
                if (!Array.isArray(row?.roles)) {
                    return "-";
                }
                const { roles } = row;

                return (
                    <div className="flex items-center">
                        {roles.map((role, i) => (
                            <span key={i}>
                                {getWord(role.localaziableName)}
                            </span>
                        ))}
                    </div>
                );
            },
        },
        {
            label: t("Приоритет"),
            key: "priority",
            width: "w-[10%]",
            cellRender: (row: any) => (
                <StatusTag
                    variant={cx({
                        warning: "MEDIUM" === row.priority,
                        canceled: "HIGH" === row.priority,
                        blue: "LOW" === row.priority,
                    })}
                    value={t(row.priority)}
                />
            ),
        },
        {
            label: t("Крайний срок"),
            key: "deadline",
            width: "w-[25%]",
            cellRender: (row: any) => {
                const time = convertSeconds(row?.slaInSeconds);
                return (
                    <div className="flex items-center gap-[6px]">
                        <ZTextField
                            disabled
                            value={time.seconds}
                            helperText={t(`сек`)}
                            rootClassName="flex-1 max-w-20"
                        />
                        <ZTextField
                            disabled
                            value={time.minutes}
                            helperText={t(`мин`)}
                            rootClassName="flex-1 max-w-20"
                        />
                        <ZTextField
                            disabled
                            value={time.hours}
                            helperText={t(`часы`)}
                            rootClassName="flex-1 max-w-20"
                        />
                        <ZTextField
                            disabled
                            value={time.days}
                            helperText={t(`дни`)}
                            rootClassName="flex-1 max-w-20"
                        />
                    </div>
                );
            },
        },
        // {
        //     label: "",
        //     key: "action",
        //     width: "w-[4%]",
        //     cellRender: (row: any) => {
        //         return (
        //             <span className="flex gap-4 items-center justify-end">
        //                 <span
        //                     onClick={() => {
        //                         router.push(`${pathname}/${row.id}`);
        //                     }}
        //                 >
        //                     <PencilIcon className="cursor-pointer" />
        //                 </span>
        //             </span>
        //         );
        //     },
        // },
    ];

    const handleRowDoubleClick = (id: string) => {
        router.push(`${pathname}/${id}`);
    };

    return (
        <ZDataGrid
            loading={isLoading}
            rows={data}
            columns={columns}
            buttonKey={"priority"}
            pagination={{
                totalPages: data?.totalPages,
            }}
            hasActions={false}
            buttons={buttons}
            handleRowDoubleClick={handleRowDoubleClick}
        />
    );
};

export default ConfigProcessDataGrid;
