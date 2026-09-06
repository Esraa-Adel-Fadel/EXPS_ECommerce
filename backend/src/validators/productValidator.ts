import z from "zod";

const preprocessString=(val :unknown)=>
   val === undefined ? "":val;

const titleSchema=z.preprocess(
    preprocessString,
    z.string()
    .min(1 , "Title is required")
    .min(3 , "Title must be at least 3 characters")
);
export const createProductSchema=z.object({
    title: titleSchema,
    price: z.number().positive(),
    stock:z.number().nonnegative(),
    description:z.string().min(10,"Description must be at least 10 characters"),
    isAvailable:z.boolean().optional(),
    imageURL:z.string().url(),
    categoryId:z.string().uuid(),   
});
export const updateProductSchema=createProductSchema.partial();

export type createProductInput=z.infer<typeof createProductSchema>;
export type updateProductInput=z.infer<typeof updateProductSchema>;