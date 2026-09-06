import { NextFunction , Request, Response} from "express";
import { categoryService } from "../services/categoryService.js";
import { createCategorySchema, updateCategorySchema } from "../validators/categoryValidator.js";

export class CategoryController{
    async getAll(req : Request, res: Response, next : NextFunction){
          try {
            const categories= await categoryService.findAllCategories();
            return res.status(200).json({
                status: "success",
                categories
            });
          } catch (err) {
            next(err);
          }
    }
    async getOne(req : Request, res: Response, next : NextFunction){
        try {
            const id = req.params.id as string;
            const category= await categoryService.findOneCategory(id);
            return res.status(200).json({
                status: "success",
                category
            });
        } catch (err) {
          next(err);
        }
    }
    async create(req : Request, res: Response, next : NextFunction){
        try {
            const validation= createCategorySchema.safeParse(req.body);
            if(!validation.success){
                 return res.status(400).json({
                      status: "fail",
                      errors: validation.error.flatten().fieldErrors,
                 });
            }
            const category= await categoryService.createCategory(validation.data);
            return res.status(201).json({
                status: "success",
                category
            });
        } catch (err) {
          next(err);
        }
     }
     async update(req : Request, res: Response, next : NextFunction){
        try {
            const id= req.params.id as string;
            const validation= updateCategorySchema.safeParse(req.body);
            if(!validation.success){
                 return res.status(400).json({
                      status: "fail",
                      errors: validation.error.flatten().fieldErrors,
                 });
            }
            const category= await categoryService.updateCategory(id , validation.data);
            return res.status(200).json({
                status: "success",
                category
            });
        } catch (err) {
          next(err);
        }
     }
     async delete(req : Request, res: Response, next : NextFunction){
        try{
        const id= req.params.id as string;
        const category= await categoryService.deleteCategory(id);
            return res.status(200).json({
                status: "success",
                category
            });
        } catch (err) {
          next(err);
        }
     }

};
export const categoryController=new CategoryController();