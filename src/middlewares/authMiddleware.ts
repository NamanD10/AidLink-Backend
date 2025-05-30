import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config({path:'.env'});

const SECRET = process.env.JWT_SECRET;

export interface CustomRequest extends Request {
 user: {
    email: string,
    role: string
 }
}


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        
        if(!SECRET){
        console.error("Can not extract jwt secret");
        return;
        }

        //extract authorization header
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ message: 'Missing or invalid token' });
        }
        
        //authorization header: "bearer ${token}", so we split it this way to get only the token 
        const token = authHeader?.split(" ")[1];
        
        //storing the decoded token
        const decoded = jwt.verify(token, SECRET) as {email: string, role : string};

        //passing it on to the req, we had to make a customRequest as original request type of express dont have user as its member
        //we assign user role to req.user so that we can use it in RBAC middleware
        (req as CustomRequest).user = decoded;
    
        next();

    } catch(err) {
        res.send(401).json({message: 'Error occured', err});
    }
}

