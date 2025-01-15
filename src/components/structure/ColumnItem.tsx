import { FC } from "react";
import { twMerge } from "tailwind-merge";
import ArrowRight2 from "../icons/ArrowRight2";
import {
    ColumnItemComponentProps,
    StructureColumnType,
} from "./structure.types";

import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import { IconButton } from "@material-tailwind/react";
import Skeleton from "react-loading-skeleton";
import TableEdit from "../icons/TableEdit";
import TableTrash from "../icons/TableTrash";
import ZTruncatedText from "../z-components/ZTruncatedText";
import useStructureContext from "./_hooks/useStructureContext";
import EmploymentItem from "./EmploymentItem";
import { createStructureItemKey } from "./structure.utils";

const ColumnItem: FC<ColumnItemComponentProps> = ({
    colIndex,
    contentIndex,
    columnExpanded,
    loading,
    ...rest
}) => {
    const { getWord } = useKeyTranslation();
    const {
        columnStaticValues,
        toggleActiveItems,
        activeItems,

        setModal,
    } = useStructureContext();

    const { id, title, contentType } = rest;

    const active =
        activeItems[
            createStructureItemKey({
                colIndex,
                contentIndex,
                itemId: id,
                contentType,
            })
        ];

    const initialValues: Record<StructureColumnType["type"], any> = {
        structure: {
            ...rest,
            ...rest.localaziableName,
            sortOrder: rest.sortOrder,
        },
        branch: {
            ...rest,
            ...rest.localaziableName,
            sortOrder: rest.sortOrder,
            district: {
                label: getWord(rest.district?.localaziableName),
                value: rest.district?.id,
            },
            region: {
                label: getWord(rest.region?.localaziableName),
                value: rest.region?.id,
            },
        },
        department: {
            ...rest,
            departmentTemplate: {
                label: getWord(rest.departmentTemplate?.localaziableName),
                value: rest.departmentTemplate?.id,
            },
        },
        committee: {
            ...rest,
            departmentTemplate: {
                label: getWord(rest.departmentTemplate?.localaziableName),
                value: rest.departmentTemplate?.id,
            },
        },
        employment: {
            ...rest,
            position: {
                label: getWord(rest.position?.localaziableName),
                value: rest.position?.id,
            },
            roles: Array.isArray(rest?.roles)
                ? rest.roles.map((role) => ({
                      label: getWord(role.localaziableName),
                      value: role.id,
                  }))
                : [],
        },
    };

    return (
        <article
            className={twMerge(
                "py-4 h-14 group/item px-6 cursor-pointer border-b border-neutral-300 flex items-center justify-between",
                active && "bg-c_primary-500 text-white",
                !active && "hover:bg-c_neutral-50",
                !columnExpanded && "pointer-events-none",
                loading && "pointer-events-none",
            )}
            onClick={() => {
                if (active) {
                    return;
                }

                toggleActiveItems({
                    colIndex,
                    contentIndex,
                    itemId: id,
                    contentType,
                    ...(contentType === "employment" && { item: rest }),
                });

                if (contentType !== "employment") {
                    columnStaticValues(
                        colIndex,
                        contentIndex,
                        contentType,
                    ).getChildren(rest);
                }
            }}
        >
            {contentType === "employment" ? (
                <EmploymentItem active={active} {...rest} />
            ) : (
                <ZTruncatedText className="text-b-2-m [word-break:break-word] line-clamp-2">
                    {loading ? (
                        <>
                            <Skeleton height={15} width={180} />
                            <Skeleton height={15} width={120} />
                        </>
                    ) : (
                        title
                    )}
                </ZTruncatedText>
            )}

            <div className="flex items-center">
                <IconButton
                    size="sm"
                    className={twMerge("hidden group-hover/item:flex")}
                    variant="text"
                    onClick={(e) => {
                        e.stopPropagation();

                        setModal({
                            colIndex,
                            contentIndex,
                            action: "delete",
                            itemId: id,
                            type: contentType,
                            initialValues: initialValues[contentType],
                        });
                    }}
                >
                    <TableTrash
                        size="sm"
                        className={twMerge(
                            "[&>path]:stroke-c_error-500",
                            active && "[&>path]:stroke-white",
                        )}
                    />
                </IconButton>
                <IconButton
                    size="sm"
                    variant="text"
                    className={twMerge("hidden group-hover/item:flex")}
                    onClick={(e) => {
                        e.stopPropagation();
                        setModal({
                            colIndex,
                            contentIndex,
                            action: "update",
                            itemId: id,
                            type: contentType,
                            initialValues: initialValues[contentType],
                        });
                    }}
                >
                    <TableEdit
                        size="sm"
                        className={twMerge(
                            "[&_path]:stroke-c_neutral-600",
                            active && " [&_path]:stroke-white",
                        )}
                    />
                </IconButton>
                {contentType !== "employment" &&
                    (loading ? (
                        <Skeleton width={20} height={20} />
                    ) : (
                        <ArrowRight2
                            size="md"
                            className={twMerge(
                                active && "[&>path]:stroke-white",
                                !active && "[&>path]:stroke-c_neutral-600",
                            )}
                        />
                    ))}
            </div>
        </article>
    );
};

export default ColumnItem;
