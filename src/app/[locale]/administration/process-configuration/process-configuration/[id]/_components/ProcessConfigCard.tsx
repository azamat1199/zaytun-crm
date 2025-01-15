import { formatDate } from "@/services/time";
import { useParams } from "next/navigation";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useGetProcessTemplateByIdFromQuery } from "@/hooks/api/useGetProcessTemplateById";
import useAppTranslations from "@/hooks/helpers/useAppTranslations";

const ProcessConfigCard = () => {
    const { t } = useAppTranslations();
    const { id } = useParams();
    const { status, processTemplate } = useGetProcessTemplateByIdFromQuery(
        id as string,
    );


    return (
        <article className="pt-6 pb-3 rounded-2xl border border-c_neutral-200">
            <header className="flex flex-col gap-2 px-6 pb-6">
                <h3 className="text-c_blue-500 text-h3-r underline">
                    {status === "pending" ? (
                        <Skeleton width={200} height={35} />
                    ) : (
                        t(processTemplate?.type)
                    )}
                </h3>
                <div className="flex items-center gap-[6px]">
                    <span className="text-b-1-r text-c_neutral-500">
                        {t("BPMS CODE")}:
                    </span>{" "}
                    <span className="text-b-1-r text-c_neutral-500">
                        {status === "pending" ? (
                            <Skeleton width={120} />
                        ) : (
                            processTemplate?.bpmsCode
                        )}
                    </span>
                </div>
            </header>

            <div className="[&>div]:px-6">
                <div className="border-b border-t border-[#F2F4F7] flex justify-between items-center py-3">
                    <span className="text-b-1-m text-c_neutral-600 font-medium">
                        {t("Дата создания")}
                    </span>
                    <span className="text-b-2-m text-c_neutral-500 font-medium">
                        {status === "pending" ? (
                            <Skeleton width={120} />
                        ) : (
                            formatDate(processTemplate?.createdAt)
                        )}
                    </span>
                </div>
                <div className="border-b border-t border-[#F2F4F7] flex justify-between items-center py-3">
                    <span className="text-b-1-m text-c_neutral-600 font-medium">
                        {t("Дата обновления")}
                    </span>
                    <span className="text-b-2-m text-c_neutral-500 font-medium">
                        {status === "pending" ? (
                            <Skeleton width={120} />
                        ) : (
                            formatDate(processTemplate?.updatedAt)
                        )}
                    </span>
                </div>
            </div>
        </article>
    );
};

export default ProcessConfigCard;
