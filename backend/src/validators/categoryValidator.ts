import {z} from 'zod';

export const createCategorySchema= z.object({
    name: 
    z.string()
    .min(1 , "Category name is required !")
    .min(3 , "Category name must be at least 3 characters ")
});
export const updateCategorySchema= createCategorySchema.partial();
export type createCategoryInput= z.infer <typeof createCategorySchema>;
export type updateCategoryInput = z.infer <typeof updateCategorySchema>;