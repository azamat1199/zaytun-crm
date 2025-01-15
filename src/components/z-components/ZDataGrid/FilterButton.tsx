import { ComponentType, FC, useMemo } from "react";
import ZButton from "../ZButton";
import TableFilterIcon from "@/components/icons/TableFilterIcon";
import useInProcessModal from "@/hooks/helpers/useInProcessModal";
import useZDataGridContext from "./ZDataGridProvider/useZDataGridContext";
import FilterModal from "./FilterModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

interface FilterButtonProps {
    className?: string;
    FilterComponent?: ComponentType;
}

const FilterButton: FC<FilterButtonProps> = ({
    className,
    FilterComponent,
}) => {
    const { t } = useAppTranslations();
    const { toggleInProcessModal } = useInProcessModal();
    const { setModal } =
        useZDataGridContext();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const getDefaultValues = () => {
        let temp = {};
        for (const key of searchParams.keys()) {
            console.log({ key });

            const value = searchParams.get(key);

            if (key && key.endsWith("SelectValue")) {
                const extractedKey = key.split("SelectValue")?.[0];
                if (!extractedKey) {
                    continue;
                }
                temp = {
                    ...temp,
                    [extractedKey]: {
                        label: searchParams.get(`${extractedKey}SelectLabel`),
                        value: searchParams.get(`${extractedKey}SelectValue`),
                    },
                };
            } else {
                temp = {
                    ...temp,
                    [key]: value,
                };
            }
        }

        return temp;
    };

    const methods = useForm();

    const { handleSubmit, reset } = methods;

    const onSubmit = handleSubmit((values) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));
        for (const [key, value] of Object.entries(values)) {
            const typeOfValue = typeof value;

            if (typeOfValue === "string" || typeOfValue === "number") {
                current.set(key, value);
            } else if (typeOfValue === "object") {
                current.set(`${key}SelectLabel`, value?.label);
                current.set(`${key}SelectValue`, value?.value);
            }
        }
        const search = current.toString();
        const query = search ? `?${search}` : "";
        setModal("closed");
        router.push(`${pathname}${query}`);
    });

    const openModal = () => {
        if (!FilterComponent) {
            toggleInProcessModal();
            return;
        }

        reset(getDefaultValues());
        setModal("filter");
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit} className={className}>
                <ZButton
                    type="button"
                    variant="secondary"
                    size="md"
                    startIcon={<TableFilterIcon />}
                    onClick={openModal}
                >
                    {t("Фильтр")}
                </ZButton>
                {FilterComponent && (
                    <FilterModal onSubmit={onSubmit}>
                        <FilterComponent />
                    </FilterModal>
                )}
            </form>
        </FormProvider>
    );
};

export default FilterButton;
