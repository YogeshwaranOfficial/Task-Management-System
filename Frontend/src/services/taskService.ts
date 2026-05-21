import axios from 'axios';
import type { Task } from '../types/task'

const API_URL = "http://localhost:5000/api/tasks";

//get tasks
export const getTasks = async(): Promise<Task[]> => {
    const res = await axios.get (API_URL);
    return res.data;
};

//create task
export const createTask = async(data: Partial<Task>): Promise<Task> =>{
    const res = await axios.post (API_URL, data);
    return res.data;
};

//update task
export const updateTask = async(id: number, data: Partial<Task>): Promise<Task> =>{
    const res = await axios.patch (`${API_URL}/${id}`,data);
    return res.data;
};

//delete task
export const deleteTask = async(id: number): Promise<Task> =>{
    const res = await axios.delete (`${API_URL}/${id}`);
    return res.data;
};

//update status
export const toggleTaskStatus = async (
  id: number,
  data: { completed: boolean; completedAt: string | null }
) => {
  return axios.patch(`${API_URL}/${id}`, data)
};