import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';
import { queryClient } from '../lib/react-query'

interface TaskCredentials {
    taskNumber: number;
    text: string;
    status?: "completed" | "uncompleted";
}

const addTaskCredentials = async (taskCredentials: TaskCredentials): Promise<void> => {
    return axiosInstance.post('create', {
        taskNumber: taskCredentials.taskNumber,
        text: taskCredentials.text,
        status: taskCredentials.status,
    })
}

// Create a task
export function useCreateTask() {
    return useMutation<void, unknown, TaskCredentials>(addTaskCredentials, {
        onSuccess: (values) => {
            queryClient.invalidateQueries(['tasks'])
        }
    })
};