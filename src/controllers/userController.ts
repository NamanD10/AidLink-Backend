import { Request, Response } from "express";
import { checkUser, createUser } from "../models/userModel";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path:'.env'});

const SECRET = process.env.JWT_SECRET;

export const handleUserSignup = async(req:Request , res: Response) => {
    const {name, email, password, role} = req.body;
    
    const existingUser = await checkUser(email, password);
    if(existingUser){
        res.send(403).json({message:"User already exists"});
    }

    const user = createUser(name, email, password, role);

    if(!user){
        res.send(500).json({message:'Could not create user'});
    }
    const token = jwt.sign({email: email, role: role}, SECRET,  () => {

        res.send(201).json({message:`User created succesfully ${token}`});
    });
};

export const handleUserLogin = async(req:Request, res:Response) => {
    const {email, password,role} = req.body;
    
    const user = await checkUser(email, password);
    
    if(user){
        const token = jwt.sign({email: email, role: role}, SECRET,  () => {

        res.send(201).json({message:`User logged in succesfully ${token}`});
    })
    }
    else{
        res.send(402).json({message:"Bad credentials"});
    }
};
