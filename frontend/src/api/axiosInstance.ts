import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": 'application/json',
    },
    timeout: 10000,
    withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
      const originalRequest =
          error.config as InternalAxiosRequestConfig & {
              _retry?: boolean;
          };

          if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/auth/login") &&
            !originalRequest.url?.includes("/auth/register") &&
            !originalRequest.url?.includes("/auth/refresh")
          ) {
          originalRequest._retry = true;

          try {
              await api.post("/auth/refresh");

              return api(originalRequest);
          } catch (refreshError) {
              return Promise.reject(refreshError);
          }
      }

      return Promise.reject(error);
  }
);