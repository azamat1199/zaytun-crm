import { useGetTaskDetailByIdFromQueryStore } from "@/hooks/api/useGetTaskDetailById";
import { formatDate } from "@/services/time";
import get from "lodash.get";
import { useParams } from "next/navigation";
import React from "react";
import Skeleton from "react-loading-skeleton";
import TaskStatusTag from "../TaskStatusTag";
import { formatName } from "@/utils/common";
import useKeyTranslation from "@/hooks/helpers/useKeyTranslation";

const TaskShortDetailCard = () => {
    const { id } = useParams();
    const { getWord2 } = useKeyTranslation();
    const { task, status } = useGetTaskDetailByIdFromQueryStore(id as string);

    return (
        <article className="pt-6 pb-3 rounded-2xl border border-c_neutral-200">
            <header className="flex flex-col gap-2 px-6 pb-6">
                <h3 className="text-c_blue-500 text-h3-r underline">
                    Прием нового сотрудника
                </h3>
                <div className="flex items-center gap-[6px]">
                    <span className="text-b-1-r text-c_neutral-500">
                        ID задачи:
                    </span>{" "}
                    <span className="text-b-1-r text-c_neutral-500">
                        {status === "pending" ? (
                            <Skeleton width={120} />
                        ) : (
                            task?.uniqueNumber
                        )}
                    </span>
                </div>
                <div className="flex items-center gap-[6px]">
                    <span className="text-b-1-r text-c_neutral-500">
                        Код ЦБУ:
                    </span>{" "}
                    <span className="text-b-1-r text-c_neutral-500">
                        {status === "pending" ? (
                            <Skeleton width={120} />
                        ) : (
                            task?.codeCBU
                        )}
                    </span>
                </div>
            </header>

            <div className="[&>div]:px-6">
                <div className="border-b border-t border-[#F2F4F7] flex justify-between items-center py-3">
                    <span className="text-b-1-m text-c_neutral-600 font-medium">
                        Дата создания
                    </span>
                    <span className="text-b-2-m text-c_neutral-500 font-medium">
                        {status === "pending" ? (
                            <Skeleton width={120} />
                        ) : (
                            formatDate(task?.createdAt)
                        )}
                    </span>
                </div>
                <div className="border-b border-t border-[#F2F4F7] flex justify-between items-center py-3">
                    <span className="text-b-1-m text-c_neutral-600 font-medium">
                        Крайний срок
                    </span>
                    <span className="text-b-2-m text-c_neutral-500 font-medium">
                        {status === "pending" ? (
                            <Skeleton width={120} />
                        ) : (
                            formatDate(task?.deadline)
                        )}
                    </span>
                </div>
                <div className="border-b border-t border-[#F2F4F7] flex justify-between items-center py-3">
                    <span className="text-b-1-m text-c_neutral-600 font-medium">
                        Ответственный
                    </span>
                    <span className="text-b-2-m text-c_neutral-500 font-medium">
                        {status === "pending" ? (
                            <Skeleton width={120} />
                        ) : (
                            formatName({
                                firstName: getWord2(
                                    get(task, "assignedEmployee", {}),
                                    "firstName",
                                ),
                                lastName: getWord2(
                                    get(task, "assignedEmployee", {}),
                                    "lastName",
                                ),
                                middleName: getWord2(
                                    get(task, "assignedEmployee", {}),
                                    "middleName",
                                ),
                            })
                        )}
                    </span>
                </div>
                <div className="border-b border-t border-[#F2F4F7] flex justify-between items-center py-3">
                    <span className="text-b-1-m text-c_neutral-600 font-medium">
                        Инициатор
                    </span>
                    <span className="text-b-2-m text-c_neutral-500 font-medium">
                        {status === "pending" ? (
                            <Skeleton width={120} />
                        ) : (
                            formatName({
                                firstName: getWord2(
                                    get(task, "actualProcess.creator", {}),
                                    "firstName",
                                ),
                                lastName: getWord2(
                                    get(task, "actualProcess.creator", {}),
                                    "lastName",
                                ),
                                middleName: getWord2(
                                    get(task, "actualProcess.creator", {}),
                                    "middleName",
                                ),
                            })
                        )}
                    </span>
                </div>
                <div className="border-t border-[#F2F4F7] flex justify-between items-center pt-3">
                    <span className="text-b-1-m text-c_neutral-600 font-medium">
                        Статус
                    </span>
                    {status === "pending" ? (
                        <Skeleton width={120} />
                    ) : (
                        <TaskStatusTag status={task.status} />
                    )}
                </div>
            </div>
        </article>
    );
};

export default TaskShortDetailCard;
