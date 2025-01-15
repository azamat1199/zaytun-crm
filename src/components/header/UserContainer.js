import { useState } from "react";
import { useAppDispatch } from "@/hooks/helpers/useAppDispatch";
import useAppLocale from "@/hooks/helpers/useAppLocale";
import { setLang } from "@/providers/redux/slices/translation";
import {
    Popover,
    PopoverContent,
    PopoverHandler,
} from "@material-tailwind/react";
import {
    ArrowDownIcon,
    Avatar,
    CalendarIcon,
    LogoutIcon,
    MoonIcon,
    RussiaIcon,
    SettingsIcon,
    SunIcon,
    SupportIcon,
    UzIcon,
} from "@zaytun/components";
import { usePathname, useRouter } from "next-intl/client";
import "./header.css";
import LogOutModal from "./LogOutModal";
import useUserInfo from "@/hooks/helpers/useUserInfo";
import { joinArray } from "@/utils/common";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import UsIcon from "@/components/icons/us-icon";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import { useSearchParams } from "next/navigation";

const UserContainer = () => {
    const router = useRouter();
    const { t } = useAppTranslations();
    const isDark = false;
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const { getWord } = useKeyTranslation();
    const [openPopover, setOpenPopover] = useState(false);
    const [openLogOut, setOpenLogOut] = useState(false);
    const pathname = usePathname();
    const locale = useAppLocale();
    const { info } = useUserInfo();
    const list = [
        {
            id: 1,
            label: t("Настройки профиля"),
            path: "",
            icon: <SettingsIcon color="#667085" />,
        },
        {
            id: 2,
            label: t("Поддержка"),
            path: "",
            icon: <SupportIcon color="#667085" />,
        },
        {
            id: 3,
            label: t("Отложенные действия"),
            path: "",
            icon: <CalendarIcon color="#667085" />,
        },
    ];
    const languagesList = [
        {
            id: 1,
            label: "RU",
            locale: "ru",
            icon: <RussiaIcon />,
        },
        {
            id: 2,
            label: "EN",
            locale: "cr",
            icon: <UsIcon />,
        },
        {
            id: 3,
            label: "UZ",
            locale: "uz",
            icon: <UzIcon />,
        },
    ];

    const switchLocale = (lang) => {
        dispatch(setLang(lang));
        const params = new URLSearchParams(searchParams);
        router.push(`${pathname}?${params.toString()}`, { locale: lang });
    };

    return (
        <>
            <Popover open={openPopover} placement="bottom-end">
                <div className="relative">
                    <PopoverHandler onClick={() => setOpenPopover(true)}>
                        <div className="sidebar-header cursor-pointer p-0">
                            <Avatar
                                size="md"
                                // src={user?.image}
                            />
                            <ArrowDownIcon size={16} />
                        </div>
                    </PopoverHandler>
                    <PopoverContent
                        onMouseLeave={() => setOpenPopover(false)}
                        className="w-[256px] p-0 z-30"
                    >
                        <div className="flex items-center gap-3 py-2 px-4">
                            <Avatar
                                size="lg"
                                // src={user?.image}
                            />
                            <div className="popover-name-wrapper">
                                <p className="font-[500] text-[14px] text-[#344054] bg-[344054]">
                                    {info.firstName} {info.lastName}
                                </p>
                                <p className="sidebar-header-full-name">
                                    {Array.isArray(info?.roles)
                                        ? joinArray(
                                              info.roles.map((role) =>
                                                  getWord(
                                                      role.localaziableName,
                                                  ),
                                              ),
                                          )
                                        : "-"}
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between py-2 px-4">
                            {languagesList.map((item) => (
                                <span
                                    key={item.id}
                                    className="outline-none cursor-pointer"
                                >
                                    <div
                                        style={{
                                            opacity:
                                                locale.toLowerCase() ===
                                                item.locale
                                                    ? 1
                                                    : 0.2,
                                        }}
                                        onClick={() => {
                                            setOpenPopover(false);
                                            switchLocale(item.locale);
                                        }}
                                        className="popover-lang-item"
                                    >
                                        {item.icon} <p>{item.label}</p>
                                    </div>
                                </span>
                            ))}
                        </div>
                        {list.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    item.path && router.push(item.path);
                                    setOpenPopover(false);
                                }}
                                className="popover-item flex cursor-pointer items-center gap-2 px-4 py-2 font-semibold text-sm text-gray-700"
                            >
                                {item.icon} <p>{item.label}</p>
                            </div>
                        ))}
                        <div className="popover-item flex cursor-pointer items-center gap-2 px-4 py-2 font-semibold text-sm text-gray-700">
                            {isDark ? (
                                <>
                                    <SunIcon color="#667085" />
                                    <p>{t("light_mode")}</p>
                                </>
                            ) : (
                                <>
                                    <MoonIcon color="#667085" />
                                    <p>Темный режим</p>
                                </>
                            )}
                        </div>
                        <hr />
                        <div
                            className="popover-item text-red-500 flex cursor-pointer items-center gap-2 px-4 py-2 font-semibold text-sm"
                            onClick={() => {
                                setOpenLogOut(true);
                                setOpenPopover(false);
                            }}
                        >
                            <LogoutIcon color="#F04438" /> <p>Выйти</p>
                        </div>
                    </PopoverContent>
                </div>
            </Popover>
            <LogOutModal show={openLogOut} closeModal={setOpenLogOut} />
        </>
    );
};

export default UserContainer;
