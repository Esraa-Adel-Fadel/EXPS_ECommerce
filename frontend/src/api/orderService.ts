import type { CreateOrderInput, Order } from "../types";
import { api } from "./axiosInstance";

export const orderService = {
    createOrder: async (data: CreateOrderInput) => {
        const response = await api.post<{
            status: string;
            data: {
                order: Order;
            };
        }>("/orders", data);

        return response.data.data.order;
    },
    getMyOrders: async () => {
        const response = await api.get<{
            status: string;
            orders: Order[];
        }>("/orders/my-orders");

        return response.data.orders;
    },
};