"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import type { ProductType } from "@/app/types/Product";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetch("http://localhost:3000/products").then(
        (res) => res.json()
      );

      setProducts(products);
    };

    fetchProducts();
  }, []);

  const handlePost = async (productId: number) => {
    try {
      await fetch("http://localhost:3000/cart_items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });
      console.log("カートへの登録に成功しました");
    } catch (e) {
      console.log("カートへの登録に失敗しました", e);
    }
  };

  return (
    <>
      <header>
        <div className="flex justify-between w-full px-6 pt-4">
          <Link href="/" className="font-bold text-xl no-underline text-black">
            通販アプリ
          </Link>
          <Link href="/cart_items">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="size-6 text-black"
            />
          </Link>
        </div>
      </header>

      <div className="my-20">
        <div className="mx-20 font-bold text-2xl">商品一覧</div>
        {products ? (
          products.map((product: ProductType) => {
            return (
              <div
                key={product.id}
                className="py-8 px-16 my-8 mx-60 bg-white hover:bg-slate-200 rounded-lg"
              >
                <Link
                  href={`products/${product.id}`}
                  className="flex justify-between no-underline text-black"
                >
                  <div>{product.name}</div>
                  <div>{Math.floor(product.price)}円</div>
                </Link>
                <button onClick={() => handlePost(product.id)}>
                  カートに追加
                </button>
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <footer></footer>
    </>
  );
}
