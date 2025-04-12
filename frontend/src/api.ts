import axios from "axios";
import { StatusStates, CreateArgs, Task } from "./types";

const base_url = 'http://localhost:3000/tasks';

const createTask = async (args: CreateArgs): Promise<Task> => {
    try {
        const response = await axios.post(`${base_url}`, args);
        return response.data
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

const getTask = async (id: number): Promise<Task> => {
    try {
        const response = await axios.get(`${base_url}/${id}`);
        return response.data
    } catch (error) {
        console.error(`Error getting task with id ${id}`, error)
        throw error
    }
}

const listTasks = async (): Promise<Task[]> => {
    try {
        const response = await axios.get(`${base_url}`);
        return response.data.sort((a: Task, b: Task) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

const updateTask = async (id: number, status: StatusStates): Promise<Task> => {
    try {
        const response = await axios.put(`${base_url}/${id}`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

const deleteTask = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${base_url}/${id}`);
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

export default {
    createTask,
    listTasks,
    getTask,
    updateTask,
    deleteTask
}



