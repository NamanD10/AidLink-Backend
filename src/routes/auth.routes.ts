import express from 'express';
import { handleUserLogin, handleUserSignup } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.post("/signup", handleUserSignup);

userRouter.post("/login", handleUserLogin);
