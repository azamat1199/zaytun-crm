import { useClickAway } from "@uidotdev/usehooks";
import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import TranslationForm from "./TranslationForm";
import { useMutation } from "@tanstack/react-query";
import { createReference } from "@/data/references";
import { openToast } from "@/components/notification";
import { getErrorMessages, getSuccessMessage } from "@/utils/common";
import { AxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";

interface SubmenuProps {
    children?: ReactNode;
    open: boolean;
    menuRect: DOMRect | null;
    toggleSubmenu: () => void;
    refetch?: () => void;
    handleChange: (index: number) => void;
    withOrderField?: boolean;
    referenceType: string;
}

const TranslationSubMenu: FC<SubmenuProps> = ({
    menuRect,
    toggleSubmenu,
    refetch,
    handleChange,
    withOrderField = false,
    referenceType,
}) => {
    const submenuRef = useClickAway((e) => {
        let node = e.target;
        while (node) {
            const isOption = (node?.id || "").startsWith(
                "react-select-2-option",
            );

            if (!isOption) {
                toggleSubmenu();
            } else {
                const index = (node?.id || "").split("-").at(-1);
                handleChange(index);
            }

            node = node.parentNode;
        }
    });

    const createMutation = useMutation({
        mutationFn: createReference,
        mutationKey: [referenceType],
        onSuccess: (res) => {
            openToast({ variant: "success", message: getSuccessMessage(res) });
            methods.reset();
            refetch && refetch();
        },
        onError: (err: AxiosError) => {
            openToast({
                variant: "error",
                message: getErrorMessages(err, false),
            });
        },
    });

    const methods = useForm();

    if (!menuRect || typeof window === "undefined") {
        return;
    }

    const { bottom, right } = menuRect;

    const handleSubmit = ({ sortOrder, ...rest }: any) => {
        createMutation.mutate({
            localaziableName: rest,
            sortOrder,
            referenceType: referenceType.toUpperCase(),
        });
    };

    return createPortal(
        <div
            // @ts-expect-error TODO
            ref={submenuRef}
            style={{
                top: `${bottom}px`,
                left: `${right}px`,
            }}
            className={twMerge(
                "w-[320px] z-50 fixed transition-all opacity-0 duration-300",
                open && "opacity-100",
                !open && "overflow-hidden",
            )}
        >
            <div className="w-full rounded-[16px] pt-6 border border-c_neutral-300 bg-white px-4">
                <FormProvider {...methods}>
                    <TranslationForm
                        handleSubmit={handleSubmit}
                        pending={createMutation.isPending}
                        withOrderField={withOrderField}
                        handleCancel={toggleSubmenu}
                    />
                </FormProvider>
            </div>
        </div>,
        document.body,
    );
};

export default TranslationSubMenu;
