import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (filePath: string) => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "ecommerce/products",
  });

  return result.secure_url;
};