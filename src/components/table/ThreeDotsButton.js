import React, { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { ThreeDots, TButton } from "@zaytun/components";
import Modal from "@/components/Modal";
import { IoCloseSharp } from "react-icons/io5";
import cx from "classnames";
import "./table.css";

import { AnimatePresence, motion } from "framer-motion";
const ThreeDotsButton = ({ handleRemove, handleEdit, children }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const onHandleRemove = () => {
        setOpenMenu(false);
        setOpenConfirmModal(true);
    };

    return (
        <div>
            <div
                onMouseLeave={() => setOpenMenu(false)}
                className="flex items-center relative w-fit"
            >
                <IconButton
                    variant="text"
                    size="md"
                    onMouseEnter={() => setOpenMenu(true)}
                    // onMouseLeave={() => setOpenMenu(false)}
                    onClick={() => setOpenMenu(true)}
                >
                    <ThreeDots />
                </IconButton>
                {openMenu && (
                    <AnimatePresence>
                        <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                transition: { duration: 0.3 },
                            }}
                            exit={{ y: 50, opacity: 0 }}
                            className={cx("three-dots-actions-container z-[1]")}
                        >
                            {handleEdit && (
                                <div
                                    onClick={() => {
                                        handleEdit();
                                        setOpenMenu(false);
                                    }}
                                    className="three-dots-actions-item"
                                >
                                    Редактировать
                                </div>
                            )}
                            {handleRemove && (
                                <div
                                    onClick={onHandleRemove}
                                    className="three-dots-actions-item"
                                >
                                    Открепить
                                </div>
                            )}
                            <div>{children}</div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
            <Modal
                open={openConfirmModal}
                size="sm"
                onHandleChange={() => setOpenConfirmModal(false)}
            >
                <div className="relative">
                    <div className="absolute right-0 top-[-50px]">
                        <IconButton
                            variant="text"
                            onClick={() => setOpenConfirmModal(false)}
                        >
                            <IoCloseSharp size={20} />
                        </IconButton>
                    </div>
                    <div className="my-[44px] ml-2">
                        <p className="text-[18px] font-semibold text-black">
                            Вы уверены, что хотите открепить?
                        </p>
                        {/* <p className="text-[16px] font-semibold text-[#667085]">*/}
                        {/*  Не забудьте сохранить все изменения, если они есть!*/}
                        {/* </p>*/}
                    </div>
                    <div className="flex justify-end gap-4 items-center">
                        <TButton
                            onClick={() => setOpenConfirmModal(false)}
                            variant="outlined"
                            className="w-[120px]  py-[7px]"
                        >
                            Отменить
                        </TButton>
                        <TButton
                            onClick={handleRemove}
                            variant="filled"
                            className="bg-red-500 w-[120px] py-[7px]"
                        >
                            ОК
                        </TButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ThreeDotsButton;
