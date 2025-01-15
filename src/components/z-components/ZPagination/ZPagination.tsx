import { useEffect, useState, FC, useRef } from "react";
import ZButton from "../ZButton";
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import { useSearchParams } from "next/navigation";
import useQueryString from "@/hooks/helpers/useQueryString";
import { ArrowDownIcon, ArrowUpIcon } from "@zaytun/components";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

interface ZPaginationProps {
    totalPages: number;
    defaultPage?: number;
}

/**
 * ZPagination component provides pagination functionality for navigating through a list of items.
 *
 * @param {ZPaginationProps} props - Props for configuring the pagination component.
 * @param {number} props.totalPages - Total number of pages.
 * @param {number} [props.defaultPage=1] - Default page to display initially.
 *
 * @returns {React.ReactElement} The rendered pagination component.
 */
const ZPagination: FC<ZPaginationProps> = ({ defaultPage = 1, totalPages }) => {
    const { t } = useAppTranslations();
    const searchParams = useSearchParams();
    const { appendQueryString, replaceQuery } = useQueryString();

    const size = Number(searchParams.get("size")) || 10;
    const currentPage =
        parseInt(searchParams.get("page") as string, 7) || defaultPage;

    const [window, setWindow] = useState<number[]>([]);
    const [openPageSize, setOpenPageSize] = useState(false);

    const optionRef2 = useRef(null);

    useEffect(() => {
        const arr = Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage < 7) {
            const w = arr.slice(0, 7);
            setWindow(w);
        } else if (currentPage > totalPages - 4) {
            const w = arr.slice(-7);
            setWindow(w);
        } else {
            const w = arr.slice(currentPage - 2, currentPage + 1);
            setWindow(w);
        }
    }, [currentPage]);

    const setCurrentPage = (page: number) => {
        appendQueryString("page", page);
    };

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="flex flex-row items-center w-full justify-between">
            <div className="flex items-center">
                <div className="flex gap-4 px-[16px]">
                    <p className=" ">{t("Показать на странице")}</p>
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
            </div>
            <div className="flex items-center justify-between">
                {totalPages === 1 ? (
                    <ZButton
                        onClick={() => setCurrentPage(1)}
                        iconButton
                        size="md"
                        variant={
                            currentPage === 1 ? "soft-color" : "text-button"
                        }
                        // className={[
                        //   'text-b-2-m',
                        //   currentPage !== 1 ? 'text-c_neutral-800' : 'text-c_primary-700',
                        // ]}
                        className={`text-b-2-m ${
                            currentPage === 1
                                ? "text-c_primary"
                                : "text-c_neutral-800"
                        }`}
                    >
                        1
                    </ZButton>
                ) : (
                    <>
                        {!window.includes(1) && (
                            <>
                                <ZButton
                                    onClick={() => setCurrentPage(1)}
                                    iconButton
                                    size="md"
                                    variant={
                                        currentPage === 1
                                            ? "soft-color"
                                            : "text-button"
                                    }
                                    // className={[
                                    //   'text-b-2-m',
                                    //   currentPage !== 1 ? 'text-c_neutral-800' : 'text-c_primary-700',
                                    // ]}
                                    className={`text-b-2-m ${
                                        currentPage === 1
                                            ? "text-c_primary"
                                            : "text-c_neutral-800"
                                    }`}
                                >
                                    1
                                </ZButton>
                                <ZButton
                                    variant="text-button"
                                    className="text-c_neutral-800"
                                >
                                    ...
                                </ZButton>
                            </>
                        )}
                        {window.map((ele, idx) => (
                            <ZButton
                                key={idx}
                                className={`text-b-2-m ${
                                    currentPage === ele
                                        ? "text-c_primary"
                                        : "text-c_neutral-800"
                                }`}
                                onClick={() => setCurrentPage(ele)}
                                iconButton
                                size="md"
                                variant={
                                    currentPage === ele
                                        ? "soft-color"
                                        : "text-button"
                                }
                            >
                                {ele}
                            </ZButton>
                        ))}
                        {!window.includes(totalPages) && (
                            <>
                                <ZButton
                                    variant="text-button"
                                    className="text-c_neutral-800"
                                >
                                    ...
                                </ZButton>
                                <ZButton
                                    className={
                                        currentPage !== totalPages
                                            ? "text-c_neutral-800"
                                            : "text-c_primary"
                                    }
                                    onClick={() => setCurrentPage(totalPages)}
                                    iconButton
                                    size="md"
                                    variant={
                                        currentPage === totalPages
                                            ? "soft-color"
                                            : "text-button"
                                    }
                                >
                                    {totalPages}
                                </ZButton>
                            </>
                        )}
                    </>
                )}
            </div>

            <div className="h-[42px] flex items-center gap-4">
                <p className="text-b-2-r">
                    <span className="mr-4">{currentPage}</span> {t("из")}{" "}
                    {totalPages} {t("страниц")}
                </p>
                <div className="h-[42px] w-[1px] bg-c_neutral-300" />
                <div className="flex items-center">
                    <ZButton
                        variant="text-button"
                        size="md"
                        iconButton
                        disabled={currentPage === 1}
                        onClick={handlePrev}
                    >
                        <ArrowLeftIcon
                            className={
                                currentPage === 1
                                    ? "[&_path]:stroke-c_neutral-400"
                                    : "[&_path]:stroke-c_neutral-800"
                            }
                        />
                    </ZButton>
                    <ZButton
                        variant="text-button"
                        size="md"
                        iconButton
                        disabled={currentPage === totalPages}
                        onClick={handleNext}
                    >
                        <ArrowRightIcon
                            className={
                                currentPage === totalPages
                                    ? "[&_path]:stroke-c_neutral-400"
                                    : "[&_path]:stroke-c_neutral-800"
                            }
                        />
                    </ZButton>
                </div>
            </div>
        </div>
    );
};

export default ZPagination;
