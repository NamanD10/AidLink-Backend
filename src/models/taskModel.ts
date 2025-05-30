import { Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async(requesterId : number) => {
    
    //get all tasks with user_id == requesterId, this is done with the help of where clause 
    //and we need only show title, description and id of the task, so this is done by the select query

    try{
        const tasks = await prisma.task.findMany(
            { 
                where: { user_id: requesterId },
                select:{id:true, title:true, description:true}
            })
        
        return tasks;
    }
    catch(error){
        console.error("Error while fetching all the tasks", error);
    }


};

export const getTaskById = async(taskId:number) => {

    //get a single task with prisma where id == taskId
    try{
        const task = await prisma.task.findUnique({
        where: {
            id: taskId
        }
    })
    
    return task;
    }
    catch(error){
        console.error("Error while fetching task", error)
    }
    
};

export const createTask = async(title:string, description:string, requesterId:number) => {
    
    //create task with prisma
    try{
        const task = await prisma.task.create({
        data: {
            title :title,
            description: description,
            user_id: requesterId
        }}
    )
    return task;
    } catch (error){
        console.error("error occured during creating task", error);
    }
    
};

export const updateTask = async(id:number, newTitle?:string, newDescription?: string) => {

    //now update its details as given where clause finds the task
    //data clause updates the data
    //newTitle || undefined is apparaently used to update only if the parameter has some value 
    try{
        const newTask = await prisma.task.update({
            where:{
                id : id
            },
            
            data:{
                title: newTitle || undefined, //using this syntax might throw error, keep in mind
                description: newDescription || undefined 
            }
        })
        return newTask;

    } catch (error){
        console.error("error occured during updating task", error);
    }
};

export const deleteTask = async(taskId : number) => {
    try{
        const deletedTask = await prisma.task.delete({
            where: {
                id : taskId
            }
        })
        return deletedTask;
    }
    catch(error){
        console.error("Error while deleting a task", error);
    }
};

