import React from "react";
import { TButton } from "@zaytun/components";
import { IconButton } from "@material-tailwind/react";
import { IoCloseSharp } from "react-icons/io5";
import { logout, logoutRequest } from "@/data/auth";
import { useMutation } from "@tanstack/react-query";
import Modal from "@/components/Modal";
import { openToast } from "../notification";
import { getErrorMessages } from "@/utils/common";

const LogOutModal = ({ show, closeModal }) => {
    const logoutMutation = useMutation({
        mutationFn: logoutRequest,
        mutationKey: ["logout"],
        onSuccess: logout,
        onError: (err) => {
            openToast({ variant: "error", text: getErrorMessages(err, false) });
        },
    });

    return (
        <Modal open={show} onHandleChange={() => closeModal(false)} size="sm">
            <div className="relative">
                <div className="absolute right-0 top-[-50px]">
                    <IconButton
                        variant="text"
                        onClick={() => closeModal(false)}
                    >
                        <IoCloseSharp size={20} />
                    </IconButton>
                </div>
                <div className="my-[44px] ml-2">
                    <p className="text-[18px] font-semibold text-black">
                        Вы уверены, что хотите покинуть?
                    </p>
                    <p className="text-[16px] font-semibold text-[#667085]">
                        Не забудьте сохранить все изменения, если они есть!
                    </p>
                </div>
                <div className="flex justify-end gap-4 items-center">
                    <TButton
                        onClick={() => closeModal(false)}
                        variant="outlined"
                        className="w-[120px]  py-[7px]"
                    >
                        Отменить
                    </TButton>
                    <TButton
                        onClick={logoutMutation.mutate}
                        variant="filled"
                        className="bg-red-500 w-[120px] py-[7px]"
                        loading={logoutMutation.isPending}
                    >
                        ОК
                    </TButton>
                </div>
            </div>
        </Modal>
    );
};

export default LogOutModal;
