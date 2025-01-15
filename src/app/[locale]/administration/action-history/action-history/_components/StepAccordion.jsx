"use client";
import Loading from "@/app/[locale]/loading";
import Accordionv2 from "@/components/accardion/Accordionv2";
import { StepIcon } from "@/components/icons/step-icon";
import { getHistoryListId } from "@/data/admin/admin.requests";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import { formatDate, formatTime } from "@/utils/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ArrowRightIcon, Avatar, PlusIcon } from "@zaytun/components";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useRef, useEffect } from "react";
import { TrashIcon } from "../../../../../../components/icons/trash-icon";

export default function StepAccordion() {
    const observer = useRef();
    const pathname = usePathname();
    const { getWord } = useKeyTranslation();
    const listId = pathname.split("action-history/action-history/")[1];

    const { data, fetchNextPage, hasNextPage, isFetching, isLoading, refetch } =
        useInfiniteQuery({
            queryKey: ["todos"],
            queryFn: ({ pageParam }) =>
                getHistoryListId({ pageParam, id: listId }),
            initialPageParam: 0,
            getNextPageParam: (lastPage, allPages) => {
                return lastPage.data?.result?.data?.content.length >= 1
                    ? allPages.length + 1
                    : undefined;
            },
            select: (response) => {
                const list = response.pages;
                if (Array.isArray(list)) {
                    return list;
                }
                return [];
            },
            enabled: Boolean(listId),
        });

    const lastElementRef = useCallback(
        (node) => {
            if (isLoading) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetching) {
                    fetchNextPage();
                }
            });

            if (node) observer.current.observe(node);
        },
        [fetchNextPage, hasNextPage, isFetching, isLoading],
    );

    const todos = data?.map((item) => {
        return item?.data?.result?.data?.content.map((item) => {
            return item;
        });
    });

    useEffect(() => {
        refetch();
    }, [listId]);

    return (
        <div ref={lastElementRef}>
            {isLoading ? (
                <>
                    <Loading />
                </>
            ) : (
                <>
                    {todos?.map((outerArray, outerIndex) => {
                        return (
                            <Fragment key={outerIndex}>
                                {outerArray?.map((innerArr, innerIndex) => {
                                    const dateFormatLine = formatDate(
                                        innerArr?.date,
                                    );
                                    return (
                                        <Accordionv2
                                            accordionHeader={
                                                <div className="flex justify-between w-full">
                                                    <p>{dateFormatLine}</p>
                                                    {/* <p className="text-badge-neutral-text font-medium text-sm rounded-2xl bg-input-border-disabled  px-3 py-1">5</p> */}
                                                </div>
                                            }
                                            key={innerIndex}
                                        >
                                            {innerArr?.array?.map(
                                                (rootArr, rootIndex) => {
                                                    const timeFormatLine =
                                                        formatTime(
                                                            rootArr.createdAt,
                                                        );
                                                    const {
                                                        authorId,
                                                        position,
                                                        entityName,
                                                        changes,
                                                        author,
                                                    } = rootArr;
                                                    return (
                                                        <div
                                                            key={rootIndex}
                                                            className="gap-6 items-start grid grid-cols-4 mb-5"
                                                        >
                                                            <div className="h-full">
                                                                <ol className="relative h-full">
                                                                    <li className="relative flex-1 h-full">
                                                                        <a className="flex items-center font-medium w-full">
                                                                            <span className="w-8 h-8  rounded-full flex justify-center items-center mr-3 text-sm text-indigo-600 lg:w-10 lg:h-10">
                                                                                <StepIcon />
                                                                            </span>
                                                                            <div className="block">
                                                                                <h4 className="text-lg  text-indigo-600">
                                                                                    {
                                                                                        timeFormatLine
                                                                                    }
                                                                                </h4>
                                                                            </div>
                                                                        </a>
                                                                        <span className="border-[1.5px] border-r border-fg-highlight h-full absolute left-5 top-9" />
                                                                    </li>
                                                                </ol>
                                                            </div>
                                                            <div className="w-full border bg-surface-hover01 rounded-2xl col-span-3">
                                                                <Accordionv2
                                                                    innerBottom={
                                                                        true
                                                                    }
                                                                    id="accordion-content"
                                                                    accordionHeader={
                                                                        <div className="flex items-center gap-4 pl-4">
                                                                            <Avatar size="lg" />
                                                                            <div className="flex flex-col gap-1">
                                                                                <div className="flex items-center gap-[2px]">
                                                                                    <span className="text-input-label font-medium text-base">
                                                                                        {
                                                                                            author
                                                                                        }{" "}
                                                                                        •
                                                                                    </span>
                                                                                    <span className="text-secondary font-medium text-base">
                                                                                        /{" "}
                                                                                        {
                                                                                            position
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                                <div>
                                                                                    <h4 className="text-secondary font-medium text-base">
                                                                                        {
                                                                                            entityName
                                                                                        }
                                                                                    </h4>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    className="border-none p-4"
                                                                >
                                                                    <div className="mx-8 py-4 flex flex-col gap-2">
                                                                        <div className="flex items-center gap-3">
                                                                            {changes?.map(
                                                                                (
                                                                                    item,
                                                                                    j,
                                                                                ) => {
                                                                                    const {
                                                                                        entryChanges,
                                                                                    } =
                                                                                        item;
                                                                                    return (
                                                                                        <div
                                                                                            key={
                                                                                                j
                                                                                            }
                                                                                        >
                                                                                            {entryChanges?.map(
                                                                                                (
                                                                                                    changes,
                                                                                                    indx,
                                                                                                ) => {
                                                                                                    const {
                                                                                                        entryChangeType,
                                                                                                        key,
                                                                                                    } =
                                                                                                        changes;
                                                                                                    return (
                                                                                                        <div
                                                                                                            key={
                                                                                                                indx
                                                                                                            }
                                                                                                        >
                                                                                                            {entryChangeType ===
                                                                                                                "EntryAdded" && (
                                                                                                                <div className="flex items-center gap-3">
                                                                                                                    <li className="text-input-label font-medium text-xs">
                                                                                                                        “
                                                                                                                        {
                                                                                                                            key
                                                                                                                        }

                                                                                                                        ”
                                                                                                                    </li>
                                                                                                                    <span>
                                                                                                                        <PlusIcon />
                                                                                                                    </span>
                                                                                                                    <span className="text-input-label font-medium text-xs">
                                                                                                                        “
                                                                                                                        {typeof changes?.value ===
                                                                                                                        "object"
                                                                                                                            ? getWord(
                                                                                                                                  changes?.value,
                                                                                                                              )
                                                                                                                            : changes?.value}

                                                                                                                        ”
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                            )}
                                                                                                            {entryChangeType ===
                                                                                                                "EntryRemoved" && (
                                                                                                                <div className="flex items-center gap-3">
                                                                                                                    <li className="text-input-label font-medium text-xs">
                                                                                                                        “
                                                                                                                        {
                                                                                                                            key
                                                                                                                        }

                                                                                                                        ”
                                                                                                                    </li>
                                                                                                                    <span>
                                                                                                                        <TrashIcon
                                                                                                                            size={
                                                                                                                                20
                                                                                                                            }
                                                                                                                            color="#101828"
                                                                                                                        />
                                                                                                                    </span>
                                                                                                                    <span className="text-input-label font-medium text-xs">
                                                                                                                        “
                                                                                                                        {typeof changes?.value ===
                                                                                                                        "object"
                                                                                                                            ? getWord(
                                                                                                                                  changes?.value,
                                                                                                                              )
                                                                                                                            : changes?.value}

                                                                                                                        ”
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                            )}
                                                                                                            {entryChangeType ===
                                                                                                                "EntryValueChange" && (
                                                                                                                <div className="flex items-center gap-3">
                                                                                                                    <li className="text-input-label font-medium text-xs">
                                                                                                                        “
                                                                                                                        {
                                                                                                                            key
                                                                                                                        }

                                                                                                                        ”
                                                                                                                    </li>
                                                                                                                    <span>
                                                                                                                        <ArrowRightIcon />
                                                                                                                    </span>
                                                                                                                    <span className="text-secondary font-medium text-xs line-through">
                                                                                                                        “
                                                                                                                        {typeof changes?.leftValue ===
                                                                                                                        "object"
                                                                                                                            ? getWord(
                                                                                                                                  changes?.leftValue,
                                                                                                                              )
                                                                                                                            : changes?.leftValue}

                                                                                                                        ”
                                                                                                                    </span>
                                                                                                                    <span>
                                                                                                                        <ArrowRightIcon />
                                                                                                                    </span>
                                                                                                                    <span className="text-input-label font-medium text-xs">
                                                                                                                        “
                                                                                                                        {typeof changes?.rightValue ===
                                                                                                                        "object"
                                                                                                                            ? getWord(
                                                                                                                                  changes?.rightValue,
                                                                                                                              )
                                                                                                                            : changes?.rightValue}

                                                                                                                        ”
                                                                                                                    </span>
                                                                                                                </div>
                                                                                                            )}
                                                                                                        </div>
                                                                                                    );
                                                                                                },
                                                                                            )}
                                                                                        </div>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </Accordionv2>
                                                            </div>
                                                        </div>
                                                    );
                                                },
                                            )}
                                        </Accordionv2>
                                    );
                                })}
                            </Fragment>
                        );
                    })}
                </>
            )}
        </div>
    );
}
