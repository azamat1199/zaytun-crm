import { CreateBranchDto } from ".";

export const prepareBranchDto = <T extends Partial<CreateBranchDto>>(
    values: Record<string, string | { label: string; value: any }>,
    id?: string,
    withParent = false,
) =>
    ({
        ...values,
        localaziableName: {
            uzCr: values.uzCr,
            uzLat: values?.uzLat,
            en: values.en,
            ru: values.ru,
        },
        sortOrder: values?.sortOrder,
        [withParent ? "parent" : "structure"]: {
            id,
        },
        region: {
            id: values.region?.value,
        },
        district: {
            id: values.district?.value,
        },
        hasBranch: values.hasBranch,
        hasCommittee: values.hasCommittee,
        hasDepartment: values.hasDepartment,
        hasEmployment: values.hasEmployment,
    }) as unknown as T;
