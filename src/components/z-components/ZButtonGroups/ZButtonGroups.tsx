import React, { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";
import ZButton, { ZButtonProps } from "../ZButton/ZButton";

interface ZButtonGroupsProps extends ComponentPropsWithoutRef<"ul"> {
    buttons: Array<ZButtonProps & { value: string }>;
    handleButtonClick?: (value: string) => void;
    activeButton?: any;
    size?: ZButtonProps["size"];
}

/**
 * ZButtonGroups is a group of customizable button components.
 *
 * @component
 *
 * @example
 * // Basic usage
 * <ZButtonGroups
 *   buttons={[
 *     { value: 'button1', children: 'Button 1' },
 *     { value: 'button2', children: 'Button 2' },
 *   ]}
 *   handleButtonClick
 *   activeButton="button1"
 * />
 *
 * @param {Object} props - The props for ZButtonGroups component.
 * @param {Array<{ value: string } & ZButtonProps>} props.buttons - An array of objects containing button properties.
 * @param {Function} [props.handleButtonClick] - The function to handle button click events.
 * @param {*} [props.activeButton] - The value of the active button.
 * @param {('lg' | 'md' | 'sm' | 'xs')} [props.size='lg'] - The size of the buttons.
 * @returns {JSX.Element} - Rendered ZButtonGroups component.
 */

const ZButtonGroups: FC<ZButtonGroupsProps> = (props) => {
    const {
        className,
        buttons = [],
        activeButton,
        handleButtonClick,
        size = "lg",
        ...computedProps
    } = props;

    return (
        <ul
            role="list"
            {...computedProps}
            className={twMerge(["flex flex-row shadow-xs w-fit", className])}
        >
            {buttons.map(({ children, value, ...rest }, i) => {
                return (
                    <ZButton
                        className={`first:rounded-l-lg px-4 py-[10px] border-t border-b border-l-[0.5px] border-r-[0.5px] rounded-none last:rounded-r-lg last:border ${
                            activeButton === value ? "border-transparent" : ""
                        }`}
                        variant={
                            activeButton === value ? "primary" : "secondary"
                        }
                        key={i}
                        data-value={value}
                        onClick={() =>
                            handleButtonClick && handleButtonClick(value)
                        }
                        size={size}
                        {...rest}
                    >
                        {children}
                    </ZButton>
                );
            })}
        </ul>
    );
};

export default ZButtonGroups;
