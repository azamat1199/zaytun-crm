import { isPlainObject } from "@/utils/common";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { lazy, object, string } from "yup";

const useEmployeeForm = () => {
    const [formStatus, setFormStatus] = useState<
        "checking-server" | "idle" | "done"
    >("idle");
    const [processId, setProcessId] = useState<string | null>(null);

    const commonSelectValidation = lazy((output) =>
        typeof output === "object"
            ? object().shape({
                  label: string().required("Поле обязательно"),
                  value: string().required("Поле обязательно"),
              })
            : string().required("Поле обязательно"),
    );

    const commonStringValidation = string().required("Поле обязательно");

    const validationSchema = object({
        branch: commonSelectValidation,
        birthCountry: commonSelectValidation,
        department: commonSelectValidation,
        employment: commonSelectValidation,
        level: commonStringValidation,
        pinfl: commonStringValidation,
        birthDate: commonStringValidation,
        lastNameLat: commonStringValidation,
        firstNameLat: commonStringValidation,
        middleNameLat: commonStringValidation,
        nationality: commonSelectValidation,
        lastNameCrl: commonStringValidation,
        middleNameCrl: commonStringValidation,
        tin: commonStringValidation,
        passportSerial: commonStringValidation,
        passportNumber: commonStringValidation,
        passportIssuedBy: commonStringValidation,
        passportIssuedDate: commonStringValidation,
        passportValidityDate: commonStringValidation,
        gender: commonSelectValidation,
        academicDegree: commonSelectValidation,
        academicLevel: commonSelectValidation,
        partyMembership: commonSelectValidation,
        stateAwards: commonSelectValidation,
        foreignLanguage: commonSelectValidation,
        isDeputy: commonSelectValidation,
        registeredRegion: commonSelectValidation,
        registeredDistrict: commonSelectValidation,
        registeredStreet: commonStringValidation,
        registeredHouseNumber: commonStringValidation,
        registeredFlatNumber: commonStringValidation,
        registeredFullAddress: commonStringValidation,
        actualRegion: commonSelectValidation,
        actualDistrict: commonSelectValidation,
        actualStreet: commonStringValidation,
        actualHouseNumber: commonStringValidation,
        actualFlatNumber: commonStringValidation,
        actualFullAddress: commonStringValidation,
        photo: object().test("not-empty", "Поле обязательно", (photo) =>
            isPlainObject(photo),
        ),
        idCard: object().test("not-empty", "Поле обязательно", (photo) =>
            isPlainObject(photo),
        ),
    });

    const resolver = yupResolver(validationSchema);

    return {
        validationSchema,
        resolver,
        formStatus,
        setFormStatus,
        processId,
        setProcessId,
    };
};

export default useEmployeeForm;
