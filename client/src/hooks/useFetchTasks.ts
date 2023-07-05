import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';
import { Task, TasksResponse } from '../lib/task';

// Fetch all tasks
export function useFetchTasks() {
    return useQuery<TasksResponse, Error>(
        ['tasks'],
        async () =>
            axiosInstance
                .get<TasksResponse>('tasks')
                .then(response => {
                    return response?.data;
                })
                .catch(error => {
                    throw new Error(error?.message);
                }),
        {
        },
    );
};

// Count completed and uncompleted tasks
export function countTasks(tasks: Task[] | undefined) {
    if (!tasks) {
        return {
            completed: 0,
            uncompleted: 0,
        };
    }
    const completedTasks = tasks.filter(task => task.status === 'completed');
    const uncompletedTasks = tasks.filter(task => task.status !== 'completed');

    return {
        completed: completedTasks.length,
        uncompleted: uncompletedTasks.length,
    };
}