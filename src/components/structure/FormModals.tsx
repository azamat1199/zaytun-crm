import { FC } from "react";
import { StructureColumnType } from "./structure.types";
import StructureForm from "./Forms/StructureForm";
import BranchForm from "./Forms/BranchForm";
import useStructureContext from "./_hooks/useStructureContext";
import DepartmentForm from "./Forms/DepartmentForm";
import EmploymentForm from "./Forms/EmploymentForm";
import Modal from "../Modal";
import ZButton from "../z-components/ZButton";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";
import useSelectValidation from "@/hooks/helpers/useSelectValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

const modals: Record<StructureColumnType["type"], any> = {
    structure: StructureForm,
    branch: BranchForm,
    department: DepartmentForm,
    committee: DepartmentForm,
    employment: EmploymentForm,
};

interface FormModalsProps {
    type: StructureColumnType["type"];
    handleClose: () => void;
    contentIndex: number;
    colIndex: number;
    action: "add" | "update";
    initialValues: any;
    itemId?: string;
}

const FormModals: FC<FormModalsProps> = ({
    type,
    handleClose,
    contentIndex,
    colIndex,
    action,
    initialValues = {},
    itemId,
}) => {
    const AddComponent = modals[type];
    const { t } = useAppTranslations();

    const { columnStaticValues } = useStructureContext();

    const { form } = columnStaticValues(colIndex, contentIndex, type);

    const { submit, pending, title } = form[action];
    const { getSelectValidation } = useSelectValidation();

    const config: Record<StructureColumnType["type"], any> = {
        department: {
            add: {
                title: t("Добавить департамент"),
            },
            update: {
                title: t("Обновить департамент"),
            },
            modalSize: "md",
            validationSchema: object({
                departmentTemplate: getSelectValidation(),
                sortOrder: string().required(t("Поле обязательно")),
                code: string().required(t("Поле обязательно")),
                curator: getSelectValidation(),
            }),
        },
        branch: {
            add: {
                title: "Add Branch",
            },
            update: {
                title: "Update Branch",
            },
            modalSize: "lg",
        },
        committee: {
            add: {
                title: "Add Committee",
            },
            update: {
                title: "Update Committee",
            },
            modalSize: "md",
            validationSchema: object({
                departmentTemplate: getSelectValidation(),
                sortOrder: string().required(t("Поле обязательно")),
                code: string().required(t("Поле обязательно")),
                curator: getSelectValidation(),
            }),
        },
        employment: {
            add: {
                title: t("Добавить должность"),
            },
            update: {
                title: t("Обновить должность"),
            },
            modalSize: "xs",
            validationSchema: object({
                position: getSelectValidation(),
                sortOrder: string().required(t("Поле обязательно")),
                code: string().required(t("Поле обязательно")),
            }),
        },
        structure: {
            add: {
                title: t("Добавить структуру"),
            },
            update: {
                title: t("Обновить структуру"),
            },
            modalSize: "md",
            validationSchema: object({
                uzCr: string().required(t("Поле обязательно")),
                uzLat: string().required(t("Поле обязательно")),
                en: string().required(t("Поле обязательно")),
                code: string().required(t("Поле обязательно")),
            }),
        },
    };

    const methods = useForm({
        defaultValues: initialValues,
        ...(config[type]?.validationSchema && {
            resolver: yupResolver(config[type]?.validationSchema),
        }),
    });

    const onSubmit = methods.handleSubmit((values) =>
        submit(values, type, itemId),
    );

    return (
        <Modal
            isForm
            open
            onHandleChange={handleClose}
            // @ts-expect-error TODO
            size={config[type]?.modalSize}
            header={config[type]?.[action].title || title}
        >
            <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                    <div className="p-6">
                        <div className="border-neutral-300 flex flex-col gap-6 mb-8">
                            {AddComponent && <AddComponent />}
                        </div>
                        <div className="flex items-center w-full justify-center gap-6">
                            <ZButton
                                className="flex-1"
                                variant="secondary"
                                disabled={pending}
                                onClick={handleClose}
                            >
                                Отменить
                            </ZButton>
                            <ZButton
                                className="flex-1"
                                variant="primary"
                                type="submit"
                                pending={pending}
                            >
                                {action === "add" ? "Добавить" : "Обновить"}
                            </ZButton>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    );
};

export default FormModals;
