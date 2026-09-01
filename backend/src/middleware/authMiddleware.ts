import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError.js";
import jwt from 'jsonwebtoken';

export const verifyJWT= (req : Request , res : Response , next : NextFunction)=>{
    const token = req.cookies?.accessToken;
    if(!token){
        return next(new AppError("AccessToken is missing or required" , 401));
    }
    jwt.verify(
        token ,
        process.env.ACCESS_TOKEN_SECRET || "default_secret" ,
        (err : any , decoded : any)=>{
             if(err){
                return next(new AppError("Inavlid or expired access token", 403))
             }
             req.user = decoded;
             next();
        });
};
