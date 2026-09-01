import { User } from "@prisma/client";
import prisma from "../config/db.js";


export type UserWithoutPassword = Omit<User , "password" | "refreshToken">;
interface CreateUserData{
    name: string,
    email: string,
    password:string
}
export class UserRepository {
    async findByEmail ( email :string): Promise<User | null>{
        return await prisma.user.findUnique({
                    where: {
                        email : email,
                    },
        });
    };
    async findById(id : string): Promise<User | null>{
        return await prisma.user.findUnique({
                    where: {
                        id,
                    },
        });
    };
    async updateRefreshToken(userId : string , refreshToken : string | null) {
        return await prisma.user.update({
                   where:{
                    id: userId,
                   },
                   data:{
                    refreshToken: refreshToken,
                   }
        });
    };
    async createUser ( data : CreateUserData): Promise<UserWithoutPassword>{
        return await prisma.user.create({
                    data: {
                        name :data.name,
                        email : data.email,
                        password: data.password
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        createdAt: true,
                        updatedAt: true,
                      },
        });
    };
     
}
export const userRepository = new UserRepository();


