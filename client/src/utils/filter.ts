import { Task } from "../lib/task";

type TaskStatus = 'completed' | 'uncompleted';

export const filterTasksByStatus = (tasks: Task[] | undefined, status: TaskStatus) => {
    if (!tasks) {
        return [];
    }

    return tasks.filter(task => task.status === status);
}