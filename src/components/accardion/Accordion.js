import React, { useState } from "react";
import {
    Accordion as AccordionComponent,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import Switch from "@/components/switch/Switch";
import FormCheckbox from "@/components/form-checkbox/formCheckbox";
import { TextField } from "@/components/input/Input";
import { CiSearch } from "react-icons/ci";

function Icon({ id, open }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${
                id === open ? "rotate-180" : ""
            } h-5 w-5 transition-transform`}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
        </svg>
    );
}

export function Accordion(props) {
    const {
        size,
        checkedItems = [],
        name,
        selectAll,
        setSelectAll,
        setCheckboxes,
        checkboxes = [],
        label,
    } = props;

    const [open, setOpen] = React.useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    const handleCheckboxChange = (id) => {
        const updatedCheckboxes = checkboxes.map((checkbox) =>
            checkbox.id === id
                ? { ...checkbox, checked: !checkbox.checked }
                : checkbox,
        );
        setCheckboxes(updatedCheckboxes);
    };
    const [searchQuery, setSearchQuery] = useState("");

    const handleSelectAll = () => {
        const updatedCheckboxes = checkboxes.map((checkbox) => ({
            ...checkbox,
            checked: !selectAll,
        }));
        setCheckboxes(updatedCheckboxes);
        setSelectAll(!selectAll);
    };
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };
    const filteredItems = checkboxes.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className={`w-${size}`}>
            <AccordionComponent
                open={open === 1}
                icon={<Icon id={1} open={open} />}
            >
                <AccordionHeader
                    onClick={() => handleOpen(1)}
                    className={
                        "text-gray-600 text-3xl font-medium active:text-gray-900"
                    }
                >
                    <div className="flex items-center gap-48">
                        <p>{label}</p>
                        <div
                            className={"flex text-sm font-normal items-center"}
                        >
                            <Switch
                                onClick={() => handleOpen(1)}
                                variant={"outlined"}
                            />
                            <p className={"ml-2"}>
                                Выбрано: {checkedItems.length}/
                                {checkboxes.length}
                            </p>
                        </div>
                    </div>
                </AccordionHeader>
                <AccordionBody>
                    <div className={"flex justify-between"}>
                        {!selectAll ? (
                            <div
                                className={
                                    "text-primary min-w-max font-medium mb-4 cursor-pointer"
                                }
                                onClick={handleSelectAll}
                            >
                                Выбрать все
                            </div>
                        ) : (
                            <div
                                className={
                                    "text-red-400 font-medium mb-4 cursor-pointer"
                                }
                                onClick={handleSelectAll}
                            >
                                Отменить
                            </div>
                        )}
                        <TextField
                            containerclassname="max-w-[400px]"
                            placeholder={"Поиск по функции"}
                            inputprops={{
                                leftIcon: CiSearch,
                            }}
                            onChange={(e) => handleSearch(e)}
                        />
                    </div>
                    <div className={"flex flex-wrap items-center"}>
                        {filteredItems.map((item) => (
                            <div className={"w-1/5"} key={item.id}>
                                <FormCheckbox
                                    onChange={() =>
                                        handleCheckboxChange(item.id)
                                    }
                                    checked={item.checked}
                                    label={item.label}
                                    name={name}
                                />
                            </div>
                        ))}
                    </div>
                </AccordionBody>
            </AccordionComponent>
        </div>
    );
}
