import {
    ComponentPropsWithoutRef,
    FC,
    Children,
    ReactNode,
    Fragment,
    cloneElement,
} from "react";
import { twMerge } from "tailwind-merge";
import ZFormLabel from "../ZFormLabel";

interface ZRadioGroupProps
    extends Omit<ComponentPropsWithoutRef<"div">, "children" | "onChange"> {
    label?: ReactNode;
    children: JSX.Element[] | JSX.Element;
    name?: string;
    onChange?: (name: string, value: string) => void;
    value?: string | number | boolean;
    direction?: "row" | "column";
    rootClassName?: string;
}

/**
 * ZRadioGroup component creates a group of radio buttons.
 *
 * @param {ZRadioGroupProps} props - Props for configuring the radio group.
 * @param {ReactNode} [props.label] - Label for the radio group.
 * @param {JSX.Element[] | JSX.Element} props.children - Radio button elements.
 * @param {string} [props.name] - Name for the radio group.
 * @param {(name: string, value: string) => void} [props.onChange] - Callback function triggered when a radio button is clicked.
 * @param {string | number | boolean} [props.value] - Value of the selected radio button.
 * @param {'row' | 'column'} [props.direction='row'] - Direction of the radio buttons layout.
 * @param {ComponentPropsWithoutRef<'div'>} [props.className] - Additional class names for styling purposes.
 * @param {string} [props.rootClassName] - external className for wrapper
 * @returns {React.ReactElement} The rendered radio group component.
 */
const ZRadioGroup: FC<ZRadioGroupProps> = (props) => {
    const {
        className,
        label,
        children,
        onChange,
        name,
        value,
        direction = "row",
        rootClassName,
        ...computedProps
    } = props;

    const childrenList = Array.isArray(children) ? children : [children];

    const handleClick = (e: any) => {
        if (!onChange) {
            return;
        }

        let clickedElement = e.target;

        while (clickedElement && !clickedElement.hasAttribute("data-value")) {
            clickedElement = clickedElement.parentNode;
        }

        const value = clickedElement.getAttribute("data-value");

        onChange(name || "", value);
    };

    return (
        <div
            onClick={handleClick}
            className={twMerge(rootClassName)}
            {...computedProps}
        >
            {label && <ZFormLabel className="mb-[6px]">{label}</ZFormLabel>}
            <div
                className={twMerge(
                    "flex gap-6",
                    direction === "column" && "flex-col",
                    direction === "row" && "flex-row",
                    className,
                )}
            >
                {Children.map(childrenList, (child, i) => (
                    <Fragment key={i}>
                        {cloneElement(child, { currentValue: value })}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default ZRadioGroup;
