"use client";

import getProducts from "@/services/getProducts";
import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import useAppStore from "@/store/AppStore";
import { Product } from "@/types/Types";

export default function Main() {
  const { setAllProducts } = useAppStore();
  const originalProducts = useRef<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      originalProducts.current = products;
      setAllProducts(products);
      setFilteredProducts(products);
      console.log(products);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredProducts(originalProducts.current);
      return;
    }

    const filteredProducts = originalProducts.current.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }, [search]);

  return (
    <>
      <main>
        <div className="w-full flex justify-center my-5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full md:w-1/2 rounded-lg border-2 border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 p-2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center gap-5">
          {filteredProducts.map((product) => (
            <div key={product.id} className="w-full h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
