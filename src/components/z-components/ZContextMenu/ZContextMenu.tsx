"use client";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuProps,
    MenuListProps,
    MenuItem,
    MenuItemProps,
    MenuHandlerProps,
} from "@material-tailwind/react";
import { FC, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface ZContextMenuProps extends MenuProps {
    children: ReactNode;
    list: Array<{
        label: ReactNode;
        value?: any;
        onClick?: (value: any) => void;
        rootClassName?: string;
    }>;
    menuListProps?: Omit<MenuListProps, "children" | "ref">;
    menuItemProps?: Omit<MenuItemProps, "ref">;
    menuHandler?: MenuHandlerProps;
}

/**
 * ZContextMenu is a context menu component.
 *
 * @component
 *
 * @example
 * // Basic usage
 *
 * @param {Object} props - The props for ZContextMenu component.
 * @param {ReactNode} props.children - The child component that triggers the context menu.
 * @param {Array<{ label: ReactNode, value?: any, onClick?: (value: any) => void, rootClassName?: string }>} props.list - An array of objects representing menu options.
 * @param {Omit<MenuListProps, 'children' | 'ref'>} [props.menuListProps] - Additional props for the menu list component.
 * @param {Omit<MenuItemProps, 'ref'>} [props.menuItemProps] - Additional props for the menu item component.
 * @param {MenuHandlerProps} [props.menuHandler] - Additional props for the menu handler component.
 * @returns {JSX.Element} - Rendered ZContextMenu component.
 */

const ZContextMenu: FC<ZContextMenuProps> = ({
    children,
    list,
    menuListProps,
    menuHandler,
    ...props
}) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <Menu
            placement="bottom-end"
            open={openMenu}
            handler={setOpenMenu}
            allowHover={false}
            {...props}
        >
            <MenuHandler {...menuHandler}>{children}</MenuHandler>
            <MenuList {...menuListProps}>
                {list.map((option, i) => (
                    <MenuItem
                        key={i}
                        onClick={() =>
                            option.onClick && option.onClick(option.value)
                        }
                        className={twMerge(
                            "text-b-2-r font-normal text-c_neutral-500",
                            option.rootClassName,
                        )}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};

export default ZContextMenu;
