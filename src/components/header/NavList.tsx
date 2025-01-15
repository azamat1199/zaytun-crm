import { useGetMeFromQuery } from "@/hooks/api/useGetMe";
import { useAppSelector } from "@/hooks/helpers/useAppSelector";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import useUserInfo from "@/hooks/helpers/useUserInfo";
import { createMockArray, revertPageCode } from "@/utils/common";
import cx from "classnames";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import "./header.css";

const NavList = () => {
    const { t } = useAppTranslations();
    const router = useRouter();
    const userState = useGetMeFromQuery();

    const { currentSubModules, currentSubModuleCode } = useUserInfo();
    const allSubModules = useAppSelector((store) => store.user.allSubModules);

    const handleTab = (code: string) => {
        const selected = allSubModules.find((module) => module.code === code);

        if (!selected) {
            return;
        }

        router.push(selected?.initialPage);
    };
    const variants = {
        active: { background: "#ffffff", borderRadius: "8px" },
        inactive: { background: "none", borderRadius: "0px" },
    };
    const variantsIndicator = {
        active: {
            background: "#ffffff",
            borderRadius: "8px",
            width: "100%",
            scale: 1,
            opacity: 0.1,
        },
        inactive: {
            background: "none",
            borderRadius: "0px",
            width: "0%",
            scale: 0.9,
        },
    };

    const preparedSubmodules = useMemo(() => {
        if (userState?.status === "pending") {
            return createMockArray({}, 4);
        }

        if (userState?.status === "success") {
            return currentSubModules;
        }

        return [];
    }, [userState?.status, currentSubModules]);


    return (
        <nav className="w-full py-1 px-[54px] bg-primary">
            <div className="navs-container flex">
                {preparedSubmodules.map(({ code }) => (
                    <motion.div
                        key={code}
                        animate={
                            currentSubModuleCode === revertPageCode(code)
                                ? "active"
                                : "inactive"
                        }
                        variants={variants}
                        transition={{ duration: 0.5 }}
                        onClick={() => handleTab(code)}
                        className={cx(
                            "text-[16px] text-[#ffffff] p-[10px] w-auto rounded-[8px] cursor-pointer transition relative",
                            {
                                [`text-primary font-semibold`]:
                                    currentSubModuleCode ===
                                    revertPageCode(code),
                            },
                        )}
                    >
                        {userState?.status === "success" ? (
                            t(revertPageCode(code))
                        ) : userState?.status === "pending" ? (
                            <Skeleton width={120} height={30} />
                        ) : (
                            "-"
                        )}
                        <motion.span
                            animate={
                                currentSubModuleCode === code
                                    ? "active"
                                    : "inactive"
                            }
                            variants={variantsIndicator}
                            transition={{ duration: 0.5 }}
                            className="absolute h-full top-0 left-0 flex items-center justify-center"
                        />
                    </motion.div>
                ))}
            </div>
        </nav>
    );
};

export default NavList;
