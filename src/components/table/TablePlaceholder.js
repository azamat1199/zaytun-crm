import React from "react";
import NoDataSvg from "@/components/icons/no-data-svg";

const TablePlaceholder = ({ placeholder }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-150  ">
            <div className={"flex flex-col items-center my-[100px]"}>
                <NoDataSvg />
                <p className="text-gray-900 font-[20px]">
                    {placeholder || "В данный момент в таблице нет данных"}
                </p>
            </div>
        </div>
    );
};

export default TablePlaceholder;
