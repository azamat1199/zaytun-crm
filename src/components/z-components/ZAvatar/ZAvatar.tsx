"use client";
import { getFilePath } from "@/utils/common";
import { UserAvatar } from "@zaytun/components";
import Image from "next/image";
import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

interface ZAvatarProps extends ComponentPropsWithoutRef<"div"> {
    size?:
        | "2xs"
        | "1xs"
        | "xs"
        | "2xs"
        | "sm"
        | "2sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl";
    shape?: "circle" | "rectangle";
    filePath?: string;
    fileName?: string;
}

const ZAvatar: FC<ZAvatarProps> = (props) => {
    const {
        className,
        size = "md",
        filePath = "",
        shape = "circle",
        fileName,
        ...computedProps
    } = props;

    const circleStyles = ["rounded-full [&>img]:rounded-full"];
    const twoXsSize = ["w-4 h-4"];
    const oneXsSize = ["w-5 h-5"];
    const xsSize = ["w-6 h-6"];
    const smSize = ["w-8 h-8"];
    const mdSize = ["w-10 h-10"];
    const twoXlSize = ["w-16 h-16"];
    const xlSize = ["w-14 h-14"];
    const lgSize = ["w-12 h-12"];

    const src = getFilePath(filePath);

    return (
        <div
            className={twMerge(
                "relative",
                shape === "circle" && circleStyles,
                size === "2xs" && twoXsSize,
                size === "1xs" && oneXsSize,
                size === "xs" && xsSize,
                size === "sm" && smSize,
                size === "md" && mdSize,
                size === "2xl" && twoXlSize,
                size === "xl" && xlSize,
                size === "lg" && lgSize,
                className,
            )}
            {...computedProps}
        >
            {src ? (
                <Image
                    alt={fileName || ""}
                    objectFit="contain "
                    layout="fill"
                    src={src}
                />
            ) : (
                <UserAvatar size={36} />
            )}
        </div>
    );
};

export default ZAvatar;
