import CurrencySelect from "@/components/header/select";
import { months2, weekDay } from "@/constants/dateConstatns";
import { useGetMeFromQuery } from "@/hooks/api/useGetMe";
import { useAppDispatch } from "@/hooks/helpers/useAppDispatch";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import useUserInfo from "@/hooks/helpers/useUserInfo";
import { setSidebarView } from "@/providers/redux/slices/navbarSlice";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "./header.css";
import UserContainer from "./UserContainer";
import ArrowDown2 from "../icons/ArrowDown2";

function Header() {
    const { t } = useAppTranslations();
    const dispatch = useAppDispatch();
    const { currentModuleCode } = useUserInfo();
    const date = new Date();
    const userState = useGetMeFromQuery();
    const { info } = useUserInfo();
    // const m = hijri('1410/8/28', 'iYYYY/iM/iD');
    // // console.log('year----', m.format('iYYYY/iM/iD [is] YYYY/M/D'));

    return (
        <header className="header">
            <nav className="header-con justify-between flex w-full flex-wrap">
                <div className="flex items-center gap-3 flex-wrap">
                    <div
                        className="cursor-pointer"
                        onClick={() => dispatch(setSidebarView(true))}
                    >
                        <Image
                            width={24}
                            height={24}
                            src="/images/hamburger.svg"
                            alt="logo two"
                        />
                    </div>
                    <div className="flex gap-3 ml-6 items-center">
                        <Link href="/">
                            <Image
                                width={32}
                                height={32}
                                src="/images/logo.svg"
                                alt="logo two"
                            />
                        </Link>
                        <div className="w-1 h-[26px] border-l-2" />
                        <p className="text-primary text-[14px] font-[600]">
                            {t(currentModuleCode)}
                        </p>
                        <div className="py-[5px] px-[8px] rounded-[16px] bg-[#ECFDF3]">
                            <p className="text-primary text-[12px] font-[500]">
                                {process.env.NEXT_PUBLIC_ENV}
                            </p>
                        </div>
                        <div className="w-1 h-[26px] border-l-2" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-[10px]">
                            <span className="ml-3 text-xs mx-3 text-secondary">
                                Опер.день
                            </span>
                            <div>
                                <p className="text-xs text-[#333333]">
                                    {moment().format("DD.MM.yyyy")}
                                </p>
                            </div>
                        </div>
                        <div className="w-[1px] h-[26px]  bg-[#667085]" />
                        <div>
                            <p className="text-[15px] text-primary">
                                {weekDay[date.getDay() - 1]}, {date.getDate()}{" "}
                                {months2[date.getMonth()]}
                            </p>
                            <p className="text-[15px]">9 Сафар 1445</p>
                        </div>
                    </div>
                    <div className="ml-10">
                        <CurrencySelect />
                    </div>
                </div>
                <div className="flex items-center gap-[40px]">
                    <div className="cursor-pointer">
                        <p className="text-[14px] font-body flex items-center gap-1">
                            {userState?.status !== "pending" ? (
                                <span>{info.firstName}</span>
                            ) : (
                                <Skeleton width={100} height={20} />
                            )}
                            {userState?.status !== "pending" ? (
                                <span>{info.lastName}</span>
                            ) : (
                                <Skeleton width={100} height={20} />
                            )}
                        </p>
                        <div className="flex items-center justify-end">
                            <p
                                className="text-[14px] text-primary"
                                style={{ textAlign: "end" }}
                            >
                                • В сети
                            </p>
                            <ArrowDown2 size="sm" />
                        </div>
                    </div>
                    {/* <div>
            <Image
              width={24}
              height={24}
              src="/images/avatar-icon.svg"
              alt="localisation"
            />
          </div> */}
                    <div>
                        <Image
                            width={24}
                            height={24}
                            src="/images/bell.svg"
                            alt="localisation"
                        />
                    </div>

                    <UserContainer />
                </div>
            </nav>
        </header>
    );
}

export default Header;
