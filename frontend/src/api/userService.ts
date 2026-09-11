import { api } from "../api/axiosInstance";

export const userService = {
  getUserProfile: async () => {
    const response = await api.get("/users/profile");
    return response.data.user || response.data.data || response.data;
  },
};