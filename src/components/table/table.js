"use client";
import React, { useCallback, useEffect, useState } from "react";
import { prop } from "ramda";
import { TableHeaderTabs } from "./tableHeaderTabs";
import { Tooltip } from "@material-tailwind/react";
import { TextField } from "../input/Input";
import cx from "classnames";
import { Pagination } from "./Pagination";
import { MinusIcon, Checkbox, TButton } from "@zaytun/components";
import { SearchIcon } from "../icons/search-icon";
import { FilterIcon } from "../icons/filter-icon";
import { BsCloudArrowDown } from "react-icons/bs";
import { SelectWithIcon } from "../select/SelectWithIcon";
import { TableConfiguration } from "./TableConfiguration";
import { motion } from "framer-motion";
import uuid from "react-uuid";
import TableLoader from "./TableLoader";
import TablePlaceholder from "./TablePlaceholder";
import ToastError from "../notification/ErrorNotification";
import "react-toastify/dist/ReactToastify.css";
import {
    convertArrayToExcelWorksheet,
    exportExcelWorksheetToFile,
} from "@/utils/excelSaver";

const hasProperty = (obj, propertyName) =>
    Object.keys(obj).includes(propertyName);

export function Table(props) {
    const {
        columns,
        withHeader = false,
        withConfig = false,
        withSearch = true,
        inactiveDoubleClick = false,
        onSearch,
        onSelectRow,
        disableDoubleClick,
        tabs,
        selectOptions = [],
        onFilter,
        useFilter,
        withPagination = true,
        onAddAction,
        request,
        withExport,
        onCreateClick,
        onHandleSelectOption,
        primaryKey = "id",
        checkbox,
        onRowClick,
        // loader,
        localization = {
            filter: "Фильтры",
            download: "Экспорт",
            search: "Поиск",
            pageCountTitle: "Записи на странице",
            record: "записей",
            article: "из",
            pages: "страниц",
            add: "Добавить",
            selectPlaceholder: "Выбрать",
            placeholder: "В данный момент в таблице нет данных",
        },
    } = props;
    const { data, isError, isLoading } = request;
    const listData = data?.data?.result?.data?.content;
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [excelArr] = useState([]);
    // const list = !isLoading && !isError ? (data?.result?.content || data?.result) : [];
    const [selectedRows, setSelectedRows] = useState([]);
    const [configuredColumns, setConfiguredColumns] = useState(
        columns.map((item, index) => {
            return {
                ...item,
                show: hasProperty(item, "show") ? item?.show : true,
                fixed: index === 0,
                id: uuid(),
            };
        }),
    );
    const [pageSize] = useState(10);

    useEffect(() => {
        if (
            data?.data?.result?.data?.content ||
            data?.result?.data?.content ||
            data?.result?.data ||
            data?.result?.content ||
            []
        ) {
            setList(
                data?.data?.result?.data?.content ||
                    data?.result?.data?.content ||
                    data?.result?.data ||
                    data?.result?.content ||
                    data?.result ||
                    [],
            );
        }
    }, [data]);

    useEffect(() => {
        let timeout;
        if (isLoading) setLoading(true);
        else {
            timeout = setTimeout(() => setLoading(false), 500);
        }
        return () => clearTimeout(timeout);
    }, [isLoading]);

    useEffect(() => {
        //@ts-expect-error TODO
        setConfiguredColumns((list) => {
            return list.map((item, index) => {
                const idx = columns.findIndex((i) => item.field === i.field);

                return {
                    ...columns[idx],
                    show: item.show,
                    fixed: index === 0,
                    id: uuid(),
                };
            });
        });
    }, [columns]);

    const onSelectAllRows = useCallback(
        (checked) => {
            if (!checked) {
                setSelectedRows([]);
            } else {
                const keyData = [];
                for (let i = 0; i < list?.length; i++) {
                    const rowPrimaryKey = prop(primaryKey, list[i]);
                    keyData.push(rowPrimaryKey);
                }
                setSelectedRows(keyData);
            }
        },
        [list, selectedRows, primaryKey],
    );

    const onClickSelectRow = useCallback(
        (item, checked) => {
            const rowPrimaryKey = prop(primaryKey, item);
            setSelectedRows((prev) => {
                if (!checked) {
                    return prev.filter((primary) => primary !== rowPrimaryKey);
                } else {
                    return [...prev, rowPrimaryKey];
                }
            });
        },
        [selectedRows, list, primaryKey],
    );

    const withoutCheckedExcel = listData?.map((item) => {
        if (item) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, ...rest } = item;
            return rest;
        }
        return null;
    });

    const selectedExcel = listData?.map((item) => {
        if (item) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, ...rest } = item;
            return rest;
        }
        return null;
    });
    useEffect(() => {
        if (onSelectRow) onSelectRow(selectedRows);
    }, [selectedRows]);

    return (
        <div
            className="flex-1 w-full  flex flex-col gap-[20px]
      overflow-hidden"
        >
            <div className="flex-1 bg-block flex flex-col border rounded-[8px]  overflow-hidden">
                {withHeader && (
                    <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            {tabs && (
                                <TableHeaderTabs
                                    tabs={tabs}
                                    useFilter={useFilter}
                                />
                            )}
                            {onCreateClick && (
                                <TButton
                                    onClick={onCreateClick}
                                    className="py-[7px]"
                                    variant="filled"
                                >
                                    Добавить
                                </TButton>
                            )}
                            {selectedRows.length >= 1 &&
                                onHandleSelectOption && (
                                    <SelectWithIcon
                                        options={selectOptions}
                                        className="!h-[40px] !min-w-[150px]"
                                        placeholder={
                                            localization.selectPlaceholder
                                        }
                                        onChange={(ev) =>
                                            onHandleSelectOption(ev)
                                        }
                                    />
                                )}
                            {!tabs &&
                                !onCreateClick &&
                                !(
                                    selectedRows.length >= 1 &&
                                    onHandleSelectOption
                                ) &&
                                withSearch && (
                                    <TextField
                                        containerClassName="!w-[400px] !h-[40px]"
                                        className="!h-[40px]"
                                        placeholder={localization.search}
                                        inputProps={{
                                            leftIcon: SearchIcon,
                                        }}
                                        onChange={(e) => {
                                            if (onSearch) {
                                                onSearch(e.target.value);
                                            }
                                        }}
                                    />
                                )}
                        </div>
                        <div className="flex justify-end gap-3 items-center">
                            {(tabs ||
                                onCreateClick ||
                                (selectedRows.length >= 1 &&
                                    onHandleSelectOption)) &&
                                withSearch && (
                                    <TextField
                                        containerClassName="!max-w-[400px] !w-[400px] !h-[40px]"
                                        className="!h-[40px]"
                                        placeholder={localization.search}
                                        inputProps={{
                                            leftIcon: SearchIcon,
                                        }}
                                        onChange={(e) => {
                                            if (onSearch) {
                                                onSearch(e.target.value);
                                            }
                                        }}
                                    />
                                )}
                            {onFilter && (
                                <TButton
                                    onClick={() => {
                                        ToastError(
                                            "Это функция находится в разработке",
                                            "",
                                            "",
                                        );
                                        onFilter();
                                    }}
                                    className="py-[7px] text-secondary"
                                    startIcon={<FilterIcon />}
                                >
                                    {localization.filter}
                                </TButton>
                            )}
                            {withExport && (
                                <TButton
                                    className="h-10"
                                    onClick={() => {
                                        const ws = convertArrayToExcelWorksheet(
                                            excelArr?.length >= 1
                                                ? selectedExcel
                                                : withoutCheckedExcel,
                                        );
                                        exportExcelWorksheetToFile(
                                            ws,
                                            "my-excel-file.xlsx",
                                        );
                                    }}
                                    startIcon={<BsCloudArrowDown size={20} />}
                                >
                                    {localization.download}
                                </TButton>
                            )}
                            {withConfig && (
                                <TableConfiguration
                                    columns={configuredColumns}
                                    defaultColumns={columns.map(
                                        (item, index) => {
                                            return {
                                                ...item,
                                                show: hasProperty(item, "show")
                                                    ? item?.show
                                                    : true,
                                                id: uuid(),
                                                fixed: index === 0,
                                            };
                                        },
                                    )}
                                    onApply={(cols) =>
                                        setConfiguredColumns(cols)
                                    }
                                />
                            )}
                            {onAddAction && (
                                <div className="add">
                                    <TButton
                                        onClick={onAddAction}
                                        variant="filled"
                                        className="bg-primary"
                                    >
                                        Добавить
                                    </TButton>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <div className="table-overlay flex relative flex-1 overflow-auto  flex-col">
                    {loading && <TableLoader />}
                    {list && list.length ? (
                        <>
                            <table className="w-full relative">
                                <motion.thead>
                                    <tr>
                                        {checkbox && (
                                            <th
                                                style={{
                                                    width: "56px",
                                                }}
                                                className="max-w-[56px] z-10 border-b bg-[#FCFCFD] sticky top-0 w-[56px] text-center"
                                            >
                                                <Checkbox
                                                    bgColor="primary"
                                                    data-cy="table-checkbox-all"
                                                    checked={
                                                        selectedRows.length ===
                                                        list?.length
                                                    }
                                                    icon={
                                                        <MinusIcon color="#fff" />
                                                    }
                                                    onHandleState={(checked) =>
                                                        onSelectAllRows(checked)
                                                    }
                                                />
                                            </th>
                                        )}
                                        {configuredColumns?.map(
                                            (column, index) =>
                                                column.show && (
                                                    <motion.th
                                                        layout
                                                        key={
                                                            Array.isArray(
                                                                column.field,
                                                            )
                                                                ? column
                                                                      .field[1]
                                                                : column.field
                                                        }
                                                        className={cx(
                                                            `w-[${column.width}px] z-10 border-b bg-[#FCFCFD] sticky top-0 text-left
                               text-secondary font-medium px-5 py-3 text-[12px]`,
                                                            {
                                                                "!pl-0":
                                                                    checkbox &&
                                                                    !index,
                                                            },
                                                        )}
                                                    >
                                                        {column.headerName}
                                                    </motion.th>
                                                ),
                                        )}
                                    </tr>
                                </motion.thead>

                                <motion.tbody>
                                    {list.map((item) => {
                                        const rowPrimaryKey = prop(
                                            primaryKey,
                                            item,
                                        );
                                        const isSelected =
                                            selectedRows.includes(
                                                rowPrimaryKey,
                                            );

                                        return (
                                            <tr
                                                className="table_three-row  border-b last:border-b-0 hover:bg-[#FCFCFD]"
                                                key={item?.id}
                                                onClick={() =>
                                                    onRowClick &&
                                                    onRowClick(item)
                                                }
                                            >
                                                {checkbox && (
                                                    <td className="max-w-[56px] w-[56px] text-center">
                                                        <Checkbox
                                                            checked={isSelected}
                                                            data-cy="table-checkbox-all"
                                                            onHandleState={(
                                                                checked,
                                                            ) =>
                                                                onClickSelectRow(
                                                                    item,
                                                                    checked,
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                )}
                                                {configuredColumns?.map(
                                                    (column, index) => {
                                                        const columnValue =
                                                            prop(
                                                                column.field,
                                                                item,
                                                            );
                                                        const valueGetter =
                                                            prop(
                                                                "valueGetter",
                                                                column,
                                                            );
                                                        const renderCell = prop(
                                                            "renderCell",
                                                            column,
                                                        );
                                                        const rowValue =
                                                            valueGetter
                                                                ? valueGetter(
                                                                      columnValue,
                                                                  )
                                                                : columnValue;
                                                        const tableCell =
                                                            renderCell
                                                                ? renderCell(
                                                                      item,
                                                                  )
                                                                : rowValue;
                                                        return (
                                                            column.show && (
                                                                <motion.td
                                                                    layout
                                                                    style={{
                                                                        maxWidth: `${column.width}px`,
                                                                    }}
                                                                    key={
                                                                        Array.isArray(
                                                                            column.field,
                                                                        )
                                                                            ? column
                                                                                  .field[1]
                                                                            : column.field
                                                                    }
                                                                    className={cx(
                                                                        "px-5 py-4 text-[14px] text-secondary",
                                                                        {
                                                                            "!pl-0":
                                                                                checkbox &&
                                                                                !index,
                                                                            "cursor-pointer select-none":
                                                                                !inactiveDoubleClick &&
                                                                                !disableDoubleClick &&
                                                                                index ===
                                                                                    0,
                                                                            [`whitespace-nowrap w-fit
                                   overflow-ellipsis overflow-hidden`]:
                                                                                !renderCell,
                                                                        },
                                                                    )}
                                                                    width={
                                                                        column.width
                                                                    }
                                                                >
                                                                    {renderCell ? (
                                                                        tableCell
                                                                    ) : tableCell ? (
                                                                        <Tooltip
                                                                            content={tableCell.toString()}
                                                                        >
                                                                            {column.copy ? (
                                                                                <span className="bg-[#d6d6d6] p-1 rounded">
                                                                                    {tableCell.toString()}
                                                                                </span>
                                                                            ) : (
                                                                                tableCell.toString()
                                                                            )}
                                                                        </Tooltip>
                                                                    ) : (
                                                                        "N/A"
                                                                    )}
                                                                </motion.td>
                                                            )
                                                        );
                                                    },
                                                )}
                                            </tr>
                                        );
                                    })}
                                </motion.tbody>
                            </table>
                        </>
                    ) : (
                        <TablePlaceholder
                            placeholder={localization.placeholder}
                        />
                    )}
                </div>
            </div>
            {withPagination && (
                <Pagination
                    isLoading={loading}
                    isError={isError}
                    useFilter={useFilter}
                    defPageSize={pageSize}
                    data={data}
                    localization={localization}
                />
            )}
        </div>
    );
}
