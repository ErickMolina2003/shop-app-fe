"use client";

import useAppStore from "@/store/AppStore";
import Image from "next/image";
import ProductImage from "@/assets/images/product.svg";
import ChevLeft from "@/assets/images/chevLeft.svg";
import { useRouter } from "next/navigation";
import BuyProducts from "@/services/buyProducts";
import DeleteImg from "@/assets/images/deleteImg.svg";
import AddImg from "@/assets/images/addImg.svg";
import RemoveImg from "@/assets/images/removeImage.svg";
import { Product, ShopStore } from "@/types/Types";

export default function ShopComponent() {
  const { shop, alterShop, clearShop } = useAppStore();
  const router = useRouter();

  async function buyProducts() {
    const response = await BuyProducts(shop);
    console.log("esta es la respuesta ", response);
    if (response.status === 200) {
      clearShop();
      router.push("/success");
    }
  }

  function deleteProduct(product: Product) {
    const productAlreadyInShop = shop.find(
      (shopProduct) => shopProduct.product.id === product.id
    );
    if (productAlreadyInShop) {
      const newShop = shop.filter(
        (shopProduct) =>
          shopProduct.product.id !== productAlreadyInShop.product.id
      );
      alterShop(newShop);
    }
  }

  function editShopProduct(product: ShopStore, editAmount: number) {
    const productAlreadyInShop = shop.find(
      (shopProduct) => shopProduct.product.id === product.product.id
    );
    if (productAlreadyInShop) {
      if (productAlreadyInShop.amountToBuy <= 1 && editAmount === -1) return;

      const newShop = shop.map((shopProduct) => {
        if (shopProduct.product.id === product.product.id) {
          return {
            ...shopProduct,
            amountToBuy: product.amountToBuy + editAmount,
          };
        }
        return shopProduct;
      });
      alterShop(newShop);
    }
  }

  return (
    <>
      <main className="h-screen flex flex-col items-center justify-center">
        <div className="w-full mt-5 border-b border-gray-300">
          <a onClick={() => router.push("/")}>
            <Image src={ChevLeft} width={20} height={20} alt="back" />
          </a>
          <h1 className="text-center">Products</h1>
        </div>
        <div className="w-full flex flex-col flex-grow my-5">
          {shop.length > 0 ? (
            shop.map((product) => (
              <div
                key={product.product.id}
                className="flex justify-between items-center border-b border-gray-300 py-2"
              >
                <div className="flex justify-center items-center">
                  <Image
                    src={DeleteImg}
                    width={50}
                    height={50}
                    alt="delete"
                    role="button"
                    onClick={() => deleteProduct(product.product)}
                  />
                  <Image
                    className="rounded-t-lg"
                    src={ProductImage}
                    alt="Product"
                    height={100}
                    width={100}
                  />
                </div>
                <div className="flex flex-col md:flex-grow md:flex-row md:justify-between justify-center items-center gap-5">
                  <div className="md:ml-5">
                    <h2>{product.product.name}</h2>
                    <p>{product.product.description}</p>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <div className="flex justify-center items-center gap-2">
                      <Image
                        src={RemoveImg}
                        width={30}
                        height={30}
                        alt="remove"
                        onClick={() => editShopProduct(product, -1)}
                      />
                      <h2>{product.amountToBuy}</h2>
                      <Image
                        src={AddImg}
                        width={30}
                        height={30}
                        alt="add"
                        onClick={() => editShopProduct(product, +1)}
                      />
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <h2>
                        Total: ${product.product.price * product.amountToBuy}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <h1>No products in your shop</h1>
            </div>
          )}
        </div>
        <div className="w-full flex flex-col gap-5 mb-5">
          <div className="flex justify-end">
            <h1>
              Total: ${shop.reduce((acc, curr) => acc + curr.product.price, 0)}
            </h1>
          </div>
          <button
            className="w-full rounded-lg bg-green-200 py-3"
            onClick={buyProducts}
          >
            Buy Products
          </button>
        </div>
      </main>
    </>
  );
}
