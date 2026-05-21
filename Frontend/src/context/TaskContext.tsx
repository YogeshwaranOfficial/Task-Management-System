import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Task } from "../types/task";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";

type TaskContextType = {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (data: any) => Promise<void>;
  editTask: (id: number, data: any) => Promise<void>;
  softDeleteTask: (id: number) => Promise<void>;
  permanentDeleteTask: (id:number) => Promise<void>;
  restoreTask: (id: number) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

    const addTask = async (data: any) => {
    await createTask(data);
    await fetchTasks(); 
  };

  const editTask = async (id: number, data: any) => {
    await updateTask(id, data);
    await fetchTasks();
  };

  const softDeleteTask = async (id: number) => {
    await updateTask(id, { deleted: true });
    await fetchTasks();
  };

  const permanentDeleteTask = async (id: number) => {
  await deleteTask(id);
  await fetchTasks();
};

  const restoreTask = async (id: number) => {
    await updateTask(id, { deleted: false });
    await fetchTasks();
  };

    return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        editTask,
        softDeleteTask,
        permanentDeleteTask,
        restoreTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
};