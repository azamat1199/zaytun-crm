import { ModuleType } from "@/providers/redux/slices/userSlice";
import get from "lodash.get";
import pick from "lodash.pick";
import range from "lodash.range";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ColumnType, StructurePrimaryObject } from "./RoleForm.types";
import { getInitialValues } from "./RoleForm.utils";

const useRoleFormController = (modules: ModuleType[], isEdit?: boolean) => {
    const [activeKeys, setActiveKeys] = useState<
        Record<
            string,
            Record<string, Record<string, { active: boolean; index: number }>>
        >
    >({});
    const [values, setValues] = useState<
        Record<string, "checked" | "indeterminate" | "unchecked">
    >({});
    const [structure, setStructure] = useState<Record<string, ColumnType>>({});

    useEffect(() => {
        if (isEdit) {
            setValues(getInitialValues(modules));
        }
    }, [modules, isEdit]);

    useEffect(() => {
        setStructure({
            0: {
                expanded: true,
                content: {
                    0: {
                        title: "Подсистема",
                        items:
                            modules?.reduce(
                                (acc, cur, index) => ({
                                    ...acc,
                                    [index]: {
                                        ...cur,
                                        type: "module",
                                        title: cur.code,
                                    },
                                }),
                                {},
                            ) || {},
                    },
                },
                prev: null,
                next: 1,
            },
        });
    }, [modules]);

    const handleItemClick = ({
        colIndex,
        contentIndex,
        itemIndex,
    }: StructurePrimaryObject) => {
        setActiveKeys((prev) => ({
            ...prev,
            [colIndex]: {
                [contentIndex]: {
                    [itemIndex]: { active: true, index: itemIndex },
                },
            },
        }));
    };

    const getItemIndexByColIndex = (colIndex: number) => {
        try {
            return Object.values(
                Object.values(activeKeys[colIndex])[0] || {},
            )[0].index;
        } catch (e) {
            return null;
        }
    };

    const getPrevStructure = (colIndex: number) =>
        pick(structure, range(0, colIndex + 1));

    const inActiveItems = (colIndex: number) => {
        setActiveKeys((prev) =>
            Object.values(prev).reduce(
                (acc, cur, index) => ({
                    ...acc,
                    ...(colIndex >= index && { [index]: cur }),
                }),
                {} as any,
            ),
        );
    };

    const structureSettings: Record<
        string,
        {
            getChildren: ({
                itemIndex,
                contentIndex,
            }: {
                itemIndex: number;
                contentIndex: number;
            }) => void;
        }
    > = {
        0: {
            getChildren: ({ itemIndex }) => {
                const { subModules } = modules[itemIndex];

                setStructure({
                    ...getPrevStructure(0),
                    ...(subModules.length > 0 && {
                        1: {
                            expanded: true,
                            prev: 0,
                            next: 2,
                            content: {
                                0: {
                                    title: "Модуль",
                                    items: subModules.reduce(
                                        (acc, cur, index) => ({
                                            ...acc,
                                            [index]: {
                                                ...cur,
                                                title: cur.code,
                                                type: "sub-module",
                                                end:
                                                    subModules[index].pages
                                                        .length === 0,
                                            },
                                        }),
                                        {},
                                    ),
                                },
                            },
                        },
                    }),
                });

                inActiveItems(0);
            },
        },
        1: {
            getChildren({ itemIndex }) {
                const moduleIndex = getItemIndexByColIndex(0);

                if (moduleIndex === null) {
                    return;
                }

                const { pages } = modules[moduleIndex].subModules[itemIndex];

                setStructure({
                    ...getPrevStructure(1),
                    ...(pages.length > 0 && {
                        2: {
                            expanded: true,
                            prev: 1,
                            next: 3,
                            content: {
                                0: {
                                    title: "Pages",
                                    items: pages.reduce(
                                        (acc, cur, index) => ({
                                            ...acc,
                                            [index]: {
                                                ...cur,
                                                title: cur.code,
                                                type: "page",
                                                end:
                                                    pages[index].tabs.length ===
                                                        0 &&
                                                    get(
                                                        pages[index],
                                                        "permission",
                                                        [],
                                                    ).length === 0,
                                            },
                                        }),
                                        {},
                                    ),
                                },
                            },
                        },
                    }),
                });
                inActiveItems(1);
            },
        },
        2: {
            getChildren({ itemIndex }) {
                const moduleIndex = getItemIndexByColIndex(0) as number;
                const subModuleIndex = getItemIndexByColIndex(1) as number;
                const { permissions, tabs } =
                    modules[moduleIndex].subModules[subModuleIndex].pages[
                        itemIndex
                    ];

                const content = [
                    permissions.length > 0 && {
                        title: "Permissions",
                        items: permissions.reduce(
                            (acc, cur, index) => ({
                                ...acc,
                                [index]: {
                                    ...cur,
                                    type: "permission",
                                    title: cur.code,
                                    end: true,
                                },
                            }),
                            {},
                        ),
                    },
                    tabs.length > 0 && {
                        title: "Tabs",
                        items: tabs.reduce(
                            (acc, cur, index) => ({
                                ...acc,
                                [index]: {
                                    ...cur,
                                    title: cur.code,
                                    type: "tab",
                                    end: tabs[index].permissions.length === 0,
                                },
                            }),
                            {},
                        ),
                    },
                ].filter(Boolean);

                setStructure({
                    ...getPrevStructure(2),
                    ...(content.length > 0 && {
                        3: {
                            expanded: true,
                            prev: 2,
                            next: 4,
                            content: Object.values(content).reduce(
                                (acc, cur, index) => ({
                                    ...acc,
                                    ...{ [index]: cur },
                                }),
                                {},
                            ),
                        },
                    }),
                });

                inActiveItems(2);
            },
        },
        3: {
            getChildren({ itemIndex, contentIndex }) {
                if (contentIndex === 0) {
                    return;
                }
                const moduleIndex = getItemIndexByColIndex(0) as number;
                const subModuleIndex = getItemIndexByColIndex(1) as number;
                const pageIndex = getItemIndexByColIndex(2) as number;
                const { permissions } =
                    modules[moduleIndex].subModules[subModuleIndex].pages[
                        pageIndex
                    ].tabs[itemIndex];

                setStructure({
                    ...getPrevStructure(3),
                    ...(permissions.length > 0 && {
                        4: {
                            prev: 3,
                            next: null,
                            content: {
                                0: {
                                    title: "Permissions",
                                    items: permissions.reduce(
                                        (acc, cur, index) => ({
                                            ...acc,
                                            [index]: {
                                                ...cur,
                                                type: "permission",
                                                title: cur.code,
                                                end: true,
                                            },
                                        }),
                                        {},
                                    ),
                                },
                            },
                            expanded: true,
                        },
                    }),
                });

                inActiveItems(3);
            },
        },
    };

    const toggleExpand = useCallback(
        (colIndex: number) => {
            const newData = { ...structure };

            structure[colIndex].expanded = !structure[colIndex].expanded;
            setStructure(newData);
        },
        [structure],
    );

    const colLen = useMemo(() => Object.values(structure).length, [structure]);

    return {
        structure,
        structureSettings,
        handleItemClick,
        activeKeys,
        toggleExpand,
        values,
        setValues,
        modules,
        getItemIndexByColIndex,
        colLen,
        isEdit,
    };
};

export default useRoleFormController;
