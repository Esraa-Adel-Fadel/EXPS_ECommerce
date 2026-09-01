import { NextFunction, Request,Response } from "express";
import { loginSchema, registerSchema } from "../validators/authValidators.js";
import { authService } from "../services/authService.js";
class AuthController{
    //======= register =========
    async register( req : Request , res : Response , next : NextFunction){
        try{
            const validation = registerSchema.safeParse(req.body);
            if(!validation.success){
                return res.status(400).json({
                    errors: validation.error.flatten().fieldErrors,
                });
            }
            const user= await authService.register(validation.data);
            return res.status(201).json({
                message: "User registered successfully",
                user
            });
        }catch(err : any){
            next(err);
        }
         
          
    }
    //======= login =========
    async login(req : Request , res : Response , next : NextFunction){
        try{
            const validation = loginSchema.safeParse(req.body);
            if(!validation.success){
                return res.status(400).json({
                    status: "fail",
                    errors: validation.error.flatten().fieldErrors,
                });
            }
            const { accessToken, user , refreshToken} = await authService.logIn(validation.data);
            res.cookie("accessToken" ,accessToken ,{
                httpOnly : true,
                secure : process.env.NODE_ENV === "production",
                sameSite : 'strict',
                maxAge : 15 * 60 * 1000,
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, 
            });
           return res.status(200).json({
            message: "Login successful",
            user
           });
        }catch(err :any){
           next(err);
        }
    }
    //======= logOut =========
    async logout(req : Request , res : Response , next : NextFunction){
        try {
            const refreshToken=req.cookies?.refreshToken;
            if(refreshToken){
                await authService.logout(refreshToken);
            }
            res.clearCookie("accessToken" , {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            res.clearCookie("refreshToken" , {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
            return res.status(200).json({
                message: "logged out successfully",
            })
            
        } catch (err) {
            next(err);
        }
    }
      //======= Refresh Token =========
    async refresh(req : Request , res : Response , next : NextFunction){
           try {
            const incomingRefreshToken=req.cookies?.refreshToken;
            const {accessToken , refreshToken} =await authService.refreshTokens(incomingRefreshToken);
            res.cookie("accessToken", accessToken,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000,
            });
            res.cookie("refreshToken", refreshToken,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60* 1000,
            });
            return res.status(200).json({
                message: "Tokens refreshed successfully",
            });
            
           } catch (err) {
            next(err)
           }
    }

};

export const authController = new AuthController();