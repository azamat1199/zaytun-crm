import React from "react";
import cx from "classnames";
import { usePathname } from "next/navigation";
import {
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
} from "@material-tailwind/react";
import Link from "next/link";
import "./sidebar.css";

export function SubMenuCollapsed({ data = false, onSetSubMenuOpen }) {
    const pathname = usePathname();

    return (
        <li
            className={cx("sub-menu-collapsed-list-item", {
                "bg-[#F6F6F6]": pathname.includes(data.section),
            })}
            onClick={onSetSubMenuOpen}
        >
            <Menu placement="right-start">
                <MenuHandler>
                    <IconButton className="h-[40px]" variant="text">
                        <data.icon
                            size={20}
                            className="min-w-max text-secondary"
                        />
                    </IconButton>
                </MenuHandler>
                <MenuList className="p-2 flex flex-col gap-1">
                    {data.menus?.map((menu, index) => (
                        <li
                            key={index}
                            className="sidebar-submenu-item without-after"
                        >
                            <Link
                                href={`${menu.path}`}
                                className={cx(
                                    "sub-menu-collapsed-list-item-link",
                                    {
                                        "bg-[#F6F6F6]": pathname === menu.path,
                                        "bg-white": pathname !== menu.path,
                                    },
                                )}
                            >
                                {menu.label}
                            </Link>
                        </li>
                    ))}
                </MenuList>
            </Menu>
        </li>
    );
}
