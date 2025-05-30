import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

export const createApplication = async(taskId : number, userId: number) => {
    try{
        const application = await prisma.application.create({
            data: {
                task_id :  taskId,
                user_id : userId,
                status : 'Pending'
            }
        })
        return application;
    } 
    catch (error){
        console.error("error occured during creating task", error);
    }
};

export const getMyApplications = async(userId: number) => {
    try{
        const applications = await prisma.application.findMany(
            { 
                where: { user_id: userId },
               
            })
        
        return applications;
    }
    catch(error){
        console.error("Error while fetching all the applications", error);
    }

};

export const getTaskApplications = async(taskId : number) => {
    try{
        const applications = await prisma.application.findMany(
            { 
                where: { task_id: taskId },
               
            })
        
        return applications;
    }
    catch(error){
        console.error("Error while fetching all the applications", error);
    }   
};

export const updateApplicationStatus = async(applicationId : number, newStatus : Status) => {
    try{
        const updatedApplication = await prisma.application.update({
            where:{
                id : applicationId
            },
            data: {
                status: newStatus
            }
        });
        return updatedApplication;
    }
    catch(error){
        console.error("Error while updating the application", error);
    }  
};