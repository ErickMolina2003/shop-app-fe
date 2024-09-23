"use client";

import Image from "next/image";
import ProductImage from "@/assets/images/product.svg";
import { Product } from "@/types/Types";
import useAppStore from "@/store/AppStore";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  const { setShop, shop } = useAppStore();
  const router = useRouter();

  function addToShop(product: Product) {
    console.log(product);
    console.log(shop);
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
      <div className="h-full flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
          {product.amount <= 0 && (
            <p className="mb-3 font-normal dark:text-gray-400 text-yellow-600">
              OUT OF STOCK
            </p>
          )}
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {product.name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {product.description}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            ${product.price}
          </p>
          <div className="flex justify-center gap-2">
            <a
              className="w-full flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-300 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => router.push(`/${product.id}`)}
              role="button"
            >
              See More
            </a>
            <a
              className="w-full flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => addToShop(product)}
              role="button"
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
    </>
  );
}
