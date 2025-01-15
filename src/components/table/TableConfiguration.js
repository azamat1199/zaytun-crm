"use client";
import {
    IconButton,
    Popover,
    PopoverContent,
    PopoverHandler,
    Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { SettingsIcon, TButton, Checkbox } from "@zaytun/components";
import { Reorder } from "framer-motion";
import DragIcon from "../icons/drag-icon";

export function TableConfiguration({ columns, onApply, defaultColumns }) {
    const [items, setItems] = useState(
        columns.filter((item) => !item.fixed && item.headerName),
    );
    const [openPopover, setOpenPopover] = React.useState(false);

    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };
    const onHandleShowVisibility = (checked, field) => {
        setItems((prev) =>
            prev.map((item) =>
                item.field !== field
                    ? item
                    : {
                          ...item,
                          show: checked,
                      },
            ),
        );
        // setFieldValue(`${index}.show`, checked)
    };

    return (
        <Popover
            open={openPopover}
            handler={setOpenPopover}
            placement="bottom-end"
        >
            <PopoverHandler {...triggers}>
                <IconButton
                    variant="outlined"
                    className="min-w-[40px] border-[#CDD4DF]"
                >
                    <SettingsIcon />
                </IconButton>
            </PopoverHandler>
            <PopoverContent
                {...triggers}
                className="w-[400px] p-[24px] z-[1000]"
            >
                <div className="flex items-center gap- border-blue-gray-50 mb-[20px]">
                    <Typography variant="h6" color="blue-gray">
                        Настройки таблицы
                    </Typography>
                </div>
                <div className="overflow-x-hidden overflow-y-auto max-h-[400px] no-scrollbar">
                    {columns.map(
                        (item) =>
                            item.headerName &&
                            item.fixed && (
                                <div
                                    key={item.field}
                                    className="flex opacity-70 gap-3 items-center cursor-not-allowed justify-between"
                                >
                                    <div className="flex gap-2.5 items-center">
                                        <DragIcon />
                                        <p className="text-[14px] text-gray-700 font-semibold">
                                            {item.headerName}
                                        </p>
                                    </div>
                                    <Checkbox checked={true} disabled={true} />
                                </div>
                            ),
                    )}
                    <Reorder.Group axis="y" values={items} onReorder={setItems}>
                        {items.map((item) => {
                            return (
                                <Reorder.Item key={item.id} value={item}>
                                    <div className="flex gap-3 items-center  justify-between  cursor-grab active:cursor-grabbing">
                                        <div className="flex gap-2.5 items-center">
                                            <DragIcon />
                                            <p className="text-[14px] text-gray-700 font-semibold">
                                                {item.headerName}
                                            </p>
                                        </div>
                                        <Checkbox
                                            name="isTemporary"
                                            checked={item.show}
                                            onHandleState={(checked) =>
                                                onHandleShowVisibility(
                                                    checked,
                                                    item.field,
                                                )
                                            }
                                        />
                                    </div>
                                </Reorder.Item>
                            );
                        })}
                    </Reorder.Group>
                </div>

                <div className="mt-8 flex justify-between gap-3">
                    <TButton
                        fullWidth
                        className="text-error"
                        size="lg"
                        onClick={() => {
                            onApply(defaultColumns);
                            setItems(
                                defaultColumns.filter(
                                    (item) => !item.fixed && item.headerName,
                                ),
                            );
                            setOpenPopover(false);
                        }}
                    >
                        Сбросить
                    </TButton>
                    <TButton
                        variant="filled"
                        size="lg"
                        fullWidth
                        onClick={() => {
                            onApply([
                                ...columns.filter((item) => item.fixed),
                                ...items,
                                ...columns.filter((item) => !item.headerName),
                            ]);
                            setOpenPopover(false);
                        }}
                    >
                        Применить
                    </TButton>
                </div>
            </PopoverContent>
        </Popover>
    );
}
