import prisma from "../config/db.js";
import { OrderStatus } from "@prisma/client";

export class OrderRepository{
    async createOrder(
        userId: string,
        items : { productId : string, quantity : number , price : number}[],
        total: number
        ){
        return await prisma.$transaction(async(tx)=>{
            for(const item of items){
                await tx.product.update({
                    where:{ id : item.productId},
                    data:{
                        stock:{
                            decrement: item.quantity,
                        }
                    }
                });
            }
            const order = await tx.order.create({
                data : {
                    total,
                    userId,
                    items:{
                        create: items.map((item)=>({
                              productId: item.productId,
                              price: item.price,
                              quantity: item.quantity,
                        })),
                    },
                },
                include :{
                    items: true,
                },
            });
            return order;
        });
    }
    async findUserOrders(userId : string){
        return await prisma.order.findMany({
            where :{ userId },
            include :{
                items: {
                    include:{ product : true},
                }
            }
        });
    }
    async findOrderById(id : string){
        return await prisma.order.findUnique({
            where :{ id },
            include :{
                items: {
                    include:{ product : true},
                }
            }
        });
    }
    async findAllOrders() {
        return await prisma.order.findMany({
            include: {
                user: { select: { id: true, name: true, email: true } },
                items: { include: { product: true } }
            }
        });
    }
    async updateStatus(id: string, status: OrderStatus) {
        return await prisma.order.update({
            where: { id },
            data: { status }
        });
    }

};
export const orderRepository=new OrderRepository();