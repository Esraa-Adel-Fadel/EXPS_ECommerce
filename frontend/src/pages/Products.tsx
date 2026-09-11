import { useEffect, useState } from "react";
import type { Product } from "../types";
import { productService } from "../api/productService";
import { ProductCard } from "../components/ProductCard";

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productService.getProducts({ search,});

      setProducts(data);
    };

    fetchProducts();
  },  [search]);

  const categories = [
    ...new Set(products.map((product) => product.category?.name)),
  ];

  return (
    <>
      <section className="mx-auto w-4/5 py-12">
        <h1 className="mb-12 text-center text-4xl font-bold text-gray-900">
          Explore Our Products
        </h1>
        {/* search input */}
        <div className="mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
      </div>

        {categories.map((category) => (
          <div key={category} className="mb-14">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              {category}
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 wrap-anywhere">
              {products
                .filter((product) => product.category?.name === category)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
