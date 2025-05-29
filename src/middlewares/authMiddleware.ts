import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config({path:'.env'});

const SECRET = process.env.JWT_SECRET;

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        //extract authorization header
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return console.error("Auth header not found");
        }
        
        //authorization header: "bearer ${token}", so we split it this way to get only the token 
        const token = authHeader?.split(" ")[1];
        
        //storing the decoded token
        const decoded = jwt.verify(token, SECRET);

        //passing it on to the req, we had to make a customRequest as original request type of express dont have token as its member
        (req as CustomRequest).token = decoded;
    
        next();

    } catch(err) {
        res.send(401).json({message: 'Error occured', err});
    }
}

