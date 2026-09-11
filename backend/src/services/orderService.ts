import { OrderStatus } from "@prisma/client";
import prisma from "../config/db.js";
import { orderRepository } from "../repositories/orderRepository.js";
import { AppError } from "../utils/appError.js";
import { createOrderInput } from "../validators/orderValidator.js";


export class OrderService{
    async createOrder(userId: string , data : createOrderInput){
        const itemsIds=data.items.map(item => item.productId);
        const products =await prisma.product.findMany({
            where :{
                id : {in : itemsIds},
            },
        });
        if(products.length !== data.items.length){
            throw new AppError( "One or more products were not found", 404)
        }
        let total = 0;
        const finalOrderItems = [];
            for (const item of data.items) {
                const product = products.find((p)=>p.id === item.productId);
                if(!product || product.stock < item.quantity){
                    throw new AppError( `Insufficient stock for product ${product?.title || "unknown"}`, 400); 
                }
                const itemTotal = product.price * item.quantity;
                total+=itemTotal;
                finalOrderItems.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                });
            }
            const order= await orderRepository.createOrder(userId,finalOrderItems,total );
            return order;
    }
    async getUserOrders(userId: string){
        return await orderRepository.findUserOrders(userId);
    }
    async getOrderById(userId: string , orderId : string ,role: string ){
        const order = await orderRepository.findOrderById(orderId);
        if (!order) {
            throw new AppError("Order not found", 404);
        }
        if (order.userId !== userId && role !== "ADMIN") {
            throw new AppError("You do not have permission to view this order", 403);
        }
        return order;
    }
    async getAllOrders(){
        return await orderRepository.findAllOrders();
    }
    async updateOrderStatus(orderId: string, status: OrderStatus) {
        const order = await orderRepository.findOrderById(orderId);

        if (!order) {
            throw new AppError("Order not found", 404);
        }

        return await orderRepository.updateStatus(orderId, status);
    }

};
export const orderService = new OrderService();