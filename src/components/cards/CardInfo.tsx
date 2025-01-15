import React from "react";
import { TButton } from "@zaytun/components";
import cx from "classnames";
import RightArrowPrimary from "@/components/icons/right-arrow-primary";

interface CardProps {
    readonly item?: any;
    handleClick?: any;
    readonly className?: string;
}
const CardInfo = (props: CardProps) => {
    const { item, handleClick, className } = props;
    return (
        <div className={cx("p-6 border-2 rounded-[8px]", className)}>
            <p className="text-2xl font-semibold">{item?.title || ""}</p>
            <ul className="decoration-2 mt-3">
                {item.categories.map((item: any) => (
                    <li
                        key={item.id}
                        className="text-sm text-[#667085] leading-6"
                    >
                        • {item.description}
                    </li>
                ))}
            </ul>

            <div className="flex items-center justify-end mt-12">
                <TButton
                    className="text-primary "
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

export default CardInfo;
