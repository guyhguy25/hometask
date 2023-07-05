import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';
import { queryClient } from '../lib/react-query'

interface TaskCredentials {
    id: string;
    taskNumber?: number;
    text?: string;
    status?: "completed" | "uncompleted";
}

const updateTaskCredentials = async (taskCredentials: TaskCredentials): Promise<void> => {
    return axiosInstance.put(`${taskCredentials.id}`, {
        taskNumber: taskCredentials.taskNumber,
        text: taskCredentials.text,
        status: taskCredentials.status,
    })
}

// Update a task
export function useUpdateTask() {
    return useMutation<void, unknown, TaskCredentials>(updateTaskCredentials, {
        onSuccess: (values) => {
            queryClient.invalidateQueries(['tasks'])
        }
    })
};