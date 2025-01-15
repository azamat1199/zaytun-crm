import ZDataGridProvider from "@/components/z-components/ZDataGrid/ZDataGridProvider/ZDataGridProvider";
import ZDivider from "@/components/z-components/ZDivider";
import AccessDataGrid from "./AccessDataGrid";
import AssignDataGrid from "./AssignDataGrid";
import { FormProvider, useForm } from "react-hook-form";
import { object, string, array, lazy } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

const ProcessAccessTab = () => {
    const { t } = useAppTranslations();
    const validationSchema = object().shape({
        taskSettings: array(
            object({
                department: lazy((output) =>
                    typeof output === "object"
                        ? output == null
                            ? string().required(t("Поле обязательно"))
                            : object().shape({
                                  label: string().required(
                                      t("Поле обязательно"),
                                  ),
                                  value: string().required(
                                      t("Поле обязательно"),
                                  ),
                              })
                        : string().required(t("Поле обязательно")).nullable(),
                ),
                employment: lazy((output) =>
                    typeof output === "object"
                        ? output == null
                            ? string().required(t("Поле обязательно"))
                            : object().shape({
                                  label: string().required(
                                      t("Поле обязательно"),
                                  ),
                                  value: string().required(
                                      t("Поле обязательно"),
                                  ),
                              })
                        : string().required(t("Поле обязательно")).nullable(),
                ),
            }),
        ),
    });

    const methods = useForm({ resolver: yupResolver(validationSchema) });

    return (
        <div>
            <ZDataGridProvider values={{ filter: {}, search: "" }}>
                <AccessDataGrid />
            </ZDataGridProvider>
            <ZDivider className="my-10" />
            <ZDataGridProvider values={{ filter: {}, search: "" }}>
                <FormProvider {...methods}>
                    <AssignDataGrid />
                </FormProvider>
            </ZDataGridProvider>
        </div>
    );
};

export default ProcessAccessTab;
