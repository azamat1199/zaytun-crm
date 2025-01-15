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
import DragIcon from "@/components/icons/drag-icon";

export function TableConfiguration({ columns, onApply, defaultColumns }: any) {
    const [items, setItems] = useState(
        columns.filter((item: any) => !item.fixed && item.label),
    );
    const [openPopover, setOpenPopover] = React.useState(false);

    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };
    const onHandleShowVisibility = (checked: any, field: any) => {
        setItems((prev: any) =>
            prev.map((item: any) =>
                item.key !== field
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
                    placeholder={undefined}
                >
                    <SettingsIcon />
                </IconButton>
            </PopoverHandler>
            <PopoverContent
                placeholder={undefined}
                {...triggers}
                className="w-[400px] p-[24px] z-[1000]"
            >
                <div className="flex items-center gap- border-blue-gray-50 mb-[20px]">
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        placeholder={undefined}
                    >
                        Настройки таблицы
                    </Typography>
                </div>
                <div className="overflow-x-hidden overflow-y-auto max-h-[400px] no-scrollbar">
                    {columns.map(
                        (item: any) =>
                            item.label &&
                            item.fixed && (
                                <div
                                    key={item.key}
                                    className="flex opacity-70 gap-3 items-center cursor-not-allowed justify-between"
                                >
                                    <div className="flex gap-2.5 items-center">
                                        <DragIcon className={undefined} />
                                        <p className="text-[14px] text-gray-700 font-semibold">
                                            {item.label}
                                        </p>
                                    </div>
                                    <Checkbox checked={true} disabled={true} />
                                </div>
                            ),
                    )}
                    <Reorder.Group axis="y" values={items} onReorder={setItems}>
                        {items.map((item: any) => {
                            return (
                                <Reorder.Item key={item.id} value={item}>
                                    <div className="flex gap-3 items-center  justify-between  cursor-grab active:cursor-grabbing">
                                        <div className="flex gap-2.5 items-center">
                                            <DragIcon className={undefined} />
                                            <p className="text-[14px] text-gray-700 font-semibold">
                                                {item.label}
                                            </p>
                                        </div>
                                        <Checkbox
                                            name="isTemporary"
                                            checked={item.show}
                                            onHandleState={(checked: boolean) =>
                                                onHandleShowVisibility(
                                                    checked,
                                                    item.key,
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
                                    (item: any) => !item.fixed && item.label,
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
                                ...columns.filter((item: any) => item.fixed),
                                ...items,
                                ...columns.filter((item: any) => !item.label),
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
