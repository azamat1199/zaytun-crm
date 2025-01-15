import React, { FC } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TranslationKeyModel } from "@/data/translation";
import ZReactSelect from "@/components/z-components/ZReactSelect";
import TranslateForm from "@/components/TranslateForm";
import { createPosition } from "@/data/position";
import usePositions from "@/hooks/api/usePositions";
import { getRoleList } from "@/data/admin/admin.requests";
import { selectDataWithoutPagination } from "@/utils/common";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import { Controller, useFormContext } from "react-hook-form";
import { ZTextField } from "@/components/z-components/FormElements";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

interface TranslateFormProps {
    handleCancel?: () => void;
    refetch?: () => void;
}

const PositionTranslateForm: FC<TranslateFormProps> = ({
    handleCancel,
    refetch,
}) => {
    const createMutate = useMutation({
        mutationFn: createPosition,
        mutationKey: ["create-position"],
        onSuccess: () => {
            refetch && refetch();
            handleCancel && handleCancel();
        },
    });

    const pending = createMutate.isPending;

    const handleSubmit = (values: any) => {
        createMutate.mutate({
            localaziableName: values as TranslationKeyModel,
            code: Math.random().toString(),
            sortOrder: values.sortOrder,
        });
    };

    return <TranslateForm handleSubmit={handleSubmit} pending={pending} />;
};

const PositionForm = () => {
    const { getWord } = useKeyTranslation();
    const {
        setValue,
        control,
        register,
        formState: { errors },
    } = useFormContext();
    const { options, refetch } = usePositions();
    const { t } = useAppTranslations();

    const { data } = useQuery({
        queryKey: ["admin_role"],
        queryFn: () =>
            getRoleList({
                page: 0,
                size: 1000,
            }),
        select: selectDataWithoutPagination,
    });

    const roleOptions = Array.isArray(data)
        ? data.map((role: any) => ({
              label: getWord(role.localaziableName),
              value: role.id,
          }))
        : [];

    return (
        <>
            <Controller
                name="position"
                control={control}
                render={({ field }) => (
                    <ZReactSelect
                        options={options}
                        refetch={refetch}
                        setValue={setValue}
                        maxMenuHeight={250}
                        errors={errors}
                        placeholder={t("Выберите позицию")}
                        label={t("Выберите позицию")}
                        {...field}
                    >
                        <PositionTranslateForm />
                    </ZReactSelect>
                )}
            />
            <Controller
                control={control}
                name="roles"
                render={({ field }) => (
                    <ZReactSelect
                        setValue={setValue}
                        label="Роли"
                        options={roleOptions}
                        enableMenuPortalTarget
                        isMulti
                        {...field}
                    />
                )}
            />

            <ZTextField
                {...register("sortOrder")}
                label={t("Порядковый номер")}
                placeholder={t("Порядковый номер")}
                type="number"
                errors={errors}
            />
            <ZTextField
                {...register("code")}
                label="Код"
                placeholder="Код"
                errors={errors}
            />
        </>
    );
};

export default PositionForm;
