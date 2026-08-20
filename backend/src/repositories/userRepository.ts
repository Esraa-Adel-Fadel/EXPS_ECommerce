import prisma from "../config/db.js";
import { User } from "../generated/prisma/index.js";
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

    async createUser ( data : CreateUserData): Promise<User | null>{
        return await prisma.user.create({
                    data: {
                        name :data.name,
                        email : data.email,
                        password: data.password
                    },
        });
    };
     
}
export const userRepository = new UserRepository();


