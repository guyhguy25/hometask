import { Task_status } from "@prisma/client";

  export default interface UpdateTaskRequest {
    id: string;
    text?: string;
    taskNumber?: number;
    status?: Task_status;
}