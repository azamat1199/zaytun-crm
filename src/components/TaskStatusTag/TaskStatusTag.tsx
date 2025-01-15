import { TaskStatusType } from "@/data/task";
import { StatusTag } from "@zaytun/components";
import { FC } from "react";

interface TaskStatusTagProps {
    status: TaskStatusType;
}

const TaskStatusTag: FC<TaskStatusTagProps> = ({ status }) => {
    return <StatusTag value={status} variant="success" />;
};

export default TaskStatusTag;
