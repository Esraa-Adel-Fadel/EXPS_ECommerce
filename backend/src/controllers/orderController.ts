import { NextFunction , Request , Response} from "express";
import { OrderService, orderService } from "../services/orderService.js";
import { AppError } from "../utils/appError.js";
import { createOrderSchema } from "../validators/orderValidator.js";

export class OrderController{
    async createOrder(req : Request, res: Response,next: NextFunction){
            try {
                if (!req.user?.userId) {
                    throw new AppError("Unauthorized", 401);
                }
                const userId =req.user?.userId;
                const validation = createOrderSchema.safeParse(req.body);
                if (!validation.success) {
                    return res.status(400).json({
                        status: "fail",
                        errors: validation.error.flatten().fieldErrors,
                    });
                }
                const order = await orderService.createOrder(userId,validation.data);
                return res.status(201).json({
                    status: "success",
                    data: { order },
                }); 
            } catch (err) {
                next(err);
            }
    }
    async getMyOrders(req : Request, res: Response,next: NextFunction){
        try {
            const userId =req.user?.userId;
            if (!req.user?.userId) {
                throw new AppError("Unauthorized", 401);
            }
            const orders = await orderService.getUserOrders(userId);
            return res.status(200).json({
                status: "success",
                 orders,
            }); 
            
        } catch (err) {
            next(err);
        }
    }
    async getOrderById(req : Request, res: Response,next: NextFunction){
        try {
            const orderId = req.params.id as string;
            const userId = req.user?.userId;
            if (!req.user?.userId) {
                throw new AppError("Unauthorized", 401);
            }
            const userRole = req.user?.role;
            const orderDetails = await orderService.getOrderById(userId, orderId , userRole);
            return res.status(200).json({
                status: "success",
                orderDetails,
            }); 
            
        } catch (err) {
            next(err);
        }
    }
    async getAllOrders(req : Request, res: Response,next: NextFunction){
        try {
            const allOrders= await orderService.getAllOrders();
            return res.status(200).json({
                status: "success",
                allOrders,
            }); 
            
        } catch (err) {
            next(err);  
        }
    }
    async updateOrderStatus(req : Request, res: Response,next: NextFunction){
            try {
                const orderId= req.params.id as string;
                const status= req.body.status;
                const order= await orderService.updateOrderStatus(orderId , status);
                return res.status(200).json({
                    status: "success",
                    order,
                }); 
                
            } catch (err) {
                next(err);
            }
    }

};
export const orderController = new OrderController();