import { userRepository } from "../repositories/userRepository.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtUtil.js";
import { comparePassword, hashPassword } from "../utils/passwordUtil.js";
import { loginInput, registerInput } from "../validators/authValidators.js";

export class AuthService{
    async register (data : registerInput){
        const {name , email , password}=data;
        const existingUser = await userRepository.findByEmail(email);
        if(existingUser){
            throw new Error("User Already exists");
        } 
        const hashedPassword = await hashPassword(password);
        const newUser= await userRepository.createUser({
                    name : data.name,
                    email : data.email,
                    password: hashedPassword,
        });

       return newUser; 
    };
    async logIn (data : loginInput){
        const{email ,password}=data;
        const user= await userRepository.findByEmail(email);
        if( !user ){
            throw new Error("Invalid Email or Password");
        } 
        const isMatch= await comparePassword( password , user.password );
        if( !isMatch ){
            throw new Error("Invalid Email or Password");
        }
        const accessToken = generateAccessToken({
            userId: user.id,
            role :  user.role,
        });
        const refreshToken = generateRefreshToken(user.id);
      return {
            user :{
               id : user.id,
               name : user.name,
               email : user.email,
               role : user.role,
            },
            accessToken ,
            refreshToken ,
      }
    };


}
export const authService = new AuthService();