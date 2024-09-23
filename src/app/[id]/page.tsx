"use client";

import Image from "next/image";
import ProductImage from "@/assets/images/product.svg";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAppStore from "@/store/AppStore";
import { Product } from "@/types/Types";
import getProducts from "@/services/getProducts";

export default function ProductComponent() {
  const { id } = useParams();
  const { allProducts, setAllProducts, shop, setShop } = useAppStore();
  const [productDetail, setProduct] = useState<Product>();

  useEffect(() => {
    if (allProducts.length === 0) {
      const fetchProducts = async () => {
        const products = await getProducts();
        setAllProducts(products);
        console.log(products);
      };

      fetchProducts();
    }
    const findProduct = allProducts.find((product) => product.id == Number(id));
    setProduct(findProduct);
  }, [id, allProducts]);

  function addToShop(product: Product) {
    const productAlreadyInShop = shop.find(
      (shopProduct) => shopProduct.product.id === product.id
    );
    if (productAlreadyInShop) {
      return;
    }
    setShop({
      product,
      amountToBuy: 1,
    });
    console.log(shop);
  }

  return (
    <>
      {productDetail ? (
        <div className="h-full flex flex-col justify-between p-5 bg-white dark:bg-gray-800 dark:border-gray-700">
          <a className="flex justify-center">
            <Image
              className="rounded-t-lg"
              src={ProductImage}
              alt="Product"
              height={100}
              width={100}
            />
          </a>
          <div className="p-5">
            {productDetail.amount <= 0 && (
              <p className="mb-3 font-normal dark:text-gray-400 text-yellow-600">
                OUT OF STOCK
              </p>
            )}
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {productDetail.name}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {productDetail.description}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {productDetail.price}
            </p>
            <div className="flex justify-center">
              <a
                href="#"
                className="w-full md:w-1/2 flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => addToShop(productDetail)}
              >
                Buy
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <h1>Product Not Found</h1>
      )}
    </>
  );
}
