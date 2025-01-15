"use client";
import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { ArrowUpIcon } from "../icons/arrow-up-icon";
import { ArrowDownIcon } from "../icons/arrow-down-icon";
import { ArrowRightIcon } from "../icons/arrow-right-icon";
import { ArrowLeftIcon } from "../icons/arrow-left-icon";
import cx from "classnames";

export function Pagination({
    data,
    useFilter,
    isLoading,
    isError,
    defPageSize,
    localization,
}) {
    const { filters, replaceQuery } = useFilter({ test: "hello" });

    const isReady = !isLoading && !isError;
    const [pages, setPages] = useState([]);
    const [openPageSize, setOpenPageSize] = useState(false);
    const [isPages, setIsPages] = useState(false);

    const totalPages =
        isReady &&
        (data?.result?.totalPages || data?.data?.result?.data?.totalPages);
    const page = +filters?.page || 0;
    const size = +filters?.size || defPageSize || 10;
    const isLast =
        (isReady && data?.result?.last) || data?.data?.result?.data?.last;
    const isFirst =
        (isReady && data?.result?.first) || data?.data?.result?.data?.first;

    const optionRef1 = useRef(null);
    const optionRef2 = useRef(null);

    useEffect(() => {
        if (!filters?.page && !filters?.size) {
            replaceQuery({
                page: 0,
                size: defPageSize || 10,
            });
        }
    }, [filters]);

    useEffect(() => {
        // replaceQuery({
        //   page: 0,
        //   size: defPageSize || 10,
        // });

        (() => {
            const list = [];
            for (let i = 0; i < totalPages; i++) {
                list.push(i);
            }
            setPages(list);
        })();
    }, [totalPages]);

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (
                isPages &&
                optionRef1.current &&
                !optionRef1.current?.contains(e.target)
            ) {
                setIsPages(false);
            }
            if (
                openPageSize &&
                optionRef2.current &&
                !optionRef2.current?.contains(e.target)
            ) {
                setOpenPageSize(false);
            }
        };

        if (typeof window === "undefined") {
            return;
        }

        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [isPages, openPageSize]);
    const leftBtn = () => {
        if (page > 0) {
            replaceQuery({ page: page - 1 });
        }
    };

    const rightBtn = () => {
        if (page < totalPages - 1) {
            replaceQuery({ page: page + 1 });
        }
    };

    const activebtn = (state) => {
        return {
            border: page == state ? "1px solid #039855" : "none",
            color: page == state ? "#039855" : "#000000",
        };
    };

    const pageBtns = () => {
        const tempTotal = totalPages;
        if (tempTotal <= 7) {
            return (
                <>
                    {[1, 2, 3, 4, 5, 6, 7].map(
                        (item, index) =>
                            tempTotal >= item && (
                                <div
                                    className="pagination-button"
                                    onClick={() =>
                                        replaceQuery({ page: index })
                                    }
                                    style={activebtn(index)}
                                    key={item}
                                >
                                    {item}
                                </div>
                            ),
                    )}
                </>
            );
        }

        if (
            page == tempTotal - 1 ||
            page == tempTotal - 2 ||
            page == tempTotal - 3 ||
            page == tempTotal - 4 ||
            page == tempTotal - 5
        ) {
            return (
                <>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: 0 })}
                        style={activebtn(0)}
                    >
                        1
                    </div>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: tempTotal - 6 })}
                    >
                        ...
                    </div>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: tempTotal - 5 })}
                        style={activebtn(tempTotal - 5)}
                    >
                        {tempTotal - 4}
                    </div>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: tempTotal - 4 })}
                        style={activebtn(tempTotal - 4)}
                    >
                        {tempTotal - 3}
                    </div>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: tempTotal - 3 })}
                        style={activebtn(tempTotal - 3)}
                    >
                        {tempTotal - 2}
                    </div>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: tempTotal - 2 })}
                        style={activebtn(tempTotal - 2)}
                    >
                        {tempTotal - 1}
                    </div>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: tempTotal - 1 })}
                        style={activebtn(tempTotal - 1)}
                    >
                        {tempTotal}
                    </div>
                </>
            );
        }
        if (tempTotal > 7 && page > 4) {
            return (
                <>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: 0 })}
                        style={activebtn(0)}
                    >
                        1
                    </div>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: page - 1 })}
                    >
                        ...
                    </div>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: page - 1 })}
                        style={activebtn(page - 1)}
                    >
                        {page}
                    </div>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: page })}
                        style={activebtn(page)}
                    >
                        {page + 1}
                    </div>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: page + 1 })}
                        style={activebtn(page + 1)}
                    >
                        {page + 2}
                    </div>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: page + 1 })}
                    >
                        ...
                    </div>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: tempTotal - 1 })}
                        style={activebtn(tempTotal - 1)}
                    >
                        {tempTotal}
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: 0 })}
                        style={activebtn(0)}
                    >
                        1
                    </div>
                    {[2, 3, 4, 5, 6].map((item) => {
                        const isDots = item == 6;
                        return (
                            <div
                                className="pagination-button"
                                onClick={() =>
                                    replaceQuery({
                                        page: !isDots ? item - 1 : 5,
                                    })
                                }
                                style={activebtn(item - 1)}
                                key={item}
                            >
                                {isDots ? "..." : item}
                            </div>
                        );
                    })}
                    <div
                        className="pagination-button"
                        onClick={() => replaceQuery({ page: tempTotal - 1 })}
                        style={activebtn(tempTotal - 1)}
                    >
                        {tempTotal}
                    </div>
                </>
            );
        }
    };

    return (
        isReady && (
            <div
                className="flex p-3 border rounded-[8px]
       text-[14px] text-secondary gap-2 items-center"
            >
                <div className="flex gap-4 px-[16px]">
                    <p className=" ">{localization.pageCountTitle}</p>
                    <div
                        onClick={() => setOpenPageSize((prev) => !prev)}
                        className="cursor-pointer relative flex items-center px-2 gap-1"
                    >
                        <strong>{size}</strong>
                        <span>
                            {openPageSize ? <ArrowDownIcon /> : <ArrowUpIcon />}
                        </span>
                        {openPageSize && (
                            <div
                                ref={optionRef2}
                                className="hidden-scrollbar absolute border-2 rounded-[8px] bottom-[25px] left-[-10px] max-h-40 overflow-y-auto  bg-[#ffffff]"
                            >
                                {[10, 20, 50, 100].map((item) => (
                                    <div
                                        key={item}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            replaceQuery({
                                                size: item,
                                                page: 0,
                                            });
                                            setOpenPageSize(false);
                                        }}
                                        className={`
                    ${item == size && "bg-[#eeeeee]"}
                       py-1 px-4 flex items-center hover:bg-[#eeeeee]`}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="border-r w-[1px] h-[30px]" />
                <div className="flex flex-1 items-center justify-between px-[16px] relative">
                    <p>
                        {(page + 1) * size - (size - 1)} -{" "}
                        {data?.result?.totalItems < (page + 1) * size
                            ? data?.result?.totalItems
                            : (page + 1) * size}{" "}
                        {localization.article} {data?.result?.totalItems}{" "}
                        {localization.record}
                    </p>
                    <div className="flex justify-center gap-[2px]">
                        {pageBtns()}
                    </div>

                    <div>
                        <div className="flex">
                            <div
                                onClick={() =>
                                    totalPages > 1 &&
                                    setIsPages((prevState) => !prevState)
                                }
                                className={cx(
                                    "relative flex items-center px-2 gap-1",
                                    {
                                        "cursor-pointer": totalPages > 1,
                                    },
                                )}
                            >
                                <strong className="">{page + 1}</strong>
                                {totalPages > 1 && (
                                    <span>
                                        {isPages ? (
                                            <ArrowDownIcon />
                                        ) : (
                                            <ArrowUpIcon />
                                        )}
                                    </span>
                                )}
                                {isPages && (
                                    <div
                                        ref={optionRef1}
                                        className="hidden-scrollbar absolute border-2 rounded-[8px] bottom-[25px] left-[-10px] max-h-40 overflow-y-auto  bg-[#ffffff]"
                                    >
                                        {pages.map((item) => (
                                            <div
                                                key={item}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsPages(false);
                                                    replaceQuery({
                                                        page: item,
                                                    });
                                                }}
                                                className={`
                                  ${item == page && "bg-[#eeeeee]"}
                                  py-1 px-4 flex items-center hover:bg-[#eeeeee]`}
                                            >
                                                {item + 1}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                {" "}
                                {localization.article} {totalPages}{" "}
                                {localization.pages}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-r w-[1px] h-[30px]" />
                <div>
                    <div className="flex pl-[16px]">
                        <IconButton
                            disabled={isFirst}
                            variant="text"
                            onClick={leftBtn}
                        >
                            <ArrowLeftIcon />
                        </IconButton>
                        <IconButton
                            disabled={isLast}
                            variant="text"
                            onClick={rightBtn}
                        >
                            <ArrowRightIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        )
    );
}
