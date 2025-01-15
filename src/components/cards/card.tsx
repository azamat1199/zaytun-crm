import React from "react";
import { TButton } from "@zaytun/components";
import cx from "classnames";
import RightArrowPrimary from "@/components/icons/right-arrow-primary";

interface CardProps {
    readonly item?: any;
    handleClick?: any;
    readonly className?: string;
}
const Card = (props: CardProps) => {
    const { item, handleClick, className } = props;
    return (
        <div className={cx("p-6 border-2 rounded-[8px]", className)}>
            <p className="text-2xl font-semibold">{item?.title || ""}</p>

            <div className="flex items-center justify-between mt-12">
                <p className="text-[16px] text-primary font-semibold">
                    Кол-во: {item?.amount || ""}
                </p>
                <TButton
                    className="text-primary"
                    variant="text"
                    endIcon={<RightArrowPrimary />}
                    onClick={() => handleClick(item)}
                >
                    <p className="text-primary">Перейти</p>
                </TButton>
            </div>
        </div>
    );
};

export default Card;
