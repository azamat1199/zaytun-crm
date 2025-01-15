import { GetWordType } from "@/hooks/helpers/useKeyTranslation";
import { isPlainObject } from "@/utils/common";
import get from "lodash.get";

const prepareEmployeeDto = (values: any) => {
    return {
        ...values,
        employment: {
            id: values?.employment?.value,
        },
        department: {
            id: values?.branch?.value,
        },
        fixedTermedContract: Boolean(get(values, "fixedTermedContract")),
        tin: values?.tin,
        level: values?.level,
        firstNameLat: values?.firstNameLat,
        lastNameLat: values?.lastNameLat,
        middleNameLat: values?.middleNameLat,
        firstNameCrl: values?.firstNameCrl,
        lastNameCrl: values?.lastNameCrl,
        middleNameCrl: values?.middleNameCrl,
        birthDate: values.birthDate,
        nationality: {
            id: values?.nationality?.value,
        },
        pinfl: values?.pinfl,
        passportSerial: values.passportSerial,
        passportNumber: values.passportNumber,
        passportIssuedBy: values.passportIssuedBy,
        passportIssuedDate: values.passportIssuedDate,
        passportValidityDate: values.passportValidityDate,
        gender: values.gender?.value,
        academicDegree: {
            id: values.academicDegree?.value,
        },
        academicLevel: {
            id: values.academicLevel?.value,
        },
        partyMembership: {
            id: values.partyMembership?.value,
        },
        governmentAwards: {
            id: values.stateAwards?.value,
        },
        knowingForeignLanguages: (Array.isArray(values.foreignLanguage)
            ? values.foreignLanguage
            : []
        ).map((item: { value: string; label: string }) => ({
            id: item.value,
        })),
        deputyOfNation: null,
        educations: (Array.isArray(values.educations)
            ? values.educations
            : []
        ).map((education) => ({
            ...education,
            educationLevel: { id: education.educationLevel.value },
            educationType: { id: education.educationType.value },
        })),
        experiences: (Array.isArray(values.experiences)
            ? values.experiences
            : []
        ).map((experience) => ({
            ...experience,
            category: { id: experience.category.value },
        })),
        relatives: (Array.isArray(values.relatives)
            ? values.relatives
            : []
        ).map((relative) => ({
            ...relative,
            relativeType: { id: relative.relativeType.value },
            birthCountry: { id: relative.birthCountry.value },
        })),
        actualRegion: {
            id: values.actualRegion?.value,
        },

        actualDistrict: {
            id: values.actualDistrict?.value,
        },
        registeredRegion: {
            id: values.registeredRegion?.value,
        },
        registeredDistrict: {
            id: values.registeredDistrict?.value,
        },
        photo: {
            id: values.photo?.id,
        },
        idCard: {
            id: values.idCard?.id,
        },
        birthCountry: {
            id: values.birthCountry?.value,
        },
    };
};

const prepareEmployeeForEdit = ({
    dto,
    getWord,
    property,
    genderOptions = [],
}: {
    dto: Record<string, any>;
    getWord: GetWordType;
    property?: string;
    genderOptions?: Array<{ label: string; value: string }>;
}) => {
    if (!isPlainObject(dto)) {
        return {};
    }

    const preparedValues: Record<string, any> = {
        ...dto,
        fixedTermedContract: String(dto.fixedTermedContract),
        birthCountry: {
            label: getWord(dto.birthCountry?.localaziableName),
            value: dto.birthCountry?.id,
        },
        academicDegree: {
            label: getWord(get(dto, "academicDegree.localaziableName")),
            value: getWord(get(dto, "academicDegree.id")),
        },
        academicLevel: {
            label: getWord(get(dto, "academicLevel.localaziableName")),
            value: getWord(get(dto, "academicLevel.id")),
        },
        partyMembership: {
            label: getWord(get(dto, "partyMembership.localaziableName")),
            value: getWord(get(dto, "partyMembership.id")),
        },
        stateAwards: {
            label: getWord(get(dto, "governmentAwards.localaziableName")),
            value: getWord(get(dto, "governmentAwards.id")),
        },
        department: {
            label: getWord(
                get(
                    dto,
                    "employment.department.departmentTemplate.localaziableName",
                ),
            ),
            value: get(dto, "employment.department.id"),
        },
        branch: {
            label: getWord(
                get(dto, "employment.department.branch.localaziableName"),
            ),
            value: get(dto, "employment.department.branch.id"),
        },

        employment: {
            label: getWord(get(dto, "employment.position.localaziableName")),
            value: get(dto, "employment.id"),
        },
        passportIssuedBy: dto.passportIssuedBy,
        passportSerial: dto.passportSerial,
        pinfl: dto.pinfl,
        gender: genderOptions.find((option) => option.value === dto.gender),
        nationality: {
            label: getWord(dto.nationality?.localaziableName),
            value: dto.nationality?.id,
        },
        lastNameLat: dto.lastNameLat,
        lastNameCrl: dto.lastNameCrl,
        middleNameCrl: dto.middleNameCrl,
        middleNameLat: dto.middleNameLat,
        firstNameCrl: dto.firstNameCrl,
        firstNameLat: dto.firstNameLat,
        registeredRegion: {
            label: getWord(dto.registeredRegion?.localaziableName),
            value: dto.registeredRegion?.id,
        },
        registeredDistrict: {
            label: getWord(dto.registeredDistrict?.localaziableName),
            value: dto.registeredDistrict?.id,
        },
        actualRegion: {
            label: getWord(dto.actualRegion?.localaziableName),
            value: dto.actualRegion?.id,
        },
        actualDistrict: {
            label: getWord(dto.actualDistrict?.localaziableName),
            value: dto.actualDistrict?.id,
        },
        educations: Array.isArray(dto.educations)
            ? dto.educations.map((option: any) => ({
                  ...option,
                  educationLevel: {
                      label: getWord(option.educationLevel?.localaziableName),
                      value: option.educationLevel?.id,
                  },
                  educationType: {
                      label: getWord(option.educationType?.localaziableName),
                      value: option.educationType?.id,
                  },
              }))
            : [],
        experiences: Array.isArray(dto.experiences)
            ? dto.experiences.map((experience: any) => ({
                  ...experience,
                  category: {
                      label: getWord(experience.category.localaziableName),
                      value: experience.category.id,
                  },
              }))
            : [],
        relatives: Array.isArray(dto.relatives)
            ? dto.relatives.map((relative: any) => ({
                  ...relative,
                  relativeType: {
                      label: getWord(relative.relativeType?.localaziableName),
                      value: relative.relativeType?.id,
                  },
                  birthCountry: {
                      label: getWord(relative.birthCountry?.localaziableName),
                      value: relative.birthCountry?.id,
                  },
              }))
            : [],
    };

    if (property && Object.hasOwn(preparedValues, property)) {
        return preparedValues[property];
    }

    return preparedValues;
};

export { prepareEmployeeDto, prepareEmployeeForEdit };
