import { Task_status } from "@prisma/client";

export default interface CreateTaskRequest {
    text: string;
    taskNumber: number;
    status: Task_status;
}