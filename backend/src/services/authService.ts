import { userRepository, UserWithoutPassword } from "../repositories/userRepository.js";
import { AppError } from "../utils/appError.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwtUtil.js";
import { comparePassword, hashPassword } from "../utils/passwordUtil.js";
import { loginInput, registerInput } from "../validators/authValidators.js";

export class AuthService{
    async register (data : registerInput): Promise<UserWithoutPassword>{
        const {name , email , password}=data;
        const existingUser = await userRepository.findByEmail(email);
        if(existingUser){
            throw new AppError("User Already exists" , 400);
        } 
        const hashedPassword = await hashPassword(password);
        const newUser= await userRepository.createUser({
                    name : data.name,
                    email : data.email,
                    password: hashedPassword,
        });

       return newUser; 
    }
    async logIn (data : loginInput){
        const{email ,password}=data;
        const user= await userRepository.findByEmail(email);
        if( !user ){
            throw new AppError("Invalid Email or Password" , 401);
        } 
        const isMatch= await comparePassword( password , user.password );
        if( !isMatch ){
            throw new AppError("Invalid Email or Password" , 401);
        }
        const accessToken = generateAccessToken({
            userId: user.id,
            role :  user.role,
        });
        const refreshToken = generateRefreshToken(user.id);
        await userRepository.updateRefreshToken(user.id , refreshToken);
        return {
                message: "Login successful",
                user :{
                id : user.id,
                name : user.name,
                email : user.email,
                role : user.role,
                },
                accessToken ,
                refreshToken ,
        }
    }
    async refreshTokens(incomingRefreshToken : string){
        if(!incomingRefreshToken){
            throw new AppError("Refresh token is required" ,401);
        }
        let payload : {userId : string};
        try {
            payload = verifyRefreshToken(incomingRefreshToken);
        } catch (err) {
            throw new AppError("Invalid or expired refresh token" , 403);
        }
        const user =await userRepository.findById(payload.userId);
        
        if(!user || user.refreshToken !== incomingRefreshToken){
            throw new AppError("Invalid RefreshToken" ,403);
        }
        const newAccessToken=generateAccessToken({
             userId: user.id,
             role: user.role,
        });
        const newRefreshToken =generateRefreshToken(user.id);
        await userRepository.updateRefreshToken(user.id ,newRefreshToken);
        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
    async logout(refreshToken: string) {
        try {
            const payload = verifyRefreshToken(refreshToken);
            await userRepository.updateRefreshToken(payload.userId, null);
        } catch (err) {
            return;
        }
    }


}
export const authService = new AuthService();