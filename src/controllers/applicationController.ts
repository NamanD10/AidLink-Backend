import { Request ,Response } from "express";
import { createApplication, getMyApplications, getTaskApplications, updateApplicationStatus } from "../models/applicationModel";


export const handleGetMyApplications = async(req : Request, res: Response) => {
    const userId = req.body;

    const applications = await getMyApplications(userId);

    if(!applications){
        res.status(500).json({message: "Could not get applications"});
    }

    res.status(201).json({applications});

};

export const handleGetTaskApplications = async(req : Request, res: Response) => {
    const taskId = req.body;

    const applications = await getTaskApplications(taskId);

    if(!applications){
        res.status(500).json({message: "Could not get applications"});
    }

    res.status(201).json({applications});

};

export const handleCreateApplication = async(req: Request, res: Response) => {
    const {taskId, userId} = req.body;

    const application = await createApplication(taskId, userId);

    if(!application){
        res.status(500).json({message: "Could not create application"});
    }

    res.status(201).json({application});
};

export const handleUpdateApplicationStatus = async(req: Request, res: Response) => {
    const {taskId, newStatus} = req.body;
    const updatedApplication = await updateApplicationStatus(taskId, newStatus);

    if(!updatedApplication){
        res.status(500).json({message: "Could not update application"});
    }

    res.status(201).json({updatedApplication});
};