import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js"
import { error } from "node:console";

export const globalErrorHandler=(
    err : Error | AppError,
    req : Request,
    res : Response,
    next : NextFunction
     )=>{
       const statusCode = (err as AppError).statusCode || 500;
       const message = err.message || "Internal Server Error";

       console.log(`[ERROR] ${req.method} ${req.url} - ${message}`);
       
            return res.status(statusCode).json({
                status: "error",
                statusCode,
                message,
            });
 }