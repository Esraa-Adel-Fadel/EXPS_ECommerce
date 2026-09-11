import { createContext, useContext, useEffect, useState } from "react";
import {
  authService,
  type LoginPayload,
  type RegisterPayload,
} from "../api/authService";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authService.getMe();
        setUser(res.user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);
  const login = async (credentials: LoginPayload) => {
    const res = await authService.login(credentials);
    setUser(res.user);
  };
  const register = async (data: RegisterPayload) => {
    await authService.register(data);
  };
  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
