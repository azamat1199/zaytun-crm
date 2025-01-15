import {
    ColSettingsType,
    ColumnItemType,
    StructureColumnType,
    StructureDataType,
    StructureOptions,
} from "../structure.types";
import { useCallback, useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    CreateBranchDto,
    StructureOccupationModel,
    createBranch,
    createStructure,
    deleteBranch,
    deleteStructure,
    getBranchesByParentId,
    getBranchesByStructureId,
    getStructuresInitialList,
    prepareBranchDto,
    updateBranch,
    updateStructure,
} from "@/data/structure";
import get from "lodash.get";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import {
    createMockArray,
    getErrorMessages,
    getSuccessMessage,
    isPlainObject,
} from "@/utils/common";
import {
    createDepartment,
    deleteDepartment,
    getDepartmentsByBranchId,
    getDepartmentsByParentId,
    updateDepartment,
} from "@/data/department";
import {
    createStructureItemKey,
    getItemIdByColIndex,
    DEFAULT_STRUCTURE_CONTENT_VALUES,
    extractIds,
} from "../structure.utils";
import {
    createEmployment,
    deleteEmployment,
    getEmploymentsByDepartmentId,
    prepareEmploymentDto,
    updateEmployment,
} from "@/data/employment";
import { AxiosError, AxiosResponse } from "axios";
import { openToast } from "@/components/notification";
import { flushSync } from "react-dom";
import { mappedFrontServerTranslationLangs } from "@/utils/language";
import useAppLocale from "@/hooks/helpers/useAppLocale";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

const initialModal: {
    type: StructureOptions | null;
    colIndex: number | null;
    contentIndex: number | null;
    action: "add" | "update" | "delete";
    itemId: null | string;
    initialValues?: any;
} = {
    type: null,
    colIndex: null,
    contentIndex: null,
    action: "add",
    itemId: null,
};

// TODO translate words
const useStructure = () => {
    const { t } = useAppTranslations();
    const locale = useAppLocale();
    const { getWord } = useKeyTranslation();
    const formValues = useRef<Record<string, any>>({});
    const [modal, setModal] = useState(initialModal);
    const [employeeCard, setEmployeeCard] = useState<{
        open: boolean;
        item: any;
    }>({ open: false, item: {} });
    const [activeItems, setActiveItems] = useState<Record<string, boolean>>({});
    const branchId = useRef<string | null>(null);

    const { colIndex, contentIndex } = modal;

    const [data, setData] = useState<
        Record<
            string,
            {
                expanded: boolean;
                content: StructureColumnType[];
                prev: number | null;
                next: number | null;
                loading?: boolean;
            }
        >
    >({});

    const getStructures = useQuery({
        queryKey: ["structures"],
        queryFn: getStructuresInitialList,
        select: (res) => res.data?.result?.data,
    });

    const handleCloseModal = useCallback(
        () =>
            setModal({
                colIndex: null,
                contentIndex: null,
                type: null,
                action: "add",
                itemId: null,
            }),
        [],
    );

    useEffect(() => {
        if (getStructures.isSuccess) {
            setData({
                0: {
                    expanded: true,
                    content: [
                        {
                            title: "Структура Zaytun",
                            id: "0",
                            items: getStructures.data.content.map(
                                (item: StructureOccupationModel) => ({
                                    title: getWord(item.localaziableName),
                                    ...item,
                                }),
                            ),
                            type: "structure",
                        },
                    ],
                    prev: null,
                    next: null,
                    loading: false,
                },
            });
        }

        if (getStructures.isLoading) {
            setData({
                0: {
                    expanded: true,
                    content: [
                        {
                            title: "Структура Zaytun",
                            id: "0",
                            items: createMockArray(),
                            type: "structure",
                        },
                    ],
                    prev: null,
                    next: null,
                    loading: true,
                },
            });
        }
        if (getStructures.isError) {
            setData({});
        }
    }, [
        getStructures.isSuccess,
        getStructures.isLoading,
        getStructures.data,
        getStructures.isError,
        getWord,
    ]);

    const appendItem = (item: ColumnItemType) => {
        if (colIndex === null || contentIndex === null) {
            return;
        }

        const newData = { ...data };
        const { content } = newData[colIndex];
        const searchedItems = content[contentIndex].items;

        searchedItems.push(item);
        newData[colIndex].content[contentIndex].items = searchedItems;

        flushSync(() => {
            setData(newData);

            toggleActiveItems({
                colIndex,
                contentIndex,
                itemId: item.id,
                contentType: item.contentType,
            });
        });

        columnStaticValues(
            colIndex,
            contentIndex,
            item.contentType,
        ).getChildren(item);
    };

    const toggleActiveItems = useCallback(
        ({
            colIndex,
            contentIndex,
            itemId,
            contentType,
            item,
        }: {
            colIndex: number;
            contentIndex: number;
            itemId: string;
            contentType: StructureColumnType["type"];
            item?: any;
        }) => {
            const key = createStructureItemKey({
                colIndex,
                contentIndex,
                itemId,
                contentType,
            });

            const filteredKeys = Object.keys(activeItems).filter((key) => {
                const { colIndex: currentColIndex } = extractIds(key);

                return currentColIndex >= colIndex;
            });

            const updatedValues = filteredKeys.reduce(
                (acc, cur) => ({ ...acc, [cur]: false }),
                {},
            );

            setActiveItems((prev) => ({
                ...prev,
                ...updatedValues,
                [key]: !prev[key],
            }));

            if (contentType === "employment") {
                setEmployeeCard({ open: true, item });
            } else {
                setEmployeeCard({ open: false, item: null });
            }
        },
        [activeItems],
    );

    const sliceData = (data: StructureDataType, colIndex: number) => {
        if (colIndex + 1 in Object.keys(data)) {
            const newData: StructureDataType = {};

            Object.values(data).forEach((item, i) => {
                if (i > colIndex + 1) {
                    return;
                }

                newData[i] = item;
            });

            return newData;
        }

        return data;
    };

    const deleteItem = (response: AxiosResponse) => {
        if (colIndex === null || contentIndex === null) {
            return;
        }

        const { itemId } = modal;

        const newData = { ...data };
        const { content } = newData[colIndex];
        const newItems = content[contentIndex].items.filter(
            (item) => item.id !== itemId,
        );
        newData[colIndex].content[contentIndex].items = newItems;

        setData(sliceData(newData, colIndex - 1));

        handleCloseModal();
        handleSuccessMessage(response);
    };

    const handleOnError = (error: AxiosError) => {
        if (!error?.response) {
            return;
        }
        openToast({
            variant: "error",
            message: getErrorMessages<string>(error, false),
        });
    };

    const handleSuccessMessage = (res: AxiosResponse) =>
        openToast({ variant: "success", message: getSuccessMessage(res) });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const findItemById = (
        colIndex: number,
        contentIndex: number,
        itemId: string,
    ) => {
        if (colIndex === null || contentIndex === null) {
            return;
        }
        const newData = { ...data };
        const { content } = newData[colIndex];
        const newItems = content[contentIndex].items;

        const searchedItemIndex = newItems.findIndex(
            (item) => item.id === itemId,
        );

        return {
            index: searchedItemIndex,
            item: newItems[searchedItemIndex],
        };
    };

    const getColContents = ({
        hasBranch = false,
        hasCommittee = false,
        hasDepartment = false,
        hasEmployment = false,
    }: Partial<ColumnItemType>): StructureColumnType[] =>
        [
            hasEmployment && {
                title: t("Штатное подразделение"),
                id: "3",
                items: [],
                type: "employment",
            },
            hasBranch && {
                title: "Branch",
                id: "0",
                items: [],
                type: "branch",
            },
            // hasCommittee && {
            //     title: `${t("Отдел")}/${t("Сектор")}`,
            //     id: "1",
            //     items: [],
            //     type: "committee",
            // },
            hasDepartment && {
                title: `${t("Отдел")}/${t("Сектор")}`,
                id: "2",
                items: [],
                type: "department",
            },
        ].filter(Boolean) as StructureColumnType[];

    const updateItem = async (
        newItem: any,
        contentType: StructureColumnType["type"],
    ) => {
        if (colIndex === null || contentIndex === null) {
            return;
        }
        const newData = { ...data };

        const { content } = newData[colIndex];
        const oldItems = content[contentIndex].items;

        const searchedItemIndex = oldItems.findIndex(
            (item) => item.id === newItem.id,
        );

        oldItems[searchedItemIndex] = newItem;
        content[contentIndex].items = oldItems;
        const nextIndex = colIndex + 1;

        if (nextIndex in data && contentType !== "employment") {
            const contents = getColContents(newItem);

            const newContent = await generateNewColData(contents, {
                ...newItem,
                contentType,
            });
            newData[nextIndex].content = newContent;
        }

        setData(sliceData(newData, colIndex));
    };

    const onUpdateSuccess = (
        res: AxiosResponse<any>,
        contentType: StructureColumnType["type"],
        objPath = "localaziableName",
    ) => {
        if (!isPlainObject(res.data?.result)) {
            return;
        }

        const { data } = res.data.result;

        const newItem = {
            ...data,
            title: getWord(get(data, objPath)),
            roles: (Array.isArray(formValues.current?.roles)
                ? // eslint-disable-next-line no-unsafe-optional-chaining
                  formValues?.current?.roles
                : []
            ).map((role) => ({
                id: role.value,
                localaziableName: {
                    [mappedFrontServerTranslationLangs[locale]]: role.label,
                },
            })),
        };

        handleSuccessMessage(res);

        updateItem(newItem, contentType);
        setModal(initialModal);
    };

    const createStructureMutation = useMutation({
        mutationFn: createStructure,
        mutationKey: ["create-structure"],
        onSuccess: (res) => {
            if (!isPlainObject(res.data?.result)) {
                return;
            }

            const { id, localaziableName } = res.data.result.data;

            appendItem({
                id,
                title: getWord(localaziableName) || "",
                contentType: "structure",
                localaziableName,
            });

            handleSuccessMessage(res);

            setModal(initialModal);
        },
        onError: handleOnError,
    });

    const updateStructureMutation = useMutation({
        mutationFn: updateStructure,
        mutationKey: ["update-structure"],
        onSuccess: (res) => onUpdateSuccess(res, "structure"),
        onError: handleOnError,
    });

    const deleteStructureMutation = useMutation({
        mutationFn: deleteStructure,
        mutationKey: ["delete-structure"],
        onSuccess: deleteItem,
        onError: handleOnError,
    });

    const createBranchMutation = useMutation({
        mutationFn: createBranch,
        mutationKey: ["create-branch"],
        onSuccess: (res) => {
            if (!isPlainObject(res.data?.result)) {
                return;
            }

            const {
                localaziableName,

                ...rest
            } = res.data.result.data;

            appendItem({
                ...rest,
                title: getWord(localaziableName) || "",
                localaziableName,
                contentType: "branch",
            });

            handleSuccessMessage(res);

            setModal(initialModal);
        },
        onError: handleOnError,
    });

    const deleteBranchMutation = useMutation({
        mutationFn: deleteBranch,
        mutationKey: ["delete-branch"],
        onSuccess: deleteItem,
        onError: handleOnError,
    });

    const updateBranchMutation = useMutation({
        mutationFn: updateBranch,
        mutationKey: ["update-branch"],
        onSuccess: (res) => onUpdateSuccess(res, "branch"),
        onError: handleOnError,
    });

    const createDepartmentMutation = useMutation({
        mutationFn: createDepartment,
        mutationKey: ["create-department"],
        onSuccess: (res) => {
            if (!isPlainObject(res.data?.result)) {
                return;
            }

            const {
                departmentTemplate: { localaziableName },
                ...rest
            } = res.data.result.data;

            appendItem({
                title: getWord(localaziableName) || "",
                ...rest,
                contentType: "department",
                departmentTemplate: {
                    localaziableName,
                },
            });

            handleSuccessMessage(res);
            setModal(initialModal);
        },
        onError: handleOnError,
    });

    const updateDepartmentMutation = useMutation({
        mutationFn: updateDepartment,
        mutationKey: ["update-department"],
        onSuccess: (res) =>
            onUpdateSuccess(
                res,
                "department",
                "departmentTemplate.localaziableName",
            ),
        onError: handleOnError,
    });

    const deleteDepartmentMutation = useMutation({
        mutationFn: deleteDepartment,
        mutationKey: ["delete-department"],
        onSuccess: deleteItem,
        onError: handleOnError,
    });

    const createEmploymentMutation = useMutation({
        mutationFn: createEmployment,
        mutationKey: ["create-employment"],
        onSuccess: (res) => {
            if (!isPlainObject(res.data?.result)) {
                return;
            }

            appendItem({
                title: "",
                ...res.data.result.data,
                contentType: "employment",
                roles: (Array.isArray(formValues.current?.roles)
                    ? formValues.current.roles
                    : []
                ).map((role) => ({
                    id: role.value,
                    localaziableName: {
                        [mappedFrontServerTranslationLangs[locale]]: role.label,
                    },
                })),
            });

            handleSuccessMessage(res);

            setModal(initialModal);
        },
        onError: handleOnError,
    });

    const deleteEmploymentMutation = useMutation({
        mutationFn: deleteEmployment,
        mutationKey: ["delete-employment"],
        onSuccess: deleteItem,
        onError: handleOnError,
    });

    const updateEmploymentMutation = useMutation({
        mutationFn: updateEmployment,
        mutationKey: ["update-employment"],
        onSuccess: (res) =>
            onUpdateSuccess(res, "employment", "position.localaziableName"),
        onError: handleOnError,
    });

    const getPreparedDepartments = (response: AxiosResponse) => {
        if (isPlainObject(response) && response.data?.result?.success) {
            const { content } = response.data.result.data;
            return content.map((department: any) => ({
                ...department,
                title: getWord(department.departmentTemplate.localaziableName),
                type: "department",
            }));
        }

        return [];
    };

    const getPreparedItems = (
        response: AxiosResponse,
        type: ColumnItemType["contentType"],
        objPath = "localaziableName",
    ) => {
        if (isPlainObject(response) && response.data?.result?.success) {
            const { content } = response.data.result.data;
            return content.map((item: any) => ({
                ...item,
                title: getWord(get(item, objPath)),
                contentType: type,
            }));
        }

        return [];
    };

    const getPreparedDepartmentsByBranchId = async (id: string) => {
        const response = await getDepartmentsByBranchId(id);

        return {
            department: getPreparedDepartments(response),
        };
    };
    const getPreparedDepartmentsByParentId = async (id: string) => {
        const response = await getDepartmentsByParentId(id);

        return {
            department: getPreparedDepartments(response),
        };
    };

    const getPreparedItemsByParentId = async (id: string) => {
        const response = await getBranchesByParentId({
            parentId: id,
            page: 0,
            size: 1000,
        });

        return {
            branch: getPreparedItems(response, "branch"),
        };
    };

    const getPreparedEmploymentsByDepartmentId = async (id: string) => {
        const response = await getEmploymentsByDepartmentId({
            departmentId: id,
            page: 0,
            size: 1000,
        });

        return {
            employment: getPreparedItems(
                response,
                "employment",
                "position.localaziableName",
            ),
        };
    };

    const generateNewColData = async (
        contents: StructureColumnType[],
        item: ColumnItemType,
    ) => {
        const promises = contents
            .map(({ type }) => {
                const { contentType } = item;

                const isContentDepartment =
                    type === "department" || type === "committee";
                const isItemDepartment =
                    contentType === "department" || contentType === "committee";

                if (contentType === "branch" && type === "branch") {
                    return getPreparedItemsByParentId(item.id);
                }

                if (contentType === "branch" && isContentDepartment) {
                    return getPreparedDepartmentsByBranchId(item.id);
                }

                // if(contentType === 'branch' && type === 'employment'){
                //    return getDepartmentsByBranchId(item.id)
                // }

                if (isItemDepartment && isContentDepartment) {
                    return getPreparedDepartmentsByParentId(item.id);
                }

                if (type === "employment") {
                    return getPreparedEmploymentsByDepartmentId(item.id);
                }

                return null;
            })
            .filter(Boolean);

        const resolved = await Promise.all(promises);

        return contents.map((content) => ({
            ...content,
            items:
                resolved.find((item) =>
                    Object.keys(item).includes(content.type),
                )?.[content.type] || [],
        }));
    };

    const deleteFuncs: Record<StructureColumnType["type"], any> = {
        structure: deleteStructureMutation,
        branch: deleteBranchMutation,
        department: deleteDepartmentMutation,
        committee: deleteDepartmentMutation,
        employment: deleteEmploymentMutation,
    };

    const createFuncs: Record<StructureColumnType["type"], any> = {
        structure: createStructureMutation,
        branch: createBranchMutation,
        department: createDepartmentMutation,
        committee: createDepartmentMutation,
        employment: createEmploymentMutation,
    };

    const updateFuncs: Record<StructureColumnType["type"], any> = {
        structure: updateStructureMutation,
        branch: updateBranchMutation,
        department: updateDepartmentMutation,
        committee: updateDepartmentMutation,
        employment: updateEmploymentMutation,
    };

    const columnStaticValues = (
        colIndex: number,
        contentIndex: number,
        contentType: StructureColumnType["type"],
    ) => {
        const allColSettings: Record<string, Array<ColSettingsType>> = {
            0: [
                {
                    type: "structure",
                    validationSchema: {},
                    getChildren: async (item) => {
                        const newData = { ...data };

                        newData[colIndex].next = colIndex + 1;

                        newData[colIndex + 1] = {
                            expanded: true,
                            prev: colIndex,
                            next: null,
                            content: [
                                {
                                    id: "0",
                                    title: `Офисы продаж (5)`,
                                    items: new Array(5).fill({}),
                                    type: "branch",
                                },
                            ],
                            loading: true,
                        };

                        setData(sliceData(newData, colIndex));
                        const response = await getBranchesByStructureId({
                            page: 0,
                            size: 1,
                            structureId: item.id,
                        });

                        if (
                            isPlainObject(response) &&
                            response.status === 200
                        ) {
                            const {
                                data: {
                                    result: {
                                        data: { content },
                                    },
                                },
                            } = response;

                            if (!Array.isArray(content)) {
                                return;
                            }

                            const branch = content?.[0];

                            if (!branch) {
                                return;
                            }

                            const res = await getDepartmentsByBranchId(
                                branch.id,
                            );
                            if (res.status !== 200) {
                                return;
                            }

                            branchId.current = branch.id;
                            const departments = get(
                                res,
                                "data.result.data.content",
                                [],
                            );

                            newData[colIndex + 1].content = [
                                {
                                    id: "0",
                                    title: `Структурное подразделение (${departments.length})`,
                                    items: get(
                                        res,
                                        "data.result.data.content",
                                        [],
                                    ).map((item: any) => ({
                                        id: item.id,
                                        title: getWord(
                                            item.departmentTemplate
                                                ?.localaziableName,
                                        ),
                                        ...item,
                                    })),
                                    type: "department",
                                },
                            ];
                            newData[colIndex + 1].loading = false;

                            setData(sliceData(newData, colIndex));
                        }
                    },
                    form: {
                        add: {
                            title: "Добавить структуру",
                            pending: createStructureMutation.isPending,
                            submit: (values) => {
                                createStructureMutation.mutate({
                                    sortOrder: data[0].content[0].items.length,
                                    localaziableName: values,
                                });
                            },
                            initialValues: {
                                ru: "",
                                en: "",
                                uzCr: "",
                            },
                        },
                        update: {
                            title: "",
                            pending: updateStructureMutation.isPending,
                            submit: (
                                { sortOrder, ...rest }: any,
                                _: ColumnItemType["contentType"],
                                itemId: string,
                            ) => {
                                updateStructureMutation.mutate({
                                    id: itemId,
                                    body: {
                                        localaziableName: rest,
                                        sortOrder,
                                        id: itemId,
                                    },
                                });
                            },
                            initialValues: {},
                        },
                    },
                },
            ],
            1: [
                {
                    type: "department",
                    validationSchema: null,
                    getChildren: async (item) => {
                        const contents = getColContents(item);

                        if (
                            item.contentType === "employment" ||
                            contents.length === 0
                        ) {
                            return;
                        }

                        const newData = { ...data };

                        newData[colIndex].next = colIndex + 1;

                        newData[colIndex + 1] = {
                            expanded: true,
                            prev: colIndex,
                            next: null,
                            content: [
                                {
                                    id: "0",
                                    title: `Офисы продаж (5)`,
                                    items: new Array(5).fill({}),
                                    type: "branch",
                                },
                            ],
                            loading: true,
                        };

                        setData(sliceData(newData, colIndex));

                        const newContent = await generateNewColData(
                            contents,
                            item,
                        );

                        newData[colIndex + 1].content = newContent;
                        newData[colIndex + 1].loading = false;

                        setData(sliceData(newData, colIndex));
                    },
                    form: {
                        add: {
                            title: "Добавить офис продаж",
                            pending: createFuncs[contentType].isPending,
                            submit: (values: any) => {
                                const { itemId: structureId } =
                                    getItemIdByColIndex(0, activeItems);

                                if (!structureId) {
                                    return;
                                }

                                createFuncs[contentType].mutate({
                                    ...values,
                                    departmentTemplate: {
                                        id: values.departmentTemplate?.value,
                                    },
                                    curator: {
                                        id: values.curator?.value,
                                    },
                                    branch: {
                                        id: branchId.current || "",
                                    },
                                });
                            },
                            initialValues: {},
                        },
                        update: {
                            title: "",
                            pending: updateFuncs[contentType].isPending,
                            submit: (values, contentType, itemId) => {
                                updateFuncs[contentType].mutate({
                                    body: {
                                        ...values,
                                        departmentTemplate: {
                                            id: values.departmentTemplate
                                                ?.value,
                                        },
                                        curator: {
                                            id: values.curator?.value,
                                        },
                                        branch: {
                                            id: branchId.current || "",
                                        },
                                        id: itemId,
                                    },
                                    id: itemId as string,
                                });
                            },
                            initialValues: {},
                        },
                    },
                },
            ],
        };

        if (!(colIndex in allColSettings)) {
            return {
                type: "structure",
                validationSchema: {},
                getChildren: allColSettings["1"][0].getChildren,
                form: {
                    add: {
                        title: "Добавить структуру",
                        pending: createFuncs[contentType].isPending,
                        submit: async (values, contentType) => {
                            if (!colIndex) {
                                return;
                            }

                            const {
                                itemId,

                                contentType: prevContentType,
                            } = getItemIdByColIndex(
                                data[colIndex]?.prev as number,
                                activeItems,
                            );

                            if (!itemId) {
                                return;
                            }

                            if (contentType === "branch") {
                                createBranchMutation.mutate(
                                    prepareBranchDto(
                                        values,
                                        itemId as string,
                                        true,
                                    ),
                                );
                            }

                            if (contentType === "employment") {
                                formValues.current = values;
                                createEmploymentMutation.mutate(
                                    prepareEmploymentDto({
                                        ...values,
                                        departmentId: itemId,
                                    }),
                                );
                            }

                            if (
                                contentType === "department" ||
                                contentType === "committee"
                            ) {
                                createDepartmentMutation.mutate({
                                    ...values,
                                    departmentTemplate: {
                                        id: values.departmentTemplate?.value,
                                    },
                                    curator: {
                                        id: values.curator?.value,
                                    },
                                    [prevContentType === "branch"
                                        ? "branch"
                                        : "parent"]: {
                                        id: itemId || "",
                                    },
                                });
                            }
                        },
                        initialValues: {
                            departmentTemplate: null,
                            sortOrder: null,
                            ...DEFAULT_STRUCTURE_CONTENT_VALUES,
                        },
                    },
                    update: {
                        title: "",
                        pending: updateFuncs[contentType].isPending,
                        submit: async (values, contentType, itemId) => {
                            if (!colIndex || !itemId) {
                                return;
                            }

                            const {
                                contentType: prevContentType,
                                itemId: parentId,
                            } = getItemIdByColIndex(
                                data[colIndex]?.prev as number,
                                activeItems,
                            );

                            if (contentType === "branch") {
                                updateBranchMutation.mutate({
                                    body: {
                                        ...prepareBranchDto(
                                            values,
                                            itemId,
                                            true,
                                        ),
                                        id: itemId,
                                    },
                                    id: itemId,
                                });
                            }

                            if (contentType === "employment") {
                                formValues.current = values;
                                updateEmploymentMutation.mutate(
                                    prepareEmploymentDto({
                                        ...values,
                                        departmentId: parentId,
                                        id: itemId,
                                    }),
                                );
                            }

                            if (
                                contentType === "department" ||
                                contentType === "committee"
                            ) {
                                updateDepartmentMutation.mutate({
                                    body: {
                                        ...values,
                                        departmentTemplate: {
                                            id: values.departmentTemplate
                                                ?.value,
                                        },
                                        curator: {
                                            id: values.curator?.value,
                                        },
                                        [prevContentType === "branch"
                                            ? "branch"
                                            : "parent"]: {
                                            id: parentId,
                                        },
                                        id: itemId,
                                    },
                                    id: itemId,
                                });
                            }
                        },
                        initialValues: {},
                    },
                },
            } as ColSettingsType;
        }

        // @ts-expect-error TODO
        return allColSettings[colIndex][contentIndex];
    };

    return {
        columnStaticValues,
        data,
        setData,
        modal,
        setModal,
        toggleActiveItems,
        activeItems,
        deleteFuncs,
        handleCloseModal,
        employeeCard,
        setEmployeeCard,
    };
};

export default useStructure;
