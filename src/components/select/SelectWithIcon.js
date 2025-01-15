"use client";
import cx from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { translitText } from "../../utils/cyrillicToTranslit";
import { Avatar } from "../avatar/Avatar";
import { ArrowDownIcon } from "../icons/arrow-down-icon";
import { CloseIcon } from "../icons/close-icon";
import { SearchIcon } from "../icons/search-icon";
import { Loader } from "../spinner/Loader";

export function SelectWithIcon({
    options,
    initialValue = null,
    placeholder = "Выбрать",
    onChange,
    onBlur,
    withSearch,
    setFieldValue,
    name = "select",
    searchPrimaryKey = "label" || "propsText",
    primaryId = "value",
    className,
    error,
    label,
    clearAction,
    disabled,
    loading,
    onChangeWithoutSelect,
    formatOption,
    inputProps,
    onChangeSearch,
    width = 320,
}) {
    const [handeItem, setHandelItem] = useState(initialValue);
    const [openOptions, setOpenOptions] = useState(false);
    const [optionsList, setOptionsList] = useState([...options]);
    const optionRef = useRef(null);
    if (error) {
        console.log("ERROR", error);
    }
    const handleChangeSearchInput = (e) => {
        const ev = translitText(e.target.value).toLowerCase();
        if (onChangeSearch) {
            onChangeSearch(e.target.value);
        } else {
            setOptionsList(() =>
                [...options].filter((item) => {
                    let text = "";
                    if (Array.isArray(searchPrimaryKey)) {
                        searchPrimaryKey.forEach((i) => {
                            text += item[i] + " ";
                        });
                    } else {
                        text = item[searchPrimaryKey];
                    }

                    return translitText(text).toLowerCase().includes(ev);
                }),
            );
        }
    };

    useEffect(() => {
        setOptionsList(options);
    }, [options]);

    useEffect(() => {
        initialValue?.[primaryId] && !handeItem && setHandelItem(initialValue);
    }, [initialValue?.[primaryId]]);

    useEffect(() => {
        if (onChange) onChange();
        else if (setFieldValue) setFieldValue(name, handeItem);
    }, [handeItem]);

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (
                openOptions &&
                optionRef.current &&
                // @ts-expect-error TODO
                !optionRef.current?.contains(e.target)
            ) {
                setOpenOptions(false);
                if (onBlur) onBlur();
            }
        };

        if (typeof window === "undefined") {
            return;
        }

        document.addEventListener("mousedown", checkIfClickedOutside);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [openOptions]);

    // @ts-expect-error check ts error TODO
    return (
        <div
            className="w-full"
            style={{
                maxWidth: `${width}px`,
            }}
        >
            {label && (
                <span className="mb-2 text-[14px] font-medium !text-gray-700">
                    {label}
                </span>
            )}
            <div
                className={cx(
                    "border w-full border-[#D0D5DD] rounded-[8px] h-[48px] relative flex items-center justify-center cursor-pointer flex-col",
                    className,
                    {
                        "border-primary": openOptions,
                        "border-2 !border-[#F5827A]": error,
                        "border-[#CDD4DF] bg-[#FCFCFD] pointer-events-none":
                            disabled,
                    },
                )}
            >
                {openOptions && withSearch ? (
                    <div className="w-full flex items-center gap-[8px]  py-[10px] px-[14px]">
                        <span className="w-[25px] h-[25px] flex items-center justify-center">
                            <SearchIcon />
                        </span>
                        <input
                            onChange={handleChangeSearchInput}
                            autoFocus={true}
                            placeholder="Поиск"
                            className="flex-1 h-full text-blue-gray-900 font-[400] outline-none text-md/[16px] "
                        />
                    </div>
                ) : (
                    <div
                        onClick={() =>
                            !loading && setOpenOptions((prev) => !prev)
                        }
                        className={cx(
                            "w-full flex items-center gap-[8px] py-[10px] px-[14px]",
                            {
                                "cursor-not-allowed": loading,
                            },
                        )}
                    >
                        {!loading && inputProps && (
                            <span className="w-[25px] h-[25px] flex items-center justify-center">
                                <inputProps.leftIcon />
                            </span>
                        )}
                        {loading && (
                            <Loader color="green" className="h-6 w-6" />
                        )}
                        {formatOption && (
                            <div className="flex-1">
                                {(handeItem && formatOption(handeItem)) ||
                                    (loading ? "Загрузка..." : placeholder)}
                            </div>
                        )}
                        {!formatOption && (
                            <p
                                className={cx(
                                    "text-blue-gray-900 text-md/[16px] font-[400] flex-1",
                                    {
                                        "!text-[#CDD4DF]": disabled,
                                    },
                                )}
                            >
                                {(handeItem && handeItem?.label) || placeholder}
                            </p>
                        )}

                        {clearAction && handeItem && handeItem[primaryId] && (
                            <div
                                onClick={(e) => {
                                    setHandelItem(null);
                                    e.stopPropagation();
                                }}
                            >
                                <CloseIcon />
                            </div>
                        )}
                        <ArrowDownIcon />
                    </div>
                )}
                <AnimatePresence>
                    {openOptions && (
                        <motion.div
                            //@ts-expect-error TODO
                            ref={optionRef}
                            initial={{
                                y: 20,
                                opacity: 0,
                            }}
                            animate={{
                                y: 0,
                                opacity: 1,
                            }}
                            exit={{
                                y: 20,
                                opacity: 0,
                            }}
                            className="hidden-scrollbar p-2 absolute border-[#D0D5DD] w-full bg-[#fff] top-[110%] rounded-[8px] overflow-y-auto overflow-hidden max-h-[200px] z-30 border"
                        >
                            {optionsList && optionsList.length ? (
                                optionsList.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            if (onChangeWithoutSelect)
                                                onChangeWithoutSelect(item);
                                            else setHandelItem(item);
                                            setOpenOptions(false);
                                        }}
                                        className={cx(
                                            "w-full flex items-center gap-[8px] rounded-[6px] px-[14px] py-[10px] hover:bg-[#F9FAFB]",
                                            {
                                                "bg-[#F9FAFB]":
                                                    item[primaryId] ===
                                                    (handeItem &&
                                                        handeItem[primaryId]),
                                            },
                                        )}
                                    >
                                        {formatOption && formatOption(item)}
                                        {!formatOption && (
                                            <div
                                                className={
                                                    "flex items-center w-4/5"
                                                }
                                            >
                                                {item?.logoSmall && (
                                                    <div className={"mr-4"}>
                                                        <Avatar
                                                            src={
                                                                item?.logoSmall
                                                            }
                                                            size="sm"
                                                        />
                                                    </div>
                                                )}
                                                {item?.propsText && (
                                                    <p className="text-blue-gray-900 mr-4 font-[400] flex-1 text-md/[16px]">
                                                        {item?.propsText} -
                                                    </p>
                                                )}
                                                <p className="text-blue-gray-900 font-[400] flex-1 text-md/[16px]">
                                                    {item?.label}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="flex justify-center">Empty</div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {error && <p className="text-red-700 text-[14px]">{error}</p>}
        </div>
    );
}
