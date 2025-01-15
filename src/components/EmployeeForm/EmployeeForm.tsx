import Accordionv2 from "@/components/accardion/Accordionv2";
import ZButton from "@/components/z-components/ZButton";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ZDivider from "../z-components/ZDivider";
import useEmployeeForm from "./_hooks/useEmployeeForm";
import { EmployeeFormContext } from "./_providers/EmployeeFormContext";
import ActualAddressCollapse from "./ActualAddressCollapse";
import Contract from "./Contract";
import DULCollapse from "./DULCollapse";
import EducationDataGrid from "./EducationDataGrid";
import GeneralInformationCollapse from "./GeneralInformationCollapse";
import LaborDataGrid from "./LaborDataGrid";
import OpenAccountCollapse from "./OpenAccountCollapse";
import OrganizationStructure from "./OrganizationStructure";
import PersonalDataCollapse from "./PersonalDataCollapse";
import Photo from "./Photo";
import Pinfl from "./Pinfl";
import RegistrationCollapse from "./RegistrationCollapse";
import RelativesDataGrid from "./RelativesDataGrid";
import useBeforeUnload from "@/hooks/helpers/useBeforeUnload";
import { mockEmployee } from "./mock";
import useSetDefaultValues from "@/hooks/helpers/useSetDefaultValues";
// import useFormPersist from "react-hook-form-persist";

interface EmployeeFormProps {
    defaultValues: Record<string, any>;
    handleSubmit?: (values: Record<string, any>) => void;
    readonly?: boolean;
    pending?: boolean;
}

const EmployeeForm: FC<EmployeeFormProps> = ({
    defaultValues,
    handleSubmit,
    readonly = false,
    pending,
}) => {
    const { resolver, setFormStatus, formStatus, processId, setProcessId } =
        useEmployeeForm();

    const methods = useForm({
        // resolver,
    });

    const {
        // watch,
        // setValue,
        reset,
        formState: { isDirty },
    } = methods;

    useBeforeUnload(isDirty);
    useSetDefaultValues(reset, defaultValues);

    // useFormPersist("employee1", {
    //     watch,
    //     setValue,
    //     storage: window.localStorage, // default window.sessionStorage
    // });

    const onSubmit = methods.handleSubmit((values: Record<string, any>) => {
        handleSubmit &&
            handleSubmit({
                // ...mockEmployee,
                ...values,
                // ...(JSON.parse(localStorage.getItem('employee')) as any),
                actualProcessId: processId,
            });
    });

    // const allowOpenCollapse = formStatus === 'done';
    const allowOpenCollapse = true;

    return (
        <EmployeeFormContext.Provider
            value={{
                formStatus,
                setFormStatus,
                processId,
                setProcessId,
                readonly,
            }}
        >
            <FormProvider {...methods}>
                <form onSubmit={onSubmit}>
                    <Pinfl />

                    <Accordionv2
                        accordionHeader="Личные данные"
                        addBtn={false}
                        open={allowOpenCollapse}
                    >
                        <PersonalDataCollapse />
                    </Accordionv2>
                    <Accordionv2
                        accordionHeader="ДУЛ"
                        addBtn={false}
                        open={allowOpenCollapse}
                    >
                        <DULCollapse />
                    </Accordionv2>
                    <Accordionv2
                        accordionHeader="Общие данные"
                        addBtn={false}
                        open={allowOpenCollapse}
                    >
                        <GeneralInformationCollapse />
                    </Accordionv2>
                    {!readonly && (
                        <Accordionv2
                            accordionHeader="Образование"
                            addBtn={false}
                            open={allowOpenCollapse}
                        >
                            <EducationDataGrid />
                        </Accordionv2>
                    )}
                    <Accordionv2
                        accordionHeader="Место прописки"
                        addBtn={false}
                        open={allowOpenCollapse}
                    >
                        <RegistrationCollapse />
                    </Accordionv2>
                    <Accordionv2
                        accordionHeader="Фактический адрес"
                        addBtn={false}
                        open={allowOpenCollapse}
                    >
                        <ActualAddressCollapse />
                    </Accordionv2>
                    {!readonly && (
                        <Accordionv2
                            accordionHeader="Трудовая деятельность"
                            addBtn={false}
                            open={allowOpenCollapse}
                        >
                            <LaborDataGrid />
                        </Accordionv2>
                    )}

                    <Accordionv2
                        accordionHeader="Сведения о близких родственниках "
                        addBtn={false}
                        open={allowOpenCollapse}
                    >
                        <RelativesDataGrid readonly={readonly} />
                    </Accordionv2>
                    <Accordionv2
                        accordionHeader="Оргструктура"
                        addBtn={false}
                        open={allowOpenCollapse}
                    >
                        <OrganizationStructure />
                    </Accordionv2>
                    <ZDivider className="my-10 border-none" />
                    <h3 className="text-h3-m text-c_neutral-800 font-medium">
                        Договор
                    </h3>
                    <Contract />
                    <ZDivider className="my-10" />
                    <h3 className="text-h3-m text-c_neutral-800 font-medium">
                        Фото <span className="text-[#F04438]">*</span>
                    </h3>
                    <Photo />
                    <ZDivider className="my-10" />
                    <h3 className="text-h3-m text-c_neutral-800 font-medium">
                        Открытие учетной записи
                    </h3>

                    <OpenAccountCollapse />

                    {!readonly && (
                        <div className="flex mt-20 items-center gap-6">
                            <ZButton
                                type="submit"
                                className="w-[260px]"
                                pending={pending}
                            >
                                Сохранить
                            </ZButton>
                        </div>
                    )}
                </form>
            </FormProvider>
        </EmployeeFormContext.Provider>
    );
};

export default EmployeeForm;
