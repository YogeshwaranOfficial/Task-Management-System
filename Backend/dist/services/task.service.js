"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prisma.task.findMany();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: "Can't fetch tasks" });
    }
});
exports.getTasks = getTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const task = yield prisma.task.findUnique({
            where: { id },
        });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching task" });
    }
});
exports.getTaskById = getTaskById;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newTask = yield prisma.task.create({
            data: { title, description, priority, category, dueDate }
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ error: "Can't create new task" });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const updatedTask = yield prisma.task.update({
            where: { id },
            data: Object.assign({}, req.body),
        });
        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(500).json({ error: "Can't update the task" });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const deletedTask = yield prisma.task.delete({ where: { id } });
        res.status(200).json(deletedTask);
    }
    catch (error) {
        res.status(500).json({ error: "Unable to delete the task" });
    }
});
exports.deleteTask = deleteTask;
