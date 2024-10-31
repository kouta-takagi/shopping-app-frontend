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
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="flex justify-between items-center w-full max-w-5xl mx-auto px-6">
          <Link href="/" className="font-bold text-2xl">
            通販アプリ
          </Link>
          <Link href="/cart_items">
            <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />
          </Link>
        </div>
      </header>

      <main className="my-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-bold text-3xl mb-8 text-gray-800">商品一覧</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products ? (
              products.map((product: ProductType) => (
                <div
                  key={product.id}
                  className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
                >
                  <Link
                    href={`/products/${product.id}`}
                    className="flex flex-col h-full no-underline text-gray-900"
                  >
                    <div className="text-lg font-semibold mb-2">
                      {product.name}
                    </div>
                    <div className="text-xl font-bold mb-4">
                      {Math.floor(product.price)}円
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handlePost(product.id);
                      }}
                      className="mt-auto py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      カートに追加
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-blue-600 text-white py-6 mt-12">
        <div className="text-center">&copy; 2024 通販アプリ</div>
      </footer>
    </>
  );
}
