import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useAppSelector } from "./useAppSelector";
import { revertPageCode } from "@/utils/common";

const useUserInfo = () => {
    const pathname = usePathname();
    const { modules, info } = useAppSelector((store) => store.user);

    const { currentModuleCode, currentPageCode, currentSubModuleCode } =
        useMemo(() => {
            const parts = pathname.split("/").slice(1);


            return {
                currentModuleCode: revertPageCode(parts?.[1]),
                currentSubModuleCode: revertPageCode(parts?.[2]),
                currentPageCode: revertPageCode(parts?.[3]),
            };
        }, [pathname]);

    const currentSubModules =
        modules[revertPageCode(currentModuleCode)]?.subModules || [];

    return {
        currentSubModules,
        currentPageCode,
        currentSubModuleCode,
        currentModuleCode,
        info,
    };
};

export default useUserInfo;
