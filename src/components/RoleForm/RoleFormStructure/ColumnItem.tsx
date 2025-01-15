import ArrowRight2 from "@/components/icons/ArrowRight2";
import { ZCheckbox } from "@/components/z-components/FormElements";
import get from "lodash.get";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";
import { StructurePrimaryObject } from "../RoleForm.types";
import { getCheckboxStatus } from "../RoleForm.utils";
import useRoleFormContext from "../useRoleFormContext";
import ZTruncatedText from "@/components/z-components/ZTruncatedText";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

interface ColumnItemProps extends StructurePrimaryObject {}

const getStatus = ({ checked, partiallyChecked }: any) =>
    checked ? "checked" : partiallyChecked ? "indeterminate" : "unchecked";

const ColumnItem: FC<ColumnItemProps> = ({
    colIndex,
    itemIndex,
    contentIndex,
}) => {
    const { t } = useAppTranslations();
    const {
        structure,
        structureSettings,
        activeKeys,
        handleItemClick,
        values,
        setValues,
        modules,
        getItemIndexByColIndex,
        loadingRoles,
    } = useRoleFormContext();

    const {
        title,
        id: currentItemId,
        type,
        ...rest
    } = structure[colIndex].content[contentIndex].items[itemIndex] || {};

    const active = get(
        activeKeys,
        `${colIndex}.${contentIndex}.${itemIndex}.active`,
        false,
    );

    const moduleIndex =
        type === "module" ? itemIndex : (getItemIndexByColIndex(0) as number);
    const subModuleIndex =
        type === "sub-module"
            ? itemIndex
            : (getItemIndexByColIndex(1) as number);
    const pageIndex =
        type === "page" ? itemIndex : (getItemIndexByColIndex(2) as number);
    const tabIndex =
        type === "page" ? itemIndex : (getItemIndexByColIndex(3) as number);

    const check = getCheckboxStatus({
        modules,
        moduleIndex,
        subModuleIndex,
        pageIndex,
    });

    const handleCheckbox = () => {
        switch (type) {
            case "sub-module":
                {
                    const currentModule = modules[moduleIndex];
                    const subModule = currentModule.subModules[itemIndex];
                    const newValues: any = {};

                    newValues[subModule.id] =
                        values[subModule.id] === "unchecked" ||
                        values[subModule.id] === "indeterminate" ||
                        !values[subModule.id]
                            ? "checked"
                            : "unchecked";

                    subModule.pages.forEach((page) => {
                        newValues[page.id] =
                            newValues[subModule.id] === "checked"
                                ? "checked"
                                : values[page.id] === "checked"
                                  ? "unchecked"
                                  : "checked";

                        page?.tabs.forEach(({ id, permissions }) => {
                            newValues[id] =
                                newValues[subModule.id] === "checked"
                                    ? "checked"
                                    : values[id] === "checked"
                                      ? "unchecked"
                                      : "checked";
                            permissions.forEach(({ id }) => {
                                newValues[id] =
                                    newValues[subModule.id] === "checked"
                                        ? "checked"
                                        : values[id] === "checked"
                                          ? "unchecked"
                                          : "checked";
                            });
                        });

                        page?.permissions.forEach(({ id }) => {
                            newValues[id] =
                                newValues[subModule.id] === "checked"
                                    ? "checked"
                                    : values[id] === "checked"
                                      ? "unchecked"
                                      : "checked";
                        });
                    });

                    setValues((prev) => ({ ...prev, ...newValues }));
                }
                break;
            case "page":
                {
                    const subModule =
                        modules[moduleIndex].subModules[subModuleIndex];
                    const page = subModule.pages[itemIndex];

                    const newValues: any = {};

                    newValues[page.id] =
                        values[page.id] === "unchecked" ||
                        values[page.id] === "indeterminate" ||
                        !values[page.id]
                            ? "checked"
                            : "unchecked";

                    page?.tabs.forEach(({ id, permissions }) => {
                        newValues[id] =
                            newValues[page.id] === "checked"
                                ? "checked"
                                : values[id] === "checked"
                                  ? "unchecked"
                                  : "checked";
                        permissions.forEach(({ id }) => {
                            newValues[id] =
                                newValues[page.id] === "checked"
                                    ? "checked"
                                    : values[id] === "checked"
                                      ? "unchecked"
                                      : "checked";
                        });
                    });

                    page?.permissions.forEach(({ id }) => {
                        newValues[id] =
                            newValues[page.id] === "checked"
                                ? "checked"
                                : values[id] === "checked"
                                  ? "unchecked"
                                  : "checked";
                    });

                    newValues[subModule.id] = getStatus(
                        check["subModule"](subModuleIndex, {
                            ...values,
                            ...newValues,
                        }),
                    );

                    setValues((prev) => ({ ...prev, ...newValues }));
                }
                break;
            case "tab":
                {
                    const subModule =
                        modules[moduleIndex].subModules[subModuleIndex];
                    const page =
                        modules[moduleIndex].subModules[subModuleIndex].pages[
                            pageIndex
                        ];
                    const tab = page.tabs[itemIndex];

                    const newValues: any = {};

                    newValues[tab.id] =
                        values[tab.id] === "unchecked" ||
                        values[tab.id] === "indeterminate" ||
                        !values[tab.id]
                            ? "checked"
                            : "unchecked";

                    tab?.permissions.forEach(({ id }) => {
                        newValues[id] =
                            newValues[tab.id] === "checked"
                                ? "checked"
                                : values[id] === "checked"
                                  ? "unchecked"
                                  : "checked";
                    });

                    newValues[page.id] = getStatus(
                        check["page"](pageIndex, {
                            ...values,
                            ...newValues,
                        }),
                    );
                    newValues[subModule.id] = getStatus(
                        check["subModule"](subModuleIndex, {
                            ...values,
                            ...newValues,
                        }),
                    );

                    setValues((prev) => ({ ...prev, ...newValues }));
                }
                break;
            case "permission":
                {
                    const tab =
                        modules[moduleIndex].subModules[subModuleIndex].pages[
                            pageIndex
                        ].tabs[tabIndex];

                    const page =
                        modules[moduleIndex].subModules[subModuleIndex].pages[
                            pageIndex
                        ];

                    const subModule =
                        modules[moduleIndex].subModules[subModuleIndex];

                    const newPermissionStatus =
                        values[currentItemId] === "checked"
                            ? "unchecked"
                            : "checked";

                    const newValues: any = {
                        ...values,
                        [currentItemId]: newPermissionStatus,
                    };

                    newValues[tab?.id] = getStatus(
                        check["tab"](tabIndex, newValues),
                    );
                    newValues[page.id] = getStatus(
                        check["page"](pageIndex, newValues),
                    );
                    newValues[subModule.id] = getStatus(
                        check["subModule"](subModuleIndex, newValues),
                    );

                    setValues((prev) => ({
                        ...prev,
                        ...newValues,
                    }));
                }

                break;
            default:
                break;
        }
    };

    return (
        <article
            className={twMerge(
                "relative group/item pl-0 cursor-pointer border-b border-neutral-300 flex items-center",
                active && "bg-c_primary-500 text-white",
                !active && "hover:bg-c_neutral-50",
                loadingRoles && "pointer-events-none",
            )}
        >
            <div
                className={twMerge([
                    "w-full py-4  pr-6 pl-[52px] h-full flex items-center",
                    colIndex === 0 && "pl-6",
                ])}
                onClick={() => {
                    if (active || rest.end) {
                        return;
                    }
                    handleItemClick({ colIndex, contentIndex, itemIndex });
                    structureSettings[colIndex].getChildren({
                        contentIndex,
                        itemIndex,
                    });
                }}
            >
                <ZTruncatedText className="text-b-2-m line-clamp-2 [word-break:break-word]">
                    {!loadingRoles ? (
                        t(title)
                    ) : (
                        <Skeleton width={240} height={25} />
                    )}
                    {/* {Object.hasOwn(values, currentItemId).toString()}{' '}
          {values?.[currentItemId]?.toString()} */}
                </ZTruncatedText>
                {/* <span>{currentItemId}</span> */}
                {!rest.end && !loadingRoles && (
                    <div className="flex items-center ml-auto">
                        <ArrowRight2
                            size="md"
                            className={twMerge(
                                active && "[&>path]:stroke-white",
                                !active && "[&>path]:stroke-c_neutral-600",
                            )}
                        />
                    </div>
                )}
            </div>
            {colIndex > 0 && (
                <ZCheckbox
                    rootClassName="absolute top-1/2 z-10 -translate-y-1/2  left-6"
                    className="w-5 h-5"
                    checked={values[currentItemId] === "checked"}
                    onChange={handleCheckbox}
                    indeterminate={values[currentItemId] === "indeterminate"}
                    // {...(!rest.end && {
                    //   ...(!check?.checked && { indeterminate: check?.partiallyChecked }),
                    //   checked: check?.checked,
                    // })}
                />
            )}
        </article>
    );
};

export default ColumnItem;
