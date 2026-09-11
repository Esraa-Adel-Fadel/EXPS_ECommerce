import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import type { Product } from "../types";
import { productService } from "../api/productService";
import { useCart } from "../context/CartContext";

export const ProductDetails = () => {
    const { addToCart } = useCart();
    const { id } = useParams();
    const navigate= useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
  
    useEffect(() => {
      const fetchProduct = async () => {
        if (!id) return;
  
        const data = await productService.getProductById(id);
  
        setProduct(data);
      };
  
      fetchProduct();
    }, [id]);
  
    if (!product) {
        return <div>Loading...</div>;
      }
      
      return (
        <section className="mx-auto w-4/5 py-12">
          <div className="grid gap-10 md:grid-cols-2">
            
            {/* Image */}
            <div className="overflow-hidden rounded-2xl bg-stone-100">
              <img
                src={product.imageURL}
                alt={product.title}
                className="h-full max-h-[600px] w-full object-cover"
              />
            </div>
      
            {/* Details */}
            <div className="flex flex-col justify-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-stone-400">
                {product.category?.name || "Furniture"}
              </span>
      
              <h1 className="mt-2 text-4xl font-bold text-stone-900">
                {product.title}
              </h1>
      
              <p className="mt-4 text-3xl font-extrabold text-stone-900">
                ${product.price}
              </p>
      
              <p className="mt-6 leading-7 text-stone-600">
                {product.description}
              </p>
      
              <p className="mt-6 text-sm text-stone-500">
                {product.stock > 0
                  ? `${product.stock} items available`
                  : "Out of stock"}
              </p>
      
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center rounded-lg border border-stone-300">
                <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-4 py-2 cursor-pointer"
                        >
                        −
                </button>
                  <span className="px-4">{quantity}</span>
                  <button
                        type="button"
                        onClick={() =>
                            setQuantity((q) => Math.min(product.stock ?? 1, q + 1))
                        }
                        className="px-4 py-2 cursor-pointer"
                        >
                        +
                    </button>
                </div>
      
                <button
                        type="button"
                        onClick={() => {
                            addToCart(product, quantity);
                            navigate("/Cart");
                        }}
                        className="cursor-pointer flex-1 rounded-xl bg-[#df5612] px-6 py-3 font-medium text-white transition hover:bg-[#c94d0f]"
                        >
                        Add to Cart
                </button>
              </div>
            </div>
      
          </div>
        </section>
      );
  };
