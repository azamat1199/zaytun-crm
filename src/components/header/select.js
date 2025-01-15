"use client";
import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { AiOutlineCheck } from "react-icons/ai";
import RussiaIcon from "@/components/icons/russia-icon";
import UsIcon from "@/components/icons/us-icon";
import { currencies } from "@/constants/currencyConstants";
import { MdKeyboardArrowDown } from "react-icons/md";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import "./header.css";

const currencyList = [
    {
        id: 1,
        name: "USD",
        sign: currencies.usd,
        buy: 12100,
        sell: 12100,
        rate: 11800,
    },
    {
        id: 2,
        name: "RUB",
        sign: currencies.rub,
        buy: 120,
        sell: 130,
        rate: 126,
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const getCurrencyIcon = (currency) => {
    return currency === currencies.usd ? <UsIcon /> : <RussiaIcon />;
};

export default function CurrencySelect() {
    const [selected, setSelected] = useState(currencyList[0]);
    const { t } = useAppTranslations();
    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <div className="relative">
                        <Listbox.Button className="header-select">
                            <div className="flex items-center">
                                <div className="flex items-center gap-[10px]">
                                    <div>{getCurrencyIcon(selected.sign)}</div>
                                    <div className="flex items-center gap-[20px]">
                                        <div className="flex flex-col">
                                            <p className="text-[#787878]">
                                                {t("Курс ЦБ")}
                                            </p>
                                            <p className="text-[13px]">
                                                <strong>{selected.rate}</strong>{" "}
                                                UZS
                                            </p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-[#787878]">
                                                {t("Покупка")}
                                            </p>
                                            <p className="text-[13px]">
                                                <strong>{selected.buy}</strong>{" "}
                                                UZS
                                            </p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-[#787878]">
                                                {t("Продажа")}
                                            </p>
                                            <p className="text-[13px]">
                                                <strong>{selected.sell}</strong>{" "}
                                                UZS
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span>
                                <div>
                                    <MdKeyboardArrowDown className="text-[20px]" />
                                </div>
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="header-select-options z-30">
                                {currencyList.map((currency) => (
                                    <Listbox.Option
                                        key={currency.id}
                                        className={({ active }) =>
                                            classNames(
                                                active
                                                    ? "bg-indigo-600 text-white"
                                                    : "text-gray-900",
                                                "relative cursor-default select-none py-2 pl-3 pr-9",
                                            )
                                        }
                                        value={currency}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    {getCurrencyIcon(
                                                        currency.sign,
                                                    )}
                                                    <span
                                                        className={classNames(
                                                            selected
                                                                ? "font-semibold"
                                                                : "font-normal",
                                                            "ml-3 block truncate",
                                                        )}
                                                    >
                                                        {currency.name}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active
                                                                ? "text-white"
                                                                : "text-indigo-600",
                                                            "absolute inset-y-0 right-0 " +
                                                                "flex items-center pr-4",
                                                        )}
                                                    >
                                                        <AiOutlineCheck
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
}
