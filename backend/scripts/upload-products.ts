import { readdir } from "node:fs/promises";
import path from "node:path";
import cloudinary from "../src/config/cloudinary.js";

const imagesFolder = path.resolve("product-images");

async function uploadProductsImages() {
  try {
    const categories = await readdir(imagesFolder, {
      withFileTypes: true,
    });

    let uploadedCount = 0;

    for (const category of categories) {
      if (!category.isDirectory()) {
        continue;
      }

      const categoryPath = path.join(imagesFolder, category.name);

      const files = await readdir(categoryPath);

      const imageFiles = files.filter((file) =>
        /\.(jpg|jpeg|png|webp|avif)$/i.test(file)
      );

      console.log(`\n${category.name}: ${imageFiles.length} images`);

      for (const file of imageFiles) {
        const filePath = path.join(categoryPath, file);

        const result = await cloudinary.uploader.upload(filePath, {
          folder: `ecommerce/products/${category.name}`,
        });

        console.log(`${file} → ${result.secure_url}`);

        uploadedCount++;
      }
    }

    console.log(`\nUploaded ${uploadedCount} images successfully!`);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

uploadProductsImages();