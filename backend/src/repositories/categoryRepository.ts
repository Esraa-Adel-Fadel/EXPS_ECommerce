import prisma from "../config/db.js";
import { createCategoryInput, updateCategoryInput } from "../validators/categoryValidator.js";

export class CategoryRepository{
    async create(data : createCategoryInput){
        return await prisma.category.create({ data });
    }
    async update(id: string ,data : updateCategoryInput){
        return await prisma.category.update({
            where:{ id },
             data 
            });
    }
    async findAll(){
        return await prisma.category.findMany({
            include: {
                products: true,
              },
        });
    }
    async findById(id: string){
        return await prisma.category.findUnique({
            where:{ id },
            include: {
                products: true,
              },
        });
    }
    async delete(id: string){
        return await prisma.category.delete({
            where:{ id },
        });
    }

};

export const categoryRepository= new CategoryRepository();