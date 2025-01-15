import { FC } from "react";
import { twMerge } from "tailwind-merge";

interface ZDividerProps {
    className?: string;
}

const ZDivider: FC<ZDividerProps> = ({ className }) => {
    return (
        <div
            className={twMerge(
                "w-full border border-[#E4E6E8] h-[1px]",
                className,
            )}
        />
    );
};

export default ZDivider;
