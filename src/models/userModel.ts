import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async(name:string, email:string, password:string, role:'Requester'|'Helper') => {
    const hashedPwd = await hash(password, 10); //hashing password
    //create user with prisma
    const user = await prisma.user.create({
        data: {
             name: name,
             email: email,
             password: hashedPwd,
             role: role,             
        }}
    )
    return user;
};

export const checkUser = async(email: string, password: string) => {
    try{
        //find user from email
        const user = await prisma.user.findUnique({    
            where: {
                email: email
            }
        });
        if(user){
            try{
                //check plain pwd with hashed pwd
                const validPass = await compare(password, user.password); 
                if (validPass) {
                    return user;
                }       
            }
                catch(err){
                    console.error('Error while checking password', err);
                }
        }
        }
    catch(err){
        console.error('Error while fetching user from DB', err);
    }
};





