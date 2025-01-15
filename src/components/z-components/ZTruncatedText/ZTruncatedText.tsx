import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

interface ZTruncatedTextProps extends ComponentPropsWithoutRef<"p"> {
    withTooltip?: boolean;
}

const ZTruncatedText: FC<ZTruncatedTextProps> = (props) => {
    const { className, children, ...computedProps } = props;

    const content = (
        <p
            className={twMerge(
                "line-clamp-1 overflow-hidden overflow-ellipsis break-all",
                className,
            )}
            {...computedProps}
        >
            {children}
        </p>
    );

    return content;
};

export default ZTruncatedText;
