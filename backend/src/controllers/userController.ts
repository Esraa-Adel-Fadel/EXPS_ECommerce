import { NextFunction, Request,Response } from "express";
class UserController{
    //======= register =========
    async register( req : Request , res : Response , next : NextFunction){
        const { email , password , name} = req.body;
        if(!email || !password || !name){
            res.status(400).json({messge:"Email or Password or Name is required"});
        }
        try{

        }catch{
            
        }

          
    }
    //======= login =========
    async login(req:Request,res:Response){
        const { email , password} = req.body;
        if(!email || !password){
            res.status(400).json({messge:""})
        }
        try{
        

        }catch{

        }
    }

};
export const userController = new UserController();