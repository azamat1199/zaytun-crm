import React, { useState } from "react";
import { UserAvatar } from "../icons/user-avatar";
import { ImagePlaceholderIcon } from "../icons/image-placeholder-icon";

interface AvatarProps {
    readonly size?:
        | "1xs"
        | "2xs"
        | "xs"
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl"
        | "4xl";
    readonly border?: boolean;
    readonly isOnline?: boolean;
    readonly src?: string;
    readonly type?: "image" | "avatar";
    readonly nameShort?: string;
}

export const Avatar = (props: AvatarProps) => {
    const {
        size = "xs",
        border = false,
        isOnline = false,
        src,
        type = "avatar",
        nameShort,
    } = props;
    const [brokenImage, setBrokenImage] = useState(false);
    let boxSize = 16;
    switch (size) {
        case "2xs":
            boxSize = 16;
            break;
        case "1xs":
            boxSize = 20;
            break;
        case "xs":
            boxSize = 24;
            break;
        case "sm":
            boxSize = 32;
            break;
        case "md":
            boxSize = 40;
            break;
        case "lg":
            boxSize = 48;
            break;
        case "xl":
            boxSize = 56;
            break;
        case "2xl":
            boxSize = 64;
            break;
        case "3xl":
            boxSize = 96;
            break;
        case "4xl":
            boxSize = 160;
            break;
    }
    let svgSize = 18;
    switch (size) {
        case "2xs":
            svgSize = 10;
            break;
        case "1xs":
            svgSize = 12;
            break;
        case "xs":
            svgSize = 14;
            break;
        case "sm":
            svgSize = 22;
            break;
        case "md":
            svgSize = 28;
            break;
        case "lg":
            svgSize = 36;
            break;
        case "xl":
            svgSize = 38;
            break;
        case "2xl":
            svgSize = 42;
            break;
        case "3xl":
            svgSize = 60;
            break;
        case "4xl":
            svgSize = 70;
            break;
    }

    let spanSize = 6;
    switch (size) {
        case "2xs":
            spanSize = 6;
            break;
        case "1xs":
            spanSize = 6;
            break;
        case "xs":
            spanSize = 6;
            break;
        case "sm":
            spanSize = 8;
            break;
        case "md":
            spanSize = 10;
            break;
        case "lg":
            spanSize = 12;
            break;
        case "xl":
            spanSize = 14;
            break;
        case "2xl":
            spanSize = 16;
            break;
        case "3xl":
            spanSize = 20;
            break;
        case "4xl":
            spanSize = 25;
            break;
    }
    let textSize = 11;
    switch (size) {
        case "2xs":
            textSize = 6;
            break;
        case "1xs":
            textSize = 8;
            break;
        case "xs":
            textSize = 11;
            break;
        case "sm":
            textSize = 14;
            break;
        case "md":
            textSize = 16;
            break;
        case "lg":
            textSize = 18;
            break;
        case "xl":
            textSize = 20;
            break;
        case "2xl":
            textSize = 24;
            break;
        case "3xl":
            textSize = 30;
            break;
        case "4xl":
            textSize = 56;
            break;
    }
    let spanPosition = 0;
    switch (size) {
        case "2xs":
            spanPosition = 0;
            break;
        case "1xs":
            spanPosition = 0;
            break;
        case "xs":
            spanPosition = 1;
            break;
        case "sm":
            spanPosition = 1;
            break;
        case "md":
            spanPosition = 1.5;
            break;
        case "lg":
            spanPosition = 2;
            break;
        case "xl":
            spanPosition = 2;
            break;
        case "2xl":
            spanPosition = 3;
            break;
        case "3xl":
            spanPosition = 4;
            break;
        case "4xl":
            spanPosition = 10;
            break;
    }
    const isImage = type === "image";
    const handleErrorImage = () => {
        setBrokenImage(true);
    };

    return (
        <div
            className="relative"
            style={{
                width: boxSize,
                height: boxSize,
            }}
        >
            <div
                style={{
                    width: boxSize,
                    height: boxSize,
                    background: isImage ? "#ffffff" : "#F9F5FF",
                    border: isImage
                        ? "2px solid #D5DFE5"
                        : border
                          ? "4px solid #F4EBFF"
                          : "none",
                }}
                className={`flex items-center justify-center rounded-[50%] overflow-hidden`}
            >
                {src && !brokenImage ? (
                    <img
                        loading="lazy"
                        src={src}
                        onError={handleErrorImage}
                        alt="Avatar"
                        className="w-full h-full object-cover "
                    />
                ) : nameShort ? (
                    <p
                        className="text-center text-[#7F56D9] font-semibold"
                        style={{ fontSize: textSize }}
                    >
                        {nameShort.slice(0, 2).toUpperCase()}
                    </p>
                ) : isImage ? (
                    <ImagePlaceholderIcon size={svgSize - 4} />
                ) : (
                    <UserAvatar size={svgSize} />
                )}
            </div>
            {!isImage && isOnline && (
                <span
                    style={{
                        width: spanSize,
                        height: spanSize,
                        right: spanPosition,
                        bottom: spanPosition,
                    }}
                    className={`border border-[2] border-[#ffffff] rounded-[50%] bg-primary absolute`}
                />
            )}
        </div>
    );
};
