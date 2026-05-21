import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTasks = async (req : Request,res : Response) =>{
    try{
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({error: "Can't fetch tasks"});
    } 
};

export const getTaskById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, category, dueDate } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    if (due < today) {
      return res.status(400).json({
        error: "Due date cannot be in the past",
      });
    }
    const newTask = await prisma.task.create({
      data: { title, description, priority, category, dueDate}
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Can't create new task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const { dueDate } = req.body;

    if (dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const due = new Date(dueDate);
      due.setHours(0, 0, 0, 0);

      if (due < today) {
        return res.status(400).json({
          error: "Due date cannot be in the past",
        });
      }
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...req.body,
      },
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Can't update the task" });
  }
};

export const deleteTask = async (req : Request , res : Response ) =>{
    try {
        const id = Number(req.params.id);
        const deletedTask = await prisma.task.delete({where:{id}});
        res.status(200).json(deletedTask);
    } catch(error){
        res.status(500).json({error:"Unable to delete the task"});
    }
};