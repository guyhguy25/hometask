export interface Task {
    id: string;
    taskNumber: number;
    text: string;
    status: "completed" | "uncompleted";
    createdAt: Date;
    updatedAt: Date;
    deleted: false;
}

export interface TasksResponse {
    tasks: Task[];
}