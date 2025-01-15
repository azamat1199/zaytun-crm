"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import cx from "classnames";
import "./sidebar.css";

const SubMenu = ({ data, subMenuOpen = false, onSetSubMenuOpen }) => {
    const pathname = usePathname();

    return (
        <>
            <li
                className={cx("sidebar-menu-list-item", {
                    "bg-[#F6F6F6]": pathname.includes(data.section),
                })}
                onClick={onSetSubMenuOpen}
            >
                <data.icon size={20} className="min-w-max text-secondary" />
                <p className="sidebar-menu-list-item-title">{data.name}</p>
                <Image
                    width={14}
                    height={14}
                    src="/images/Chevron.svg"
                    alt="Your Name"
                    className={` ${subMenuOpen && "rotate-180 "} duration-200 `}
                />
            </li>
            <motion.ul
                animate={{
                    height: subMenuOpen ? "fit-content" : 0,
                }}
                initial={{
                    height: 0,
                }}
                className="flex flex-col pl-[33px] gap-1 font-medium overflow-hidden"
            >
                {data.menus?.map((menu, index) => (
                    <li key={index} className="sidebar-submenu-item">
                        {/* className="hover:text-blue-600 hover:font-medium" */}
                        <Link
                            href={`${menu.path}`}
                            className={cx("sidebar-menu-list-item-title-link", {
                                "bg-[#F6F6F6]": pathname === menu.path,
                                "bg-white": pathname !== menu.path,
                            })}
                        >
                            {menu.label}
                        </Link>
                    </li>
                ))}
            </motion.ul>
        </>
    );
};

export default SubMenu;
