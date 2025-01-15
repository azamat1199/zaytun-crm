import DeleteConfirmation from "@/components/DeleteConfirmation";
import { openToast } from "@/components/notification";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import useZDataGridContext from "@/components/z-components/ZDataGrid/ZDataGridProvider/useZDataGridContext";
import { getEmployeeList } from "@/data/hr/employee";
import { deleteRole } from "@/data/roles";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import {
    getErrorMessages,
    getSuccessMessage,
    selectDataWithPagination,
} from "@/utils/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import get from "lodash.get";
import React, { useMemo, useState } from "react";
import ZAvatar from "@/components/z-components/ZAvatar";

const EmployeeList = () => {
    const [selectedRoleId, setSelectedRoleId] = useState<null | string>(null);
    const pathname = usePathname();
    const router = useRouter();
    const { getWord, getWord2 } = useKeyTranslation();

    const { debouncedSearch, page, size } = useZDataGridContext();

    const { data, refetch, isLoading } = useQuery({
        queryKey: ["employee-list", { page, size, search: debouncedSearch }],
        queryFn: () =>
            getEmployeeList({
                page,
                size,
                search: debouncedSearch || "",
            }),
        select: selectDataWithPagination,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteRole,
        mutationKey: ["delete", { selectedRoleId }],
        onSuccess: (res) => {
            refetch();
            openToast({ variant: "success", message: getSuccessMessage(res) });
            setSelectedRoleId(null);
        },
        onError: (err: AxiosError) => {
            openToast({ variant: "error", message: getErrorMessages(err) });
        },
    });

    const handleDelete = () => deleteMutation.mutate(selectedRoleId as string);

    const columns = useMemo(
        () => [
            {
                label: "ФИО",
                key: "firstNameLat",
                width: "w-[30%]",
                cellRender: (row: any) => {
                    return (
                        <div className="flex flex-row gap-2 items-center">
                            <ZAvatar filePath={row.photo?.filePath} />
                            <div>
                                <p className="text-b-2-m font-medium text-c_neutral-800">
                                    {getWord2(row, "firstName")}{" "}
                                    {getWord2(row, "lastName")}
                                </p>
                                <span className="text-b-3-m text-c_neutral-500">
                                    Гл.Админ
                                </span>
                            </div>
                        </div>
                    );
                },
            },
            {
                label: "Департамент",
                key: "description",
                truncated: true,
                width: "w-[27%]",
                cellRender: (row: any) =>
                    getWord(
                        get(
                            row,
                            "employment.department.departmentTemplate.localaziableName",
                        ),
                    ),
            },
            {
                label: "Внутренний номер",
                key: "internalPhoneNumber",
                truncated: true,
                width: "w-[20%]",
            },

            {
                label: "Статус",
                key: "",
                cellRender: () => "-",
                width: "w-[10%]",
            },
        ],
        [getWord, getWord2],
    );

    const buttons = [
        {
            value: "1",
            children: "Все",
        },
        {
            value: "2",
            children: "За день",
        },
        {
            value: "3",
            children: "За неделю",
        },
        {
            value: "4",
            children: "За месяц",
        },
        {
            value: "5",
            children: "За квартал",
        },
    ];

    const contextMenu = [
        {
            label: "Редактировать",
            onClick: (id: string) => {
                router.push(`${pathname}/edit/${id}`);
            },
        },
        {
            label: "Изменение должности",
            onClick: (id: string) => {
                router.push(`${pathname}/change-position/${id}`);
            },
        },
        {
            label: "Удалить",
            onClick: (id: string) => {
                setSelectedRoleId(id);
            },
            rootClassName: "text-c_error-600",
        },
    ];

    const handleRowDoubleClick = (id: string) => {
        router.push(`${pathname}/${id}`);
    };

    return (
        <>
            <ZDataGrid
                hasCheckbox
                contextMenu={contextMenu}
                buttons={buttons}
                columns={columns}
                rows={data?.list || []}
                pagination={{
                    totalPages: data?.totalPages,
                }}
                buttonKey="tab"
                handleRowDoubleClick={handleRowDoubleClick}
                loading={isLoading}
            />
            <DeleteConfirmation
                subTitle="Вы хотите удалить роль"
                handleCloseModal={() => setSelectedRoleId(null)}
                handleDelete={handleDelete}
                open={Boolean(selectedRoleId)}
                pending={deleteMutation.isPending}
            />
        </>
    );
};

export default EmployeeList;
