import {z} from "zod";

export const orderItemSchema= z.object({
    productId: z.string().uuid("Invalid product ID"),
    quantity: z.number().int().positive("Quantity must be at least 1"),
 });
 export const createOrderSchema=z.object({
    items: z.array(orderItemSchema).min(1, "Order must contain at least one item"),
 });

export type createOrderInput = z.infer<typeof createOrderSchema>;