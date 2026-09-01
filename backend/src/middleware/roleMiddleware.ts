import { Request , Response ,NextFunction } from "express";
import { AppError } from "../utils/appError.js";

export const restrictToAdmin=(req : Request , res : Response , next : NextFunction)=>{
    const role = req.user?.role;
    if(role !== "Admin"){
        return next(new AppError("You do not have permission to perform this action",403))
    }
    next();
};