import type { AuthResponse, User } from "../types";
import { api } from "./axiosInstance";

export interface LoginPayload{
    email: string;
    password?: string;
}
export interface RegisterPayload{
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
}
export const authService={
    login:async (credentials : LoginPayload): Promise<AuthResponse> => {
        const response= await api.post<AuthResponse>('/auth/login',credentials);
        return response.data;
    },
    register:async (credentials : RegisterPayload): Promise<AuthResponse> => {
        const response= await api.post<AuthResponse>('/auth/register',credentials);
        return response.data;
    },
    logout:async():Promise<void> =>{
        await api.post("/auth/logout");
    },
    getMe: async (): Promise <{user : User}>=>{
        const response = await api.get<{user : User}>("/users/profile");
        return response.data;
    },
};