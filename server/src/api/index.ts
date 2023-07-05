import express, { Request, Response } from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import { prisma } from '../db';
import CreateTaskRequest from '../interfaces/CreateTaskRequest';
import UpdateTaskRequest from '../interfaces/UpdateTaskRequest';

const router = express.Router();

router.get<{}, MessageResponse>('/tasks', async (req: Request, res: Response<MessageResponse>) => {
    try {
        const tasks = await prisma.task.findMany({
        where: {
            deleted: false
        }
        });

        const messageResponse: MessageResponse = {
        tasks: tasks.map((task) => ({
            id: task.id,
            text: task.text,
            taskNumber: task.taskNumber,
            status: task.status,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            deleted: task.deleted,
        })),
        };

        res.json(messageResponse);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

router.post<{}, MessageResponse>('/create', async (req: Request<{}, {}, CreateTaskRequest>, res: Response<MessageResponse>) => {
    try {
        const { text, taskNumber, status } = req.body;
        const createdTask = await prisma.task.create({
        data: {
            text,
            taskNumber,
            status,
        },
        });

        const messageResponse: MessageResponse = {
        message: 'Task created successfully',
        tasks: [createdTask],
        };

        res.json(messageResponse);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Error creating task' });
    }
});

router.put<{ id: string }, MessageResponse>('/:id', async (req: Request<{ id: string }, {}, UpdateTaskRequest>, res: Response<MessageResponse>) => {
    try {
        const taskId = req.params.id;
        const { text, taskNumber, status } = req.body;

        const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
            text,
            taskNumber,
            status,
        },
        });

        const messageResponse: MessageResponse = {
        message: 'Task updated successfully',
        tasks: [updatedTask],
        };

        res.json(messageResponse);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task' });
    }
});

router.delete<{ id: string }, MessageResponse>('/:id', async (req: Request<{ id: string }, MessageResponse>, res: Response<MessageResponse>) => {
    try {
        const taskId = req.params.id;

        const deletedTask = await prisma.task.delete({
        where: { id: taskId },
        });

        if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
        }

        const messageResponse: MessageResponse = {
        message: 'Task deleted successfully',
        };

        res.json(messageResponse);
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task' });
    }
});

export default router;