import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyIcon } from "../icons/copy-icon";

const copyDuration = 1000;

export function CopyButton({ text, onCopy, className, label, classNameCopy }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        onCopy();
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, copyDuration);
    };

    return (
        <CopyToClipboard text={text} onCopy={handleCopy}>
            <button className={`flex gap-2 items-center `}>
                <span className={`${classNameCopy}`}>
                    <CopyIcon />
                </span>
                {isCopied && <span className={`${className}`}>{label}</span>}
            </button>
        </CopyToClipboard>
    );
}
