import { api } from "./axiosInstance";
import type { Product } from "../types";

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  revenue: number;
}

export interface AdminOrder {
  id: string;
  userEmail: string;
  totalAmount: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name?: string;
  role: "USER" | "ADMIN";
  createdAt: string;
}

export interface ProductFormData {
  title: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  categoryId: string;
}

export const adminService = {
  getOrders: async () => {
    try {
      const response = await api.get("/orders/admin/all");

      const result =
        response.data.allOrders ||
        response.data.data ||
        response.data.orders ||
        response.data;

      return Array.isArray(result) ? result : [];
    } catch (error: any) {
      return [];
    }
  },

  getUsers: async () => {
    const response = await api.get<{
      status: string;
      data: AdminUser[];
    }>("/users/admin/users");

    return response.data.data;
  },

  deleteProduct: async (id: string) => {
    const response = await api.delete<{
      status: string;
      message: string;
    }>(`/products/${id}`);

    return response.data;
  },

  createProduct: async (productData: ProductFormData) => {
    const response = await api.post<{
      status: string;
      data: Product;
    }>("/products", productData);

    return response.data.data;
  },

  updateProduct: async (
    id: string,
    productData: Partial<ProductFormData>
  ) => {
    const response = await api.patch<{
      status: string;
      data: Product;
    }>(`/products/${id}`, productData);

    return response.data.data;
  },
};