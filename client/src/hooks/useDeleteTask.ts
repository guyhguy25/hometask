import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';
import { queryClient } from '../lib/react-query'

interface TaskCredentials {
    id: string;
}
  
const deleteTaskCredentials = async (id: TaskCredentials): Promise<void> => {
    return axiosInstance.delete(`${id}`);
};

// Delete a task
export function useDeleteTask() {
    return useMutation<void, unknown, TaskCredentials>(deleteTaskCredentials, {
        onError: (error: unknown) => {
            console.error("values", error);
        },
        onSuccess: (values) => {
            queryClient.invalidateQueries(['tasks'])
        }
    })
};