"use client";
import React from "react";
import { prop } from "ramda";
import { TButton } from "@zaytun/components";
import "./table.css";

const SimpleTable = (props) => {
    const { columns, list, placeholder, action, withBtn, addHandleBtn } = props;

    return (
        <div className="flex-1 w-full bg-block border rounded-[8px] overflow-auto">
            {withBtn && (
                <div className="px-6 pt-4 flex justify-end">
                    <TButton
                        onClick={addHandleBtn}
                        variant="filled"
                        bgColor={"primary"}
                    >
                        Добавить
                    </TButton>
                </div>
            )}
            <table className="w-full">
                <thead>
                    <tr className={"border-b"}>
                        {columns?.map((column) => (
                            <th
                                key={
                                    Array.isArray(column.field)
                                        ? column.field[1]
                                        : column.field
                                }
                                className={`w-[${column.width}px] simple-table-header-item`}
                            >
                                {column.headerName}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {list?.map((item, index) => {
                        return (
                            <tr
                                className="table_three-row border-b last:border-b-0"
                                key={item.id}
                            >
                                {columns.map((column) => {
                                    const columnValue = prop(
                                        column.field,
                                        item,
                                    );
                                    const valueGetter = prop(
                                        "valueGetter",
                                        column,
                                    );
                                    const renderCell = prop(
                                        "renderCell",
                                        column,
                                    );
                                    const rowValue = valueGetter
                                        ? valueGetter(columnValue)
                                        : columnValue;
                                    const tableCell = renderCell
                                        ? renderCell(item, index)
                                        : rowValue;

                                    return (
                                        <td
                                            key={
                                                Array.isArray(column.field)
                                                    ? column.field[1]
                                                    : column.field
                                            }
                                            className={
                                                "px-5 py-4 text-[14px] text-secondary"
                                            }
                                            width={column.width}
                                        >
                                            {tableCell}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {list?.length <= 0 && (
                <div className={"flex items-center justify-center py-5"}>
                    <p className={" text-[14px] text-secondary"}>
                        {placeholder}
                    </p>
                </div>
            )}
            {action && (
                <div
                    className={
                        "flex items-center justify-center py-5 border-t-[1px]"
                    }
                >
                    {action}
                </div>
            )}
        </div>
    );
};

export default SimpleTable;
