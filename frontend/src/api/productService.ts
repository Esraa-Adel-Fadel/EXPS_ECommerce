import type { Category, Product } from "../types";
import { api } from "./axiosInstance";

export interface ProductQueryParams {
    categoryId?: string;
    search?: string;
}
export const productService = {
    getProducts: async (params?: ProductQueryParams) => {
        const response = await api.get<{
            status: string;
            data: Product[];
        }>("/products", { params });
    
        return response.data.data;
    },
    getCategories: async () => {
        const response = await api.get<{
            status: string;
            categories: Category[];
        }>("/categories");
        return response.data.categories;
    },
    getProductById: async (id: string) => {
        const response = await api.get<{ status: string; data: Product }>(`/products/${id}`);
        return response.data.data;
      },
};