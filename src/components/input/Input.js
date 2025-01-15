import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import cx from "classnames";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import "./input.css";

const withoutLabel = "without-label";
const withoutLabelError = "without-label-error";
const classNameWithLeftIcon = `pl-11 ${withoutLabel}`;
const classNameWithRightIcon = `pr-11 ${withoutLabel}`;
const leftIcon = "left-icon";
const rightIcon = "right-icon";

export function TextField(props) {
    const {
        name,
        placeholder,
        fullWidth,
        onChange,
        disabled,
        readOnly,
        containerclassname = "min-w-[139px]",
        className,
        type = "text",
        inputprops,
        error = false,
        variant = "outlined",
    } = props;
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div
            className={cx("relative w-full overflow-visible", {
                [containerclassname + " " + "min-w-[139px] "]: !fullWidth,
            })}
        >
            {inputprops?.leftIcon && (
                <inputprops.leftIcon className={leftIcon} />
            )}
            <Input
                {...props}
                name={name}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                className={cx(`w-full shadow-none`, className, {
                    [`max-w-[100%]`]: fullWidth,
                    [classNameWithLeftIcon]: inputprops?.leftIcon,
                    [classNameWithRightIcon]:
                        inputprops?.rightIcon || isPassword,
                    [withoutLabel]: !error && variant !== "static",
                    [withoutLabelError]: error,
                })}
                labelProps={{
                    className: "hidden",
                }}
                containerProps={{
                    className: "!min-w-[139px]",
                }}
                error={error}
                variant={variant}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                onChange={onChange}
            />
            {isPassword && !showPassword && (
                <BsFillEyeSlashFill
                    onClick={() => setShowPassword(true)}
                    className={cx(rightIcon, "cursor-pointer")}
                />
            )}
            {isPassword && showPassword && (
                <BsFillEyeFill
                    onClick={() => setShowPassword(false)}
                    className={cx(rightIcon, "cursor-pointer")}
                />
            )}
            {!isPassword && inputprops?.rightIcon && (
                <inputprops.rightIcon className={rightIcon} />
            )}
        </div>
    );
}
