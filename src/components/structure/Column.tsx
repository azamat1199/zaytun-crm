import { IconButton } from "@material-tailwind/react";
import { FC, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";
import ArrowLeft2 from "../icons/ArrowLeft2";
import { RoundedPlusIcon } from "../icons/rounded-plus-icon";
import useStructureContext from "./_hooks/useStructureContext";
import ColumnItem from "./ColumnItem";
import { StructureColumnType } from "./structure.types";

interface ColumnProps {
    index: number;
    className?: string;
    content: StructureColumnType[];
    expanded: boolean;
    next: number | null;
    toggleExpand: (colIndex: number) => void;
    loading?: boolean;
}

const Column: FC<ColumnProps> = ({
    index,
    className,
    content,
    expanded,
    toggleExpand,
    loading,
}) => {
    const [collapsedTitle, setCollapsedTitle] = useState("");
    const { handleAdd } = useStructureContext();

    return (
        <div
            onClick={() => {
                if (expanded) {
                    return;
                }

                toggleExpand(index);
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
                {content.map(({ title, items = [], id, type }, i: number) => (
                    <div
                        key={id}
                        style={{ height: `${100 / content.length}%` }}
                    >
                        <div
                            className={twMerge(
                                "py-3 px-6 bg-c_neutral-25 h-[60px]  border-b border-c_neutral-100 flex sticky items-center justify-between  top-0",
                            )}
                        >
                            <span
                                className={twMerge(
                                    "text-b-3-m text-c_neutral-500 font-medium",
                                )}
                            >
                                {loading ? <Skeleton width={180} /> : title}
                            </span>

                            <IconButton
                                placeholder=""
                                ripple={false}
                                variant="text"
                                onClick={() => {
                                    handleAdd({
                                        type: type as StructureColumnType["type"],
                                        colIndex: index,
                                        contentIndex: i,
                                    });
                                }}
                            >
                                <RoundedPlusIcon className="stroke-c_neutral-600 cursor-pointer" />
                            </IconButton>
                        </div>
                        <div
                            className={twMerge("overflow-y-auto")}
                            style={{ height: `calc(100%  - 60px)` }}
                        >
                            {items.map(
                                // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
                                ({ title, id, contentType, ...rest }, j) => (
                                    <ColumnItem
                                        key={id}
                                        index={j}
                                        title={title}
                                        id={id}
                                        contentIndex={i}
                                        colIndex={index}
                                        contentType={type}
                                        columnExpanded={expanded}
                                        loading={loading}
                                        {...rest}
                                    />
                                ),
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div
                className={twMerge(
                    "absolute opacity-0 hidden top-1/2 -translate-y-1/2 align-center delay-400 transition-all duration-100",
                    !expanded &&
                        "flex items-center opacity-100 [writing-mode:tb] -rotate-180 w-full",
                )}
            >
                <ArrowLeft2 size="md" />
                <span className="my-2">{collapsedTitle}</span>
                <ArrowLeft2 size="md" />
            </div>

            <div
                onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(index);
                    setCollapsedTitle(content?.[0]?.title);
                }}
                className={twMerge(
                    "absolute border top-1/2 right-[-10px] -translate-y-1/2 border-c_neutral-300 bg-c_primary-500 h-5 w-5 rounded z-10 flex items-center justify-center cursor-pointer opacity-0",
                    expanded && "group-hover:opacity-100",
                )}
            >
                <ArrowLeft2 className="[&>path]:stroke-white" />
            </div>
        </div>
    );
};

export default Column;
