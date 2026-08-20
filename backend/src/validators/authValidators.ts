import {z} from 'zod';

//helper for unkown value
const preprocessString=(val :unknown)=>
   val === undefined ? "":val;

   //userName Shema
   const userNameSchema=z.preprocess(
    preprocessString,
    z.string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    );
    //email Schema
    const emailSchema=z.preprocess(
        preprocessString,
        z.string()
        .min(1, "Email is required")
        .email("Invalid email format")
        .toLowerCase()
        );
    //password schema
    const passwordSchema=z.preprocess(
        preprocessString,
        z.string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Za-z]/ , "Password must contain at least one letter")
        .regex(/[0-9]/ , "Password must contain at least one number")
        );
    

export const registerSchema=z.object({
     name: userNameSchema,
     email: emailSchema,
     password: passwordSchema,
     confirmPassword: passwordSchema,
}).refine((data)=>data.password===data.confirmPassword,{
     message:"Passwords do not match",
     path: ["confirmPassword"],
});

export const loginSchema=z.object({
    email: emailSchema,
    password: z.preprocess(
        preprocessString,
        z.string().min(1, "Password is required")
      ),
});

export const changePasswordSchema=z.object({
    oldPassword:  z.preprocess(
        preprocessString,
        z.string()
        .min(1, "Old password is required")
      ),
    newPassword: passwordSchema,

}).refine((data)=>data.oldPassword===data.newPassword,{
    message:"New password must be different from old password",
    path: ["newPassword"],
});

export type registerInput = z.infer<typeof registerSchema>;
export type loginInput = z.infer<typeof loginSchema>;
export type changePasswordInput = z.infer<typeof changePasswordSchema>;