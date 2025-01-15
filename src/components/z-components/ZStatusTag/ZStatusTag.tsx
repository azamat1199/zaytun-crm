import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ZStatusTagProps extends ComponentPropsWithoutRef<"div"> {
    color?: "danger" | "success";
    variant?: "contained";
    children: ReactNode;
}

const ZStatusTag: FC<ZStatusTagProps> = (props) => {
    const { color = "danger", className, children, ...computedProps } = props;

    const baseStyles = [
        "w-20 h-[22px]  flex items-center justify-center font-medium text-sm leading-5 rounded-xl text-white",
    ];

    const dangerColorStyles = [
        "bg-c_error-400 animate-pulse shadow-[0px_0px_0px_4px_#FFBCBC]",
    ];
    const successColorStyles = [
        "bg-c_primary shadow-[0px_0px_0px_4px_#D1FADF]",
    ];

    return (
        <div
            className={twMerge([
                baseStyles,
                color === "danger" && dangerColorStyles,
                color === "success" && successColorStyles,
                className,
            ])}
            {...computedProps}
        >
            {children}
        </div>
    );
};

export default ZStatusTag;
