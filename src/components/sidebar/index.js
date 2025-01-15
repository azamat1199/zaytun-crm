"use client";
import React, { useEffect, useMemo } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import { MdExitToApp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { setSidebarView } from "@/providers/redux/slices/navbarSlice";
import AddressCard from "../icons/address-card";
import { PortalIcon } from "../icons/portal-icon";
import "./sidebar.css";
import { HrIcon } from "../icons/hr-icon";
import { DocumentIcon } from "../icons/document-icon";
import { AdministrationIcon } from "../icons/administration-icon";
import { setInitialUserData } from "@/providers/redux/slices/userSlice";
import { formatPageCode, formatUserData } from "@/utils/common";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/hooks/helpers/useAppSelector";
import useAppLocale from "@/hooks/helpers/useAppLocale";
import LogOutModal from "../header/LogOutModal";
import useGetMe from "@/hooks/api/useGetMe";
import Skeleton from "react-loading-skeleton";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

const icons = {
    PORTAL: PortalIcon,
    CRM: AddressCard,
    HR: HrIcon,
    DOCUMENT_FLOW: DocumentIcon,
    ADMINISTRATION: AdministrationIcon,
};

const SidebarBottomLink = ({
    text,
    leftProps,
    color = "text-secondary",
    open,
}) => {
    return (
        <AnimatePresence>
            <Link href="/" className="flex gap-3 pl-3 py-[10px]">
                <div className="w-[20px] h-[20px]]">
                    <leftProps.icon size={20} className={color} />
                </div>
                {open && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={color}
                    >
                        {text}
                    </motion.p>
                )}
            </Link>
        </AnimatePresence>
    );
};

const Sidebar = () => {
    const { t } = useAppTranslations();
    const pathname = usePathname();
    const locale = useAppLocale();
    const userState = useGetMe();
    const [openLogOut, setOpenLogOut] = React.useState(false);
    // const isTabletMid = useMediaQuery({ query: '(max-width: 768px)' });
    const dispatch = useDispatch();
    const open = useSelector((store) => store.navbar.sidebarView);
    const modules = useAppSelector((store) => store.user.modules);
    // const [openedSubMenuIdx, setOpenedSubMenuIdx] = useState(null);

    useEffect(() => {
        if (userState.isSuccess) {
            const {
                data: {
                    result: {
                        data: { firstName, lastName, ...rest },
                    },
                },
            } = userState;
            const modules = formatUserData(rest.modules);

            dispatch(
                setInitialUserData({
                    modules,
                    info: { firstName, lastName, ...rest },
                }),
            );
        }
    }, [userState.isSuccess, userState.data]);

    const navAnimation = {
        open: {
            x: 0,
            maxWidth: "256px",
            display: "flex",
        },
        collapsed: {
            width: 0,
            // display: 'none',
            left: -80,
            duration: 0.7,
        },
    };

    const preparedModules = useMemo(() => {
        switch (userState.status) {
            case "pending":
                return new Array(4)
                    .fill({})
                    .reduce(
                        (acc, cur, index) => ({ ...acc, [index]: acc }),
                        {},
                    );
            case "success":
                return modules;
            default:
                return {};
        }
    }, [userState.status, modules]);

    return (
        <motion.div
            variants={navAnimation}
            initial={{ maxWidth: "256px" }}
            animate={open ? "open" : "collapsed"}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`sidebar w-full border-[rgba(0, 0, 0, 0.10)] absolute z-40`}
        >
            <motion.div
                animate={open ? "open" : "collapsed"}
                initial={{ rotate: 180, translateX: "-50%" }}
                transition={{ duration: 0.5 }}
                variants={{
                    open: { rotate: 180, translateX: "-50%" },
                    collapsed: { rotate: 0, translateX: "-50%" },
                }}
                onClick={() => dispatch(setSidebarView(false))}
                className="sidebar-toggle"
            >
                <IoIosArrowForward className="text-[#000]" />
            </motion.div>
            <div className="flex flex-col flex-1 font-medium overflow-auto">
                <p className="text-[0.9rem] text-secondary pl-3 pb-1">Меню</p>
                <ul className="sidebar-menu sidebar-menu-tw">
                    <div className="border-slate-300 flex flex-col gap-[8px]">
                        {Object.values(preparedModules).map((module, index) => {
                            const IconComponent = icons?.[module.code];
                            return (
                                <li
                                    key={index}
                                    className={twMerge(
                                        pathname.startsWith(
                                            `/${locale}/${formatPageCode(module.code)}`,
                                        ) &&
                                            "bg-primary rounded-[8px] [&>a>span]:text-white [&>a>svg>path]:stroke-white",
                                    )}
                                >
                                    <Link
                                        href={module.initialPage || "#"}
                                        className="sidebar-menu-l-item"
                                    >
                                        {IconComponent &&
                                        !userState.isLoading ? (
                                            <IconComponent />
                                        ) : (
                                            <Skeleton width={20} height={20} />
                                        )}
                                        <span>
                                            {!userState.isLoading ? (
                                                t(module.code)
                                            ) : (
                                                <Skeleton
                                                    width={150}
                                                    height={20}
                                                />
                                            )}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </div>
                </ul>
            </div>
            <div className="sidebar-bottom-links-wrapper">
                <SidebarBottomLink
                    leftProps={{ icon: IoSettingsOutline }}
                    text="Настройки"
                    open={open}
                />
                <SidebarBottomLink
                    leftProps={{ icon: AiOutlineQuestionCircle }}
                    text="Поддержка"
                    open={open}
                />
                <div onClick={() => setOpenLogOut(true)}>
                    <SidebarBottomLink
                        leftProps={{ icon: MdExitToApp }}
                        text="Выйти"
                        color="text-red-500"
                        open={open}
                    />
                </div>
            </div>
            <LogOutModal show={openLogOut} closeModal={setOpenLogOut} />
        </motion.div>
    );
};

export default Sidebar;
