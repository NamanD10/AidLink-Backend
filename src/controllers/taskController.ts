import { Request, Response, } from "express"

import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../models/taskModel";

export const handleGetTasks = async(req:Request, res:Response) => {
    const requesterId = req.body;

    const tasks = await getTasks(requesterId);

    if(!tasks) {
        res.send(501).json({message: "Could not get tasks"});
    }
    res.send(201).json({tasks});

};

export const handleGetTasksById = async(req:Request, res:Response) => {
    const taskId = req.body;

    const task = await getTaskById(taskId);

    if(!task) {
        res.send(501).json({message: "Could not get tasks", id: taskId});
    }
    res.send(201).json({task});

};

export const handleCreateTasks = async(req:Request, res:Response) => {
    const {title ,description, requesterId} = req.body;

    const createdTask = await createTask(title, description, requesterId);

    if(!createdTask) {
        res.send(501).json({message: "Could not create task"});
    }
    res.send(201).json({createdTask});

};

export const handleUpdateTask = async(req:Request, res:Response) => {
    const {taskId, title, description} = req.body;

    const updatedTask = await updateTask(taskId, title, description);

    if(!updatedTask) {
        res.send(501).json({message: "Could not update task"});
    }
    res.send(201).json({updatedTask});

};

export const handleDeleteTask = async(req:Request, res:Response) => {
    const {taskId} = req.body;

    const deletedTask = await deleteTask(taskId);

    if(!deletedTask) {
        res.send(501).json({message: "Could not delete task"});
    }
    res.send(201).json({message: "Deleted task", deletedTask});

};

