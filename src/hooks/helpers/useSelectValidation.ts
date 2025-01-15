import { string, lazy, object } from "yup";
import useAppTranslations from "./useAppTranslations";

const useSelectValidation = () => {
    const { t } = useAppTranslations();

    const getSelectValidation = () =>
        lazy((output) =>
            typeof output === "object"
                ? output == null
                    ? string().required(t("Поле обязательно"))
                    : object().shape({
                          label: string().required(t("Поле обязательно")),
                          value: string().required(t("Поле обязательно")),
                      })
                : string().required(t("Поле обязательно")).nullable(),
        );

    return {
        getSelectValidation,
    };
};

export default useSelectValidation;
