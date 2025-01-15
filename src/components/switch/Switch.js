import React from "react";
import { Switch as Toggle } from "@material-tailwind/react";
import PropTypes from "prop-types";
import cx from "classnames";

export default function Switch(props) {
    const { label, variant } = props;
    return (
        <div
            className={cx({
                "border border-gray-100 px-2 pt-2 py-1 max-w-min rounded-lg":
                    variant === "outlined",
            })}
        >
            <Toggle
                ripple={false}
                label={label}
                className={`h-full w-full checked:bg-primary`}
                containerProps={{
                    className: "w-11 h-6 ",
                }}
                labelProps={{
                    className: "capitalize",
                }}
                circleProps={{
                    className: "before:hidden left-0.5 border-none",
                }}
                {...props}
            />
        </div>
    );
}
Switch.propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
};
