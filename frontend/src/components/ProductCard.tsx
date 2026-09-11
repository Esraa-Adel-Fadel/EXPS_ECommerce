import React from "react";
import type { Product } from "../types/index";
import { Link } from "react-router-dom";
import { optimizeImage } from "../utils/cloudinary";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">

      {/* Product details */}
      <Link
        to={`/products/${product.id}`}
        className="group block"
      >
        <div className="relative h-64 overflow-hidden bg-stone-100">
          <img
            src={optimizeImage(product.imageURL)}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="p-5 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            {product.category?.name || "Furniture"}
          </span>

          <h3 className="mt-1 line-clamp-1 text-lg font-bold text-stone-800 transition-colors group-hover:text-[#df5612]">
            {product.title}
          </h3>

          <p className="mt-2 text-2xl font-extrabold text-stone-900">
            ${product.price}
          </p>
        </div>
      </Link>

    </div>
  );
};