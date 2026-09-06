import prisma from "../config/db.js";
import { createProductInput, updateProductInput } from "../validators/productValidator.js";
export class ProductRepository{
    async findAllProducts(){
        return await prisma.product.findMany({
            include:{ category: true },
            orderBy:{
                createdAt:"desc",
            }
        });
    }
    async findById(id :string){
        return await prisma.product.findUnique({
            where:{
                 id: id,
            },
            include: { category: true }
        });
    }
    async createProduct(data : createProductInput){
        return await prisma.product.create({
            data:data,
        });
    }
    async updateProduct(id : string ,data : updateProductInput){
        return await prisma.product.update({
            where:{
                id,
            },
            data:data,
        });
    }
    async deleteProduct(id:string){
        return await prisma.product.delete({
            where:{
                id,
            }
        });

    }

};
export const productRepository= new ProductRepository();