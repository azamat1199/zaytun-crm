import { generateYears } from "@/utils/common";
import useAppTranslations from "./useAppTranslations";

const years = generateYears();
const useStaticData = () => {
    const { t } = useAppTranslations();
    const months = [
        {
            label: "январь",
            value: "1",
        },
        {
            label: "февраль",
            value: "2",
        },
        {
            label: "март",
            value: "3",
        },
        {
            label: "апрель",
            value: "4",
        },
        {
            label: "май",
            value: "5",
        },
        {
            label: "июнь",
            value: "6",
        },
        {
            label: "июль",
            value: "7",
        },
        {
            label: "август",
            value: "8",
        },
        {
            label: "сентябрь",
            value: "9",
        },
        {
            label: "окрябрь",
            value: "10",
        },
        {
            label: "ноябр",
            value: "11",
        },
        {
            label: "декабр",
            value: "12",
        },
    ];

    const priorityOptions = [
        {
            label: t("low"),
            value: "LOW",
        },
        {
            label: t("medium"),
            value: "MEDIUM",
        },
        {
            label: t("high"),
            value: "HIGH",
        },
    ];

    return {
        months,
        years,
        priorityOptions,
    };
};

export default useStaticData;
