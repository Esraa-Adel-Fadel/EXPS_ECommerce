import { productRepository } from "../repositories/productRepository.js";
import { AppError } from "../utils/appError.js";
import { createProductInput, updateProductInput } from "../validators/productValidator.js";

export class ProductService{
    async getAllProducts(categoryId?: string, search?: string){
        return await productRepository.findAllProducts(categoryId, search);
    }
    async getProductById(id: string){
        const product = await productRepository.findById(id);
        if(!product){
            throw new AppError("Product not found",404);
        }
        return product;
    }
    async createProduct(data : createProductInput){
        return await productRepository.createProduct(data);
    }
    async updateProduct(id : string ,data : updateProductInput){
            await this.getProductById(id);
            return await productRepository.updateProduct(id , data);
    }
    async deleteProduct(id: string){
        await this.getProductById(id);
        return await productRepository.deleteProduct(id);
    }

};
export const productService = new ProductService();