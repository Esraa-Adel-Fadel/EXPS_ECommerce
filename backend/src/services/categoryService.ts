import { categoryRepository } from "../repositories/categoryRepository.js";
import { AppError } from "../utils/appError.js";
import { createCategoryInput, updateCategoryInput } from "../validators/categoryValidator.js";

export class CategoryService{
     async findAllCategories(){
          return await categoryRepository.findAll();
     }
     async findOneCategory(id : string){
          const category = await categoryRepository.findById(id); 
          if(!category){
            throw new AppError("Category not found",404);
          }
        return category;
     } 
     async createCategory(data : createCategoryInput){
          return await categoryRepository.create(data);
     }
     async updateCategory(id : string , data : updateCategoryInput){
        await this.findOneCategory(id);
        return await categoryRepository.update(id , data);
     }
     async deleteCategory(id : string){
        await this.findOneCategory(id);
        return await categoryRepository.delete(id);
     }
  
};
export const categoryService=new CategoryService();