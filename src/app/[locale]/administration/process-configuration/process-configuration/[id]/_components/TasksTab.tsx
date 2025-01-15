import { useParams, useRouter, useSearchParams } from "next/navigation";
import ZDataGrid from "@/components/z-components/ZDataGrid";
import {
    convertSeconds,
    getErrorMessages,
    getSuccessMessage,
} from "@/utils/common";
import SlaForm from "./SlaForm";
import ZButton from "@/components/z-components/ZButton";
import useGetProcessTemplateById from "@/hooks/api/useGetProcessTemplateById";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import get from "lodash.get";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";
import { TaskTemplateModel } from "@/data/task-template";
import useSetDefaultValues from "@/hooks/helpers/useSetDefaultValues";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    prepareProcessTemplateForUpdate,
    updateProcessTemplate,
} from "@/data/process-templates";
import { openToast } from "@/components/notification";
import useBeforeUnload from "@/hooks/helpers/useBeforeUnload";
import { ProcessTemplateModelFull } from "@/data/process-templates/process-template.models";
import useQueryString from "@/hooks/helpers/useQueryString";

export type TasksType = "readonly" | "edit";

const TasksTab = () => {
    const { id } = useParams();
    const { t } = useAppTranslations();
    const searchParams = useSearchParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { getWord } = useKeyTranslation();
    const { data, isLoading, isSuccess } = useGetProcessTemplateById(
        id as string,
    );
    const { replaceQuery } = useQueryString();

    const mode = (searchParams.get("mode") || "readonly") as TasksType;

    const processTemplate = get(
        data,
        "data.result.data",
    ) as unknown as ProcessTemplateModelFull;

    const updateMutation = useMutation({
        mutationFn: updateProcessTemplate,
        mutationKey: ["update-mutation"],
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["process-templates"] });
            queryClient.invalidateQueries({
                queryKey: ["process-template", { id }],
            });
            openToast({ variant: "success", text: getSuccessMessage(res) });
            router.back();
        },
        onError: (err) => {
            openToast({ variant: "error", text: getErrorMessages(err, false) });
        },
    });

    const list: Array<TaskTemplateModel> =
        isSuccess && Array.isArray(processTemplate?.taskTemplates)
            ? processTemplate?.taskTemplates
            : [];

    const preparedTimes = list.map((taskTemplate: TaskTemplateModel) =>
        convertSeconds(taskTemplate.slaInSeconds),
    );

    const methods = useForm();

    const {
        handleSubmit,
        reset,
        control,
        formState: { isDirty },
    } = methods;

    useBeforeUnload(isDirty && !updateMutation.isSuccess);

    useFieldArray({
        control,
        name: "times",
    });

    useSetDefaultValues(reset, {
        times: preparedTimes,
        id: processTemplate?.id,
        processTemplate: {
            label: getWord(processTemplate?.localaziableName),
            value: processTemplate?.id,
        },
        priority: {
            label: t(processTemplate?.priority),
            value: processTemplate?.priority,
        },
    });

    const columns = [
        {
            label: t("Задачи"),
            key: "",
            cellRender: (row: any, index: number) => (
                <div className="flex gap-2 cursor-pointer items-center break-all">
                    <span className="text-b-2-r text-c_neutral-800">{`№${index + 1}`}</span>
                    <span>{t(row?.type)}</span>
                </div>
            ),
            width: "w-[50%]",
        },
        {
            label: t("Крайний срок"),
            key: "deadline",
            cellRender: (_, index: number) => {
                return <SlaForm disabled={mode === "readonly"} index={index} />;
            },
            width: "w-[50%]",
        },
    ];

    const onSubmit = handleSubmit((values) => {
        const preparedBody = prepareProcessTemplateForUpdate(values, list);

        updateMutation.mutate({ id: processTemplate?.id, ...preparedBody });
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <div className="border border-c_neutral-300 rounded-lg mb-10">
                    <div className="flex justify-end items-center mb-3 py-4 pr-2">
                        <ZButton
                            type="button"
                            size="md"
                            onClick={() =>
                                replaceQuery({
                                    mode:
                                        mode === "readonly"
                                            ? "edit"
                                            : "readonly",
                                })
                            }
                        >
                            {mode === "edit"
                                ? t("Только чтение")
                                : t("Редактировать")}
                        </ZButton>
                    </div>
                    <ZDataGrid
                        rows={list}
                        columns={columns}
                        hasActions={false}
                        hasFilter={false}
                        hasExport={false}
                        hasSettings={false}
                        hasSearch={false}
                        buttonKey={""}
                        withPagination={false}
                        loading={isLoading}
                        rootClassName="border-none"
                    />
                </div>
                {mode === "edit" && (
                    <div>
                        <div className="flex gap-4 items-center">
                            <ZButton
                                variant="secondary"
                                className="w-[200px]"
                                onClick={() => router.back()}
                                disabled={updateMutation.isPending}
                                type="button"
                            >
                                {t("Отменить")}
                            </ZButton>
                            <ZButton
                                pending={updateMutation.isPending}
                                variant="primary"
                                className="w-[200px]"
                            >
                                {t("Сохранить")}
                            </ZButton>
                        </div>
                    </div>
                )}
            </form>
        </FormProvider>
    );
};

export default TasksTab;
