import dayjs from "dayjs";
import Litepicker from "litepicker";
import { LitepickerElement, LitepickerProps } from "./ZDatePicker";

interface Picker extends Litepicker {
    on?: (
        event: string,
        cb: (
            startDate: {
                dateInstance: Date;
            },
            endDate: {
                dateInstance: Date;
            },
        ) => void,
    ) => void;
}

const getDateFormat = (format: string | undefined) => {
    return format !== undefined ? format : "D MMM, YYYY";
};

const setValue = (props: LitepickerProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const format = getDateFormat(props?.options?.format);

    // if (!props.value.length) {
    //   let date = dayjs().format(format);
    //   date +=
    //     !props.options.singleMode && props.options.singleMode !== undefined
    //       ? ' - ' + dayjs().add(1, 'month').format(format)
    //       : '';
    //   if (props.onChange) {
    //     props.onChange({
    //       target: {
    //         value: date,
    //       },
    //     });
    //   }
    // }
};

const init = (el: LitepickerElement, props: LitepickerProps) => {
    const format = getDateFormat(props.options.format);
    el.litePickerInstance = new Litepicker({
        ...props.options,
        element: el,
        format: format,
        setup: (picker: Picker) => {
            if (picker.on) {
                picker.on("selected", (startDate, endDate) => {
                    let date = dayjs(startDate.dateInstance).format(format);
                    date +=
                        endDate !== undefined
                            ? " - " + dayjs(endDate.dateInstance).format(format)
                            : "";
                    if (props.onChange) {
                        props.onChange({
                            target: {
                                value: date,
                            },
                        });
                    }
                });
            }
        },
    });
};

const reInit = (el: LitepickerElement, props: LitepickerProps) => {
    el.litePickerInstance.destroy();
    init(el, props);
};

export { setValue, init, reInit };
