import React, { FC, useState } from "react";
import { DepartmentModel } from "@/data/department";
import { EmployeeModel } from "@/data/hr/employee";
import { PositionModel } from "@/data/position";
import { Form, Formik } from "formik";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    IconButton,
} from "@material-tailwind/react";
import MoreHorizontal from "../icons/MoreHorizonal";
import { joinArray } from "@/utils/common";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import FormInput from "@/components/form-input/formInput";
import Link from "next/link";
import { formatDate } from "@/services/time";
import ZContextMenu from "../z-components/ZContextMenu";
import ZAvatar from "../z-components/ZAvatar";

interface EmployeeCardProps
    extends Pick<EmployeeModel, "id" | "createdAt" | "updatedAt"> {
    employee: EmployeeModel;
    position: PositionModel;
    department: Pick<DepartmentModel, "id">;
    active: boolean;
    roles: any[];
}

const EmployeeCard: FC<EmployeeCardProps> = ({ employee, position }) => {
    const { getWord2, getWord } = useKeyTranslation();
    const [open, setOpen] = useState(true);

    if (!employee) {
        return <>The employee is not available</>;
    }

    const initialValues = {
        createdAt: formatDate(employee.createdAt),
        updatedAt: formatDate(employee.updatedAt),
        pinfl: employee.pinfl || "",
        username: employee.username,
        birthDate: employee.birthDate,
        internalPhoneNumber: employee.internalPhoneNumber,
    };

    const contextMenu = [
        {
            label: (
                <Link href={`/hr/staffs/staffs/edit/${employee.id}`}>
                    Редактировать
                </Link>
            ),
        },
        {
            label: (
                <Link href={`/hr/change-position/${employee.id}`}>
                    Изменение должности
                </Link>
            ),
        },
        {
            label: <Link href={"#"}>Изменение надбавки</Link>,
        },
        {
            label: (
                <Link href={"#"} className="text-c_error-500">
                    Увольнение сотрудника
                </Link>
            ),
        },
    ];

    return (
        <div className="relative flex-shrink-0 w-[600px] border-r border-r-c_neutral-300">
            <Accordion open={open} className="h-full [&>div]:overflow-visible">
                <AccordionHeader className="p-0">
                    <div
                        onClick={() => setOpen((prev) => !prev)}
                        className="flex w-full px-6 border-b border-c_neutral-100 bg-c_neutral-25 py-3 justify-between items-center"
                    >
                        <div>Карточка сотрудника</div>
                        {/* <IconButton variant="text">
              <ArrowDown2 size="md" />
            </IconButton> */}
                    </div>
                </AccordionHeader>
                <AccordionBody>
                    <div className="px-6 py-3 flex flex-col gap-6">
                        <div className="flex gap-2">
                            <div>
                                <ZAvatar {...employee.photo} />
                            </div>
                            <div>
                                <h2 className="text-h3-m text-c_neutral-600 uppercase font-medium">
                                    {joinArray([
                                        getWord2(employee, "firstName"),
                                        getWord2(employee, "middleName"),
                                        getWord2(employee, "lastName"),
                                    ])}
                                </h2>
                                <p className="text-c_neutral-600 text-b-2-r font-normal">
                                    {getWord(position.localaziableName)}
                                </p>
                            </div>
                            <ZContextMenu list={contextMenu}>
                                <IconButton className="ml-auto" variant="text">
                                    <MoreHorizontal size="md" />
                                </IconButton>
                            </ZContextMenu>
                        </div>

                        <div>
                            <Formik
                                onSubmit={() => {}}
                                initialValues={{}}
                                // validationSchema={validationSchema}
                            >
                                {() => (
                                    <Form>
                                        <div className="w-full grid grid-cols-2 gap-6">
                                            <FormInput
                                                upperWidth
                                                name="pinfl"
                                                label={`ПИНФЛ`}
                                                placeholder="ПИНФЛ"
                                                fullWidth
                                                disabled
                                                value={initialValues?.pinfl}
                                            />
                                            <FormInput
                                                name="birthDate"
                                                label={`Дата рождения`}
                                                placeholder="Дата рождения"
                                                fullWidth
                                                disabled
                                                value={initialValues?.birthDate}
                                            />

                                            <FormInput
                                                name="username"
                                                label={`Логин`}
                                                placeholder="Логин"
                                                fullWidth
                                                disabled
                                                value={initialValues?.username}
                                            />
                                            <FormInput
                                                name="internalPhoneNumber"
                                                label={`Внутренний номер`}
                                                placeholder="Внутренний номер"
                                                fullWidth
                                                disabled
                                                value={
                                                    initialValues?.internalPhoneNumber
                                                }
                                            />
                                            <FormInput
                                                name="createdAt"
                                                label={`Дата создания`}
                                                placeholder="Дата создания"
                                                fullWidth
                                                disabled
                                                value={initialValues?.createdAt}
                                            />
                                            <FormInput
                                                name="updatedAt"
                                                label={`Дата обновления`}
                                                placeholder="Дата обновления"
                                                fullWidth
                                                disabled
                                                value={initialValues?.updatedAt}
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                        <div className="w-full border-t border-c_neutral-300 flex items-center justify-center p-3">
                            <Link
                                href={`/hr/staffs/staffs/${employee.id}`}
                                className="text-c_blue-500 text-b-2-m underline font-medium"
                            >
                                Подробная информация
                            </Link>
                        </div>
                    </div>
                </AccordionBody>
            </Accordion>
        </div>
    );
};

export default EmployeeCard;
