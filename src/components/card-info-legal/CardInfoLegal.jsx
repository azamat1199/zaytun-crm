"use client";
import React, { useState } from "react";
import { PencilIcon, StatusTag, TextField, UserIcon } from "@zaytun/components";
import Modal from "@/components/Modal";
import { CrossIcon, SelectWithIcon } from "@zaytun/components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IconButton } from "@material-tailwind/react";
import { TButton } from "@zaytun/components";
import { LinkExternalIcon } from "../icons/link-external-icon";
import { RoundedPlusIcon } from "../icons/rounded-plus-icon";
import { CopyIcon } from "../icons/copy-icon";
import useFilter from "@/hooks/useFilter";

export default function CardInfoLegal({ uuid = 15163461, idAbs = 15263462 }) {
    const [openNumberModal, setOpenNumberModal] = useState(false);
    const [openManager, setOpenManager] = useState(false);
    const [isCopiedUuid, setCopiedUuid] = useState(false);
    const [isCopiedCodeCbu, setIsCopiedCodeCbu] = useState(false);
    const [isCopiedNibd, setIsCopiedNibd] = useState(false);
    const [isCopiedAbs, setCopiedAbs] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [itemData, setItemData] = useState({
        phoneNumber: [],
    });

    const { replaceQuery } = useFilter({});

    const handleCopyUuid = () => {
        setCopiedUuid(true);
        setTimeout(() => {
            setCopiedUuid(false);
        }, 1000);
    };
    const handleCopyCodeCbu = () => {
        setIsCopiedCodeCbu(true);
        setTimeout(() => {
            setIsCopiedCodeCbu(false);
        }, 1000);
    };
    const handleCopyNibd = () => {
        setIsCopiedNibd(true);
        setTimeout(() => {
            setIsCopiedNibd(false);
        }, 1000);
    };

    const handleCopyAbs = () => {
        setCopiedAbs(true);
        setTimeout(() => {
            setCopiedAbs(false);
        }, 1000);
    };

    const handleAddNumber = () => {
        if (itemData.phoneNumber.includes(phoneNumber)) {
            // Skip adding duplicate numbers
            return;
        }

        setItemData((prevData) => ({
            ...prevData,
            phoneNumber: [...prevData.phoneNumber, phoneNumber],
        }));

        setOpenNumberModal(false);
        setPhoneNumber("");
    };

    return (
        <div>
            <div className="border rounded-2xl">
                <div className="flex flex-col gap-4 p-6">
                    <div className="flex justify-between items-center">
                        <h4 className="text-[#344054] text-base font-medium font-sans">
                            Основная информация
                        </h4>
                        <StatusTag
                            variant={"orange"}
                            value={"Юр.лицо"}
                            size="lg"
                        />
                    </div>
                    <div className="flex flex-col gap-4 items-start">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-[#101828] font-normal text-2xl font-sans">
                                OOO Golden Group
                            </h3>
                        </div>
                        <div className="flex gap-4 items-center">
                            <StatusTag
                                variant={"success"}
                                value={"Клиент"}
                                size="lg"
                            />
                            <TButton
                                variant="outlined"
                                className="flex items-center gap-2 border rounded py-[6px] px-4"
                                onClick={() =>
                                    replaceQuery({ tab: "cartoteka" })
                                }
                            >
                                <LinkExternalIcon />
                                <span>Картотека (4)</span>
                            </TButton>
                        </div>
                        <div className="flex gap-1 items-center">
                            <span className="flex gap-1">
                                <p className="text-gray-500 font-medium text-base font-sans">
                                    Код ЦБУ:
                                </p>
                                <p className="text-gray-500 font-medium text-base font-sans opacity-100">
                                    01110
                                </p>
                            </span>
                            <CopyToClipboard
                                text={"01110"}
                                onCopy={handleCopyCodeCbu}
                            >
                                <button className="flex gap-2 items-center">
                                    <CopyIcon />
                                    {isCopiedCodeCbu && (
                                        <span className="px-2 py-1 rounded-lg bg-primary text-white font-semibold text-xs">
                                            Copied
                                        </span>
                                    )}
                                </button>
                            </CopyToClipboard>
                        </div>
                        <div className="flex gap-1 items-center">
                            <span className="flex gap-1">
                                <p className="text-gray-500 font-medium text-base font-sans">
                                    UUID:
                                </p>
                                <p className="text-gray-500 font-medium text-base font-sans opacity-100">
                                    15163461
                                </p>
                            </span>
                            <CopyToClipboard
                                text={uuid}
                                onCopy={handleCopyUuid}
                            >
                                <button className="flex gap-2 items-center">
                                    <CopyIcon />
                                    {isCopiedUuid && (
                                        <span className="px-2 py-1 rounded-lg bg-primary text-white font-semibold text-xs">
                                            Copied
                                        </span>
                                    )}
                                </button>
                            </CopyToClipboard>
                        </div>
                        <div className="flex gap-1 items-center">
                            <span className="flex gap-1">
                                <p className="text-gray-500 font-medium text-base font-sans">
                                    ID АБС:
                                </p>
                                <p className="text-gray-500 font-medium text-base font-sans opacity-100">
                                    15263462
                                </p>
                            </span>
                            <CopyToClipboard
                                text={idAbs}
                                onCopy={handleCopyAbs}
                            >
                                <button className="flex gap-2 items-center">
                                    <CopyIcon />
                                    {isCopiedAbs && (
                                        <span className="px-2 py-1 rounded-lg bg-primary text-white font-semibold text-xs">
                                            Copied
                                        </span>
                                    )}
                                </button>
                            </CopyToClipboard>
                        </div>
                        <div className="flex gap-1 items-center">
                            <span className="flex gap-1">
                                <p className="text-gray-500 font-medium text-base font-sans">
                                    ID НИБДД:
                                </p>
                                <p className="text-gray-500 font-medium text-base font-sans opacity-100">
                                    91283819
                                </p>
                            </span>
                            <CopyToClipboard
                                text={"91283819"}
                                onCopy={handleCopyNibd}
                            >
                                <button className="flex gap-2 items-center">
                                    <CopyIcon />
                                    {isCopiedNibd && (
                                        <span className="px-2 py-1 rounded-lg bg-primary text-white font-semibold text-xs">
                                            Copied
                                        </span>
                                    )}
                                </button>
                            </CopyToClipboard>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between items-center px-6 py-3 border-b">
                        <h4 className="text-[#344054] text-base font-medium font-sans">
                            ИНН
                        </h4>
                        <h4 className="text-[#667085] text-sm leading-[22px] font-medium font-sans">
                            124123211
                        </h4>
                    </div>
                    <div className="flex justify-between items-center px-6 py-3 border-b">
                        <h4 className="text-[#344054] text-base font-medium font-sans">
                            Уставной фонд
                        </h4>
                        <h4 className="text-[#667085] text-sm leading-[22px] font-medium font-sans">
                            10 000 000,00 UZS
                        </h4>
                    </div>
                    <div className="flex justify-between items-center px-6 py-3 border-b">
                        <h4 className="text-[#344054] text-base font-medium font-sans">
                            Дата создания
                        </h4>
                        <h4 className="text-[#667085] text-sm leading-[22px] font-medium font-sans">
                            20.06.2021
                        </h4>
                    </div>
                    <div className="flex justify-between items-center px-6 py-3 border-b">
                        <h4 className="text-[#344054] text-base font-medium font-sans">
                            Кем создан
                        </h4>
                        <h4 className="text-[#667085] text-sm leading-[22px] font-medium font-sans">
                            Amiran Starkov
                        </h4>
                    </div>
                    <div className="flex justify-between items-center px-6 py-3 border-b">
                        <h4 className="text-[#344054] text-base font-medium font-sans">
                            Текущий менеджер
                        </h4>
                        <div className="flex items-center gap-4">
                            <h4 className="text-[#667085] text-sm leading-[22px] font-medium font-sans">
                                Amiran Starkov
                            </h4>
                            <span
                                className="cursor-pointer"
                                onClick={() => setOpenManager(true)}
                            >
                                <PencilIcon
                                    color="#039855"
                                    className="cursor-pointer"
                                />
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-6 py-3 border-b">
                        <h4 className="text-[#344054] text-base font-medium font-sans">
                            Телефон
                        </h4>
                        <div className="flex gap-4 items-center">
                            <h4 className="text-[#667085] text-sm leading-[22px] font-medium font-sans">
                                +998 91 555 85 58
                            </h4>
                            <span onClick={() => setOpenNumberModal(true)}>
                                <RoundedPlusIcon
                                    className="cursor-pointer"
                                    color="#039855"
                                />
                            </span>
                        </div>
                    </div>
                    {itemData.phoneNumber?.map((phoneNumber, index) => {
                        return (
                            <div
                                key={index}
                                className="flex justify-between items-center px-6 py-3 border-b"
                            >
                                <h4 className="text-[#344054] text-base font-medium font-sans">
                                    Номер телефона
                                </h4>
                                <h4 className="text-[#667085] text-sm leading-[22px] font-medium font-sans">
                                    {phoneNumber}
                                </h4>
                            </div>
                        );
                    })}
                    <div className="flex justify-between items-center px-6 py-3">
                        <h4 className="text-[#344054] text-base font-medium font-sans">
                            Адрес
                        </h4>
                        <h4 className="text-[#667085] text-sm leading-[22px] font-medium font-sans">
                            Ташкент, ул. Амира Темура, 6, 55
                        </h4>
                    </div>
                </div>
            </div>
            <Modal
                isForm
                open={openNumberModal}
                size="sm"
                onHandleChange={() => setOpenNumberModal(false)}
                header={
                    <div className="flex justify-between w-full">
                        <p>Введите дополнительный номер телефона</p>
                        <IconButton
                            className="bg-white"
                            size={28}
                            onClick={() => setOpenNumberModal(false)}
                        >
                            <CrossIcon />
                        </IconButton>
                    </div>
                }
                footer={
                    <TButton
                        variant="filled"
                        bgColor={"primary"}
                        className="w-full"
                        onClick={handleAddNumber}
                    >
                        Добавить
                    </TButton>
                }
            >
                <div className="p-6">
                    <TextField
                        name="phoneNumber"
                        placeholder="+998 94 950 18 81"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
            </Modal>
            <Modal
                isForm
                open={openManager}
                size="sm"
                onHandleChange={() => setOpenManager(false)}
                header={
                    <div className="flex justify-between w-full">
                        <p>Заменить менеджера</p>
                        <IconButton
                            className="bg-white"
                            size={28}
                            onClick={() => setOpenManager(false)}
                        >
                            <CrossIcon />
                        </IconButton>
                    </div>
                }
                footer={
                    <TButton
                        variant="outlined"
                        className="w-full text-[#98A2B3] bg-[#F2F4F7]"
                        disabled
                    >
                        Добавить
                    </TButton>
                }
            >
                <div className="p-6 flex flex-col gap-6">
                    <SelectWithIcon
                        name="tax"
                        options={[
                            {
                                label: "Азатов Тимур Евгеньевич",
                                value: "364380012152321",
                            },
                            {
                                label: "Тураев Амир Тимурович",
                                value: "356840020152584",
                            },
                            {
                                label: "Тимошенко Ангелина Владимировна",
                                value: "352131256352545",
                            },
                        ]}
                        withSearch
                        label="Поиск по ФИО/ПИНФЛ"
                        placeholder="Поиск по ФИО"
                        className="w-full"
                    />
                    <div className="pb-32">
                        <p className="pb-1 text-[#667085] font-medium text-sm">
                            Текущий менеджер
                        </p>
                        <div className="flex gap-2 items-center bg-[#FCFCFC] rounded-lg border p-3">
                            <UserIcon size={50} />
                            <div className="flex flex-col gap-1">
                                <p className="text-[#333] font-medium text-base">
                                    Азатов Тимур Евгеньевич
                                </p>
                                <p className="text-[#667085] font-medium text-base">
                                    364380012152321
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
