import useAcademicDegree from "@/hooks/api/useAcademicDegree";
import useAcademicTitle from "@/hooks/api/useAcademicTitle";
import useForeignLanguage from "@/hooks/api/useForeignLanguage";
import useGovernmentAward from "@/hooks/api/useGovernmentAward";
import usePartyMembership from "@/hooks/api/usePartyMembership";
import { Controller, useFormContext } from "react-hook-form";
import ZReactSelect from "../z-components/ZReactSelect";
import useEmployeeFormContext from "./_hooks/useEmployeeFormContext";

const GeneralInformationCollapse = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const { optionsAcademic, refetch: refetchAcademic } = useAcademicDegree();
    const { optionsAcademicTitle, refetch: refetchAcademicTitle } =
        useAcademicTitle();
    const { optionsMembership, refetch: refetchPartyMembership } =
        usePartyMembership();
    const { optionsAward, refetch: refetchAwards } = useGovernmentAward();
    const { optionsLanguage, refetch: refetchLanguages } = useForeignLanguage();
    const { readonly } = useEmployeeFormContext();

    return (
        <div className="w-full grid grid-cols-4 gap-4 pt-10">
            <Controller
                control={control}
                name="academicDegree"
                render={({ field }) => (
                    <ZReactSelect
                        options={optionsAcademic}
                        label="Ученая степень"
                        {...field}
                        enableMenuPortalTarget
                        errors={errors}
                        refetch={refetchAcademic}
                        referenceType="ACADEMIC_DEGREE"
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
            <Controller
                control={control}
                name="academicLevel"
                render={({ field }) => (
                    <ZReactSelect
                        options={optionsAcademicTitle}
                        label="Ученое звание"
                        {...field}
                        enableMenuPortalTarget
                        errors={errors}
                        refetch={refetchAcademicTitle}
                        referenceType="ACADEMIC_LEVEL"
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
            <Controller
                control={control}
                name="partyMembership"
                render={({ field }) => (
                    <ZReactSelect
                        options={optionsMembership}
                        label="Партийность"
                        {...field}
                        enableMenuPortalTarget
                        errors={errors}
                        refetch={refetchPartyMembership}
                        referenceType="PARTY_MEMBERSHIP"
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
            <Controller
                control={control}
                name="stateAwards"
                render={({ field }) => (
                    <ZReactSelect
                        options={optionsAward}
                        label="Государственные награды"
                        {...field}
                        enableMenuPortalTarget
                        errors={errors}
                        referenceType="GOVERNMENT_AWARDS"
                        refetch={refetchAwards}
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
            <Controller
                control={control}
                name="foreignLanguage"
                render={({ field }) => (
                    <ZReactSelect
                        options={optionsLanguage}
                        label="Владение иностранными языками"
                        {...field}
                        enableMenuPortalTarget
                        errors={errors}
                        referenceType="KNOWING_FOREIGN_LANGUAGE"
                        refetch={refetchLanguages}
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
            <Controller
                name="isDeputy"
                control={control}
                render={({ field }) => (
                    <ZReactSelect
                        label="Является ли народным депутатом"
                        options={[
                            { label: "Да", value: true },
                            { label: "Нет", value: false },
                        ]}
                        {...field}
                        enableMenuPortalTarget
                        errors={errors}
                        isClearable={!readonly}
                        isDisabled={readonly}
                    />
                )}
            />
        </div>
    );
};

export default GeneralInformationCollapse;
