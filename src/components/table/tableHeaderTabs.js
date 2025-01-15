import React, { useEffect } from "react";
import { motion } from "framer-motion";
import cx from "classnames";

export function TableHeaderTabs({ tabs, useFilter }) {
    const { filters, replaceQuery } = useFilter({});

    useEffect(() => {
        if (!filters?.tab) {
            replaceQuery({ tab: tabs[0]?.id || tabs[0] });
        }
    }, [filters]);

    return (
        <div className="flex border border-[#D0D5DD] rounded-[8px] overflow-hidden w-full">
            {tabs.map((item) => (
                <div
                    key={item.value}
                    //@ts-expect-error TODO
                    onClick={() => replaceQuery({ tab: item.id || item })}
                    className="border-r select-none last:!border-r-0 font-medium cursor-pointer relative bg-block px-4 py-[8.5px] text-gray-700 text-[14px]"
                >
                    {filters?.tab === (item.id || item) && (
                        <motion.div
                            layoutId="underline"
                            className="absolute top-0  left-0 bottom-0 right-0 bg-primary"
                        />
                    )}
                    <div
                        className={cx("relative transition text-secondary", {
                            "!text-[#ffffff]":
                                filters?.tab === (item.id || item),
                        })}
                    >
                        {item.label || item}
                    </div>
                </div>
            ))}
        </div>
    );
}
