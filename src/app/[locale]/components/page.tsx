"use client";
import DownloadIcon from "@/components/icons/DownloadIcon";
import {
    ZCheckbox,
    ZDatePicker,
    ZRadioInput,
    ZTextField,
    ZTextarea,
} from "@/components/z-components/FormElements";
import ZFileUploader from "@/components/z-components/FormElements/ZFileUploader";
import ZButton from "@/components/z-components/ZButton";
import ZButtonGroups from "@/components/z-components/ZButtonGroups";
import ZReactSelect from "@/components/z-components/ZReactSelect";
import { useState } from "react";

const options = [
    {
        label: "Html",
        value: 1,
    },
    {
        label: "Javascript",
        value: 2,
    },
    {
        label: "Typescript",
        value: 3,
    },
    {
        label: "Angular",
        value: 4,
    },
];

const Components = () => {
    const [value, setValue] = useState([]);

    return (
        <div className="p-10">
            {/* <TextField placeholder='Test 123' /> */}

            <div className="p-10">
                <ZCheckbox />
            </div>

            <div className="p-10">
                <ZRadioInput
                    label="Remember me"
                    helperText="Save my login details for next time."
                />
            </div>

            <div className="p-10">
                <ZTextField
                    // hasError
                    label="This is a label"
                    value="This is a value"
                    placeholder="this is a placeholder"
                    helperText={"This is a helper text"}
                />
            </div>

            <div className="p-10">
                <ZTextarea
                    // hasError
                    label="This is a label"
                    value="This is a value"
                    placeholder="this is a placeholder"
                    helperText={"This is a helper text"}
                />
            </div>
            <div className="w-[400px]">
                <ZReactSelect
                    isMulti
                    name="name"
                    withSelectAll
                    options={options}
                    value={value}
                    setValue={(name: string, value) => {
                        setValue(value as any);
                    }}
                />
            </div>

            <div className="p-10">
                <ZButton className="mb-5">Click</ZButton>
                <ZButton
                    size="xs"
                    className="mb-5"
                    iconButton
                    variant="soft-color"
                >
                    <DownloadIcon />
                </ZButton>

                <ZButton
                    startIcon={<DownloadIcon />}
                    size="md"
                    variant="soft-color"
                    className="mb-5"
                >
                    Click me
                </ZButton>

                <ZButton
                    startIcon={<DownloadIcon />}
                    size="lg"
                    variant="secondary"
                    className="mb-5"
                >
                    Click me
                </ZButton>

                <ZButton
                    startIcon={<DownloadIcon />}
                    size="lg"
                    variant="text-button"
                    className="mb-5"
                    disabled
                >
                    Click me
                </ZButton>

                <ZButton
                    startIcon={<DownloadIcon />}
                    size="xs"
                    variant="text-button"
                    className="mb-5"
                    disabled
                >
                    Click me
                </ZButton>
            </div>

            <div className="p-10">
                <ZButtonGroups
                    activeButton="1"
                    buttons={[
                        { children: "Text", value: "1" },
                        { children: "Text", value: "2" },
                        { children: "Text", value: "3" },
                        { children: "Text", value: "4" },
                    ]}
                />
            </div>

            <div className="p-5">
                <ZDatePicker
                    onChange={(e) => {
                        console.log(e);
                    }}
                    options={{
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
                    }}
                    className="pl-9 sm:w-64 rounded-[0.3rem]"
                />
            </div>

            <div className="p-5">
                <ZFileUploader />
            </div>
        </div>
    );
};

export default Components;
