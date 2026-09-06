import { NextFunction, Request , Response } from "express";
import { createProductSchema, updateProductSchema } from "../validators/productValidator.js";
import { productService } from "../services/productService.js";

export class ProductController{
    async getAll(req: Request , res: Response , next: NextFunction){
        try {
            const products= await productService.getAllProducts();
            return res.status(200).json({
                status : "success",
                data: products,
            });
        } catch (err) {
            next(err);
        }
    }
    async getOne(req: Request , res: Response , next: NextFunction){
        try {
            const id = req.params.id as string;
            const product= await productService.getProductById(id);
            return res.status(200).json({
                status : "success",
                data: product,
            });
        } catch (err) {
            next(err);
        }
    }
    async create(req: Request , res: Response , next: NextFunction){
        try {
            const validation= createProductSchema.safeParse(req.body);
            if(!validation.success){
                return res.status(400).json({
                    errors: validation.error.flatten().fieldErrors,
                });
            }
            const product= await productService.createProduct(validation.data);
            return res.status(201).json({
                status : "success",
                data: product,
            });
        } catch (err) {
            next(err);
        }
    }
    async update(req: Request , res: Response , next: NextFunction){
        try {
            const id = req.params.id as string;
            const validation= updateProductSchema.safeParse(req.body);
            if(!validation.success){
                return res.status(400).json({
                    errors: validation.error.flatten().fieldErrors,
                });
            }
            const product= await productService.updateProduct(id,validation.data);
            return res.status(200).json({
                status : "success",
                data: product,
            });
        } catch (err) {
            next(err);
        }
    }
    async delete(req: Request , res: Response , next: NextFunction){
        try {
            const id = req.params.id as string;
            const product= await productService.deleteProduct(id);
            return res.status(200).json({
                status : "success",
                data: product,
            });
        } catch (err) {
            next(err);
        }
    }


};
export const productController=new ProductController();