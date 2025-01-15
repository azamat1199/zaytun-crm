import { TranslationFrontOptionsType } from "@/data/translation";
import { useLocale } from "next-intl";

const useAppLocale = () => useLocale() as TranslationFrontOptionsType;

export default useAppLocale;
