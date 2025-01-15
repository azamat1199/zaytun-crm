/* eslint-disable */
import React from "react";

function DragIcon({ className }) {
    return (
        <svg
            className={className}
            width="20"
            height="8"
            viewBox="0 0 20 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <line
                y1="6.75"
                x2="20"
                y2="6.75"
                stroke="#667085"
                strokeWidth="1.5"
            />
            <line
                y1="0.75"
                x2="20"
                y2="0.75"
                stroke="#667085"
                strokeWidth="1.5"
            />
        </svg>
    );
}

export default DragIcon;
