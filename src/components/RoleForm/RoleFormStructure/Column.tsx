import React, { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ColumnType } from "../RoleForm.types";
import ArrowLeft from "@/components/icons/ArrowLeft2";
import ArrowLeft2 from "@/components/icons/ArrowLeft2";
import ColumnItem from "./ColumnItem";
import useRoleFormContext from "../useRoleFormContext";
import { createMockArray } from "@/utils/common";
import Skeleton from "react-loading-skeleton";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

interface ColumnProps {
    colIndex: number;
    className?: string;
    content: ColumnType["content"];
    expanded: boolean;
    next: number | null;
}

const Column: FC<ColumnProps> = ({
    colIndex,
    className,
    content,
    expanded,
}) => {
    const { t } = useAppTranslations();
    const [collapsedTitle, setCollapsedTitle] = useState("");
    const { toggleExpand, loadingRoles } = useRoleFormContext();
    //   const { handleAdd, columnStaticValues } = useRoleFormContext();

    const list = Object.values(content);

    const listWithItemsLen = list.filter(
        (item) => Object.keys(item.items).length > 0,
    ).length;

    const mockItems = new Array(5).fill({});
    const mockList = createMockArray({}, 1);

    return (
        <div
            onClick={() => {
                if (expanded) {
                    return;
                }

                toggleExpand(colIndex);
            }}
            className={twMerge(
                "relative flex-shrink-0 group transition-all  duration-500 border-r border-r-c_neutral-300  w-[300px]",
                className,
                "h-full",
                !expanded && "w-[60px] bg-gray-400 cursor-pointer",
            )}
        >
            <div
                className={twMerge(
                    "h-full overflow-x-hidden transition-all duration-500",
                    !expanded && "opacity-0",
                )}
            >
                {(!loadingRoles ? list : mockList).map(
                    ({ title, items = {} }, contentIndex: number) => {
                        const itemsLen = Object.values(items).length;

                        if (itemsLen === 0 && !loadingRoles) {
                            return;
                        }

                        return (
                            <div
                                key={contentIndex}
                                style={{ height: `${100 / listWithItemsLen}%` }}
                            >
                                <div
                                    className={twMerge(
                                        "py-3 px-6 bg-c_neutral-25 h-[60px]  border-b border-c_neutral-100 flex sticky items-center justify-between  top-0",
                                    )}
                                >
                                    <span
                                        className={twMerge(
                                            "text-b-3-m text-c_neutral-500 font-medium whitespace-nowrap",
                                        )}
                                    >
                                        {!loadingRoles ? (
                                            t(title)
                                        ) : (
                                            <Skeleton width={120} />
                                        )}
                                    </span>
                                </div>
                                <div
                                    className={twMerge("overflow-y-auto")}
                                    style={{ height: `calc(100%  - 60px)` }}
                                >
                                    {Object.values(
                                        loadingRoles ? mockItems : items,
                                    ).map((_, k) => (
                                        <ColumnItem
                                            key={k}
                                            itemIndex={k}
                                            colIndex={colIndex}
                                            contentIndex={contentIndex}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    },
                )}
            </div>

            <div
                className={twMerge(
                    "absolute opacity-0 hidden top-1/2 -translate-y-1/2 align-center delay-400 transition-all duration-100",
                    !expanded &&
                        "flex items-center opacity-100 [writing-mode:tb] -rotate-180 w-full",
                )}
            >
                <ArrowLeft2 size="md" />
                <span className="my-2">{t(collapsedTitle)}</span>
                <ArrowLeft2 size="md" />
            </div>

            <div
                onClick={() => {
                    toggleExpand(colIndex);
                    setCollapsedTitle(content?.[0]?.title);
                }}
                className={twMerge(
                    "absolute border top-1/2 right-[-10px] -translate-y-1/2 border-c_neutral-300 bg-c_primary-500 h-5 w-5 rounded z-10 flex items-center justify-center cursor-pointer opacity-0",
                    expanded && "group-hover:opacity-100",
                )}
            >
                <ArrowLeft className="[&>path]:stroke-white" />
            </div>
        </div>
    );
};

export default Column;
