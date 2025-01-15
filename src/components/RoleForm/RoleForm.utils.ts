import { ModuleType, PageType } from "@/providers/redux/slices/userSlice";
import { CheckboxValueVariants } from "@/types/ui.types";

export const getCheckboxStatus = ({
    modules,
    moduleIndex,
    subModuleIndex,
    pageIndex,
}: {
    modules: ModuleType[];
    moduleIndex: number;
    subModuleIndex: number;
    pageIndex: number;
}) => {
    return {
        tab: (
            index: number,
            values: Record<string, "checked" | "unchecked" | "indeterminate">,
        ) => {
            if (
                moduleIndex === null ||
                subModuleIndex === null ||
                pageIndex === null
            ) {
                return {
                    checked: false,
                    partiallyChecked: false,
                };
            }

            let allChecked = true;

            let partiallyChecked = false;

            const permissions =
                modules[moduleIndex].subModules[subModuleIndex].pages[pageIndex]
                    .tabs[index]?.permissions || [];

            for (let i = 0; i < permissions.length; i++) {
                const { id } = permissions[i];
                if (values?.[id] === "checked") {
                    partiallyChecked = true;
                }

                if (values?.[id] !== "checked") {
                    allChecked = false;
                }
            }

            return {
                checked: allChecked,
                partiallyChecked,
            };
        },
        page: (
            index: number,
            values: Record<string, "checked" | "unchecked" | "indeterminate">,
        ) => {
            if (moduleIndex === null || subModuleIndex === null) {
                return {
                    checked: false,
                    partiallyChecked: false,
                };
            }
            const page =
                modules[moduleIndex].subModules[subModuleIndex].pages[index];

            let allChecked = true;
            let partiallyChecked = false;

            const permissions = page.permissions || [];
            const tabs = page.tabs || [];

            for (let i = 0; i < permissions.length; i++) {
                const { id } = permissions[i];

                if (values?.[id] === "checked") {
                    partiallyChecked = true;
                }

                if (values?.[id] !== "checked") {
                    allChecked = false;
                }
            }
            for (let i = 0; i < tabs.length; i++) {
                const { id } = tabs[i];

                if (values?.[id] === "checked") {
                    partiallyChecked = true;
                }

                if (values?.[id] !== "checked") {
                    allChecked = false;
                }
            }

            return {
                checked: allChecked,
                partiallyChecked,
            };
        },
        subModule: (
            index: number,
            values: Record<string, "checked" | "unchecked" | "indeterminate">,
        ) => {
            if (moduleIndex === null) {
                return {
                    checked: false,
                    partiallyChecked: false,
                };
            }

            let allChecked = true;
            let partiallyChecked = false;

            const subModule = modules[moduleIndex].subModules[index];

            const pages = subModule.pages;

            for (let i = 0; i < pages.length; i++) {
                const { id } = pages[i];

                if (
                    values?.[id] === "checked" ||
                    values?.[id] === "indeterminate"
                ) {
                    partiallyChecked = true;
                }

                if (values?.[id] !== "checked") {
                    allChecked = false;
                }
            }

            return {
                checked: allChecked,
                partiallyChecked,
            };
        },
        module: (
            index: number,
            values: Record<string, "checked" | "unchecked" | "indeterminate">,
        ) => {
            let allChecked = true;
            let partiallyChecked = false;

            const subModules = modules[index].subModules;

            for (let i = 0; i < subModules.length; i++) {
                const { id } = subModules[i];

                if (values?.[id] === "checked") {
                    partiallyChecked = true;
                }

                if (values?.[id] !== "checked") {
                    allChecked = false;
                }
            }

            return {
                checked: allChecked,
                partiallyChecked,
            };
        },
    };
};

export const prepareModulesDto = (
    modules: ModuleType[],
    values: Record<string, CheckboxValueVariants>,
) => {
    if (!Array.isArray(modules)) {
        return {
            pages: [],
            modules: {},
        };
    }

    const pages: PageType[] = [];
    modules.forEach((module) => {
        module.subModules.forEach((subModule) => {
            subModule.checked =
                values[subModule.id] === "checked" ||
                values[subModule.id] === "indeterminate";
            subModule.pages.forEach((page) => {
                page.checked =
                    values[page.id] === "indeterminate" ||
                    values[page.id] === "checked";

                if (page.checked) {
                    pages.push(page);
                }
                page.permissions?.forEach((pageLevelPermission) => {
                    pageLevelPermission.checked =
                        values[pageLevelPermission.id] === "checked" ||
                        values[pageLevelPermission.id] === "indeterminate";
                });

                page.tabs?.forEach((tab) => {
                    tab.checked =
                        values[tab.id] === "checked" ||
                        values[tab.id] === "indeterminate";
                    tab.permissions.forEach((tabLevelPermission) => {
                        tabLevelPermission.checked =
                            values[tabLevelPermission.id] === "checked" ||
                            values[tabLevelPermission.id] === "indeterminate";
                    });
                });
            });
        });
    });

    return {
        pages,
        modules,
    };
};

export const getInitialValues = (modules: ModuleType[]) => {
    const values: Record<string, CheckboxValueVariants> = {};

    modules.forEach((module) => {
        module.subModules.forEach((subModule) => {
            subModule.pages.forEach((page) => {
                page.permissions.forEach((permission) => {
                    values[permission.id] = permission.checked
                        ? "checked"
                        : "unchecked";
                });

                page.tabs.forEach((tab) => {
                    tab.permissions.forEach((permission) => {
                        values[permission.id] = permission.checked
                            ? "checked"
                            : "unchecked";
                    });

                    values[tab.id] =
                        tab.permissions.length === 0
                            ? tab.checked
                                ? "checked"
                                : "unchecked"
                            : tab.permissions.every(
                                    (permission) => permission.checked,
                                )
                              ? "checked"
                              : tab.permissions.some(
                                      (permission) => permission.checked,
                                  )
                                ? "indeterminate"
                                : "unchecked";
                });

                const pagePermissionCase =
                    page.permissions.length === 0
                        ? page.checked
                            ? "checked"
                            : "unchecked"
                        : page.permissions.every(
                                (permission) => permission.checked,
                            )
                          ? "checked"
                          : page.permissions.some(
                                  (permission) => permission.checked,
                              )
                            ? "indeterminate"
                            : "unchecked";

                const pageTabCase =
                    page.tabs.length === 0
                        ? page.checked
                            ? "checked"
                            : "unchecked"
                        : page.tabs.every((tab) => tab.checked)
                          ? "checked"
                          : page.tabs.some((tab) => tab.checked)
                            ? "indeterminate"
                            : "unchecked";

                values[page.id] =
                    pagePermissionCase === "indeterminate" ||
                    pageTabCase === "indeterminate"
                        ? "indeterminate"
                        : pagePermissionCase === "checked" &&
                            pageTabCase === "checked"
                          ? "checked"
                          : pagePermissionCase === "unchecked" &&
                              pageTabCase === "unchecked"
                            ? "unchecked"
                            : pagePermissionCase === "checked" ||
                                pageTabCase === "checked"
                              ? "indeterminate"
                              : "unchecked";
            });

            values[subModule.id] =
                subModule.pages.length === 0
                    ? subModule.checked
                        ? "checked"
                        : "unchecked"
                    : subModule.pages.every(
                            (page) => values[page.id] === "checked",
                        )
                      ? "checked"
                      : subModule.pages.some(
                              (page) =>
                                  values[page.id] === "checked" ||
                                  values[page.id] === "indeterminate",
                          )
                        ? "indeterminate"
                        : "unchecked";
        });
    });

    return values;
};
