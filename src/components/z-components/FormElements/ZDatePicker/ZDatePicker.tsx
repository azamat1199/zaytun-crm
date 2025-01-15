import ScheduleIcon from "@/components/icons/ScheduleIcon";
import { useClickAway } from "@uidotdev/usehooks";
import LitepickerJs from "litepicker";
import { ILPConfiguration } from "litepicker/dist/types/interfaces";
import { ComponentProps, createRef, FC, useEffect, useRef } from "react";
import ZTextField from "../ZTextField";
import { init, reInit, setValue } from "./picker.utils";
import "./ZDatePicker.styles.css";

export interface LitepickerElement extends HTMLInputElement {
    litePickerInstance: LitepickerJs;
}

type LitepickerConfig = Partial<ILPConfiguration>;

export interface LitepickerProps
    extends React.PropsWithChildren,
        Omit<React.ComponentPropsWithoutRef<"input">, "onChange">,
        ComponentProps<typeof ZTextField> {
    options?: {
        format?: string | undefined;
    } & LitepickerConfig;
    onChange: (e: {
        target: {
            value: string;
        };
    }) => void;
    value: string;
    getRef?: (el: LitepickerElement) => void;
}

const options = {
    format: "DD.MM.YYYY",
    autoApply: true,
    singleMode: true,
    numberOfColumns: 1,
    numberOfMonths: 1,
    showWeekNumbers: true,
    dropdowns: {
        minYear: 1990,
        maxYear: null,
        months: true,
        years: true,
    },
};

const ZDatePicker: FC<LitepickerProps> = (props) => {
    const initialRender = useRef(true);
    const openMenu = useRef(false);
    const litepickerRef = createRef<LitepickerElement>();
    const tempValue = useRef(props.value);

    const rootRef = useClickAway(() => {
        openMenu.current = false;
    });

    useEffect(() => {
        if (initialRender.current) {
            setValue({ ...props, options });
            if (litepickerRef.current !== null) {
                init(litepickerRef.current, { ...props, options });
            }

            initialRender.current = false;
        } else {
            if (
                tempValue.current !== props.value &&
                litepickerRef.current !== null
            ) {
                reInit(litepickerRef.current, { ...props, options });
            }
        }

        tempValue.current = props.value;
    }, [props.value]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { value, onChange, getRef, ...computedProps } = props;

    const toggleMenu = () => {
        if (openMenu.current) {
            litepickerRef.current?.litePickerInstance.hide();
        } else {
            litepickerRef.current?.litePickerInstance.show();
        }

        openMenu.current = !openMenu.current;
    };

    return (
        <div ref={rootRef}>
            <ZTextField
                // @ts-expect-error TODO
                ref={litepickerRef}
                type="text"
                value={props.value}
                onChange={(e) => {
                    if (props.onChange) {
                        props.onChange(e);
                    }
                }}
                placeholder="DD.MM.YYYY"
                startIcon={<ScheduleIcon />}
                startIconProps={{ onClick: toggleMenu }}
                {...computedProps}
            />
        </div>
    );
};

export default ZDatePicker;
