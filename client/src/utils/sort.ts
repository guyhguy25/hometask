import { Task } from '../lib/task';

type SortFn = (a: Task, b: Task) => number;

const sortTasks = (tasks: Task[] | undefined, sortFn: SortFn): Task[] => {
    if (!tasks) {
        return [];
    }

    const sortedTasks = [...tasks];
    return sortedTasks.sort(sortFn);
};

export const sortByTaskNumber = (tasks: Task[] | undefined): Task[] => {
    return sortTasks(tasks, (a, b) => a.taskNumber - b.taskNumber);
};

export const sortByTaskStatus = (tasks: Task[] | undefined): Task[] => {
    return sortTasks(tasks, (a, b) => a.status.localeCompare(b.status));
};

export const sortByTaskDate = (tasks: Task[] | undefined): Task[] => {
    return sortTasks(
        tasks,
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
};

export const sortByTaskText = (tasks: Task[] | undefined): Task[] => {
    return sortTasks(tasks, (a, b) => a.text.localeCompare(b.text));
};