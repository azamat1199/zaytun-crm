"use client";
import React from "react";
import {
    Accordion as AccordionComponent,
    AccordionHeader,
    AccordionBody,
    IconButton,
} from "@material-tailwind/react";
import { PlusIcon } from "@zaytun/components";
import cx from "classnames";

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

export default function Accordionv2(props) {
    const {
        size,
        accordionHeader,
        addBtn,
        onChangeModal,
        children,
        className,
        open = true,
        innerBottom = false,
    } = props;

    const [index, setIndex] = React.useState(0);
    const handleOpen = (value) => setIndex(index === value ? 0 : value);

    return (
        <div className={`w-${size}`}>
            <AccordionComponent
                open={index === 1 && open}
                icon={<Icon open={open && open} />}
                className={className}
            >
                <AccordionHeader
                    onClick={() => handleOpen(1)}
                    className={cx(
                        `text-[#101828] text-2xl font-medium active:text-gray-900`,
                        {
                            "border-b-none": innerBottom,
                        },
                    )}
                >
                    <div className="flex justify-between items-center w-full">
                        {accordionHeader}
                        {addBtn && (
                            <IconButton
                                className="bg-[#039855]"
                                size="sm"
                                onClick={onChangeModal}
                            >
                                <PlusIcon color="#fff" />
                            </IconButton>
                        )}
                    </div>
                </AccordionHeader>
                <AccordionBody>{children}</AccordionBody>
            </AccordionComponent>
        </div>
    );
}
