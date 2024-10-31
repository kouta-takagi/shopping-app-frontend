"use client";

import type { ProductType } from "@/app/types/Product";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

type ProductProps = {
  params: {
    id: number;
  };
};

export default function ProductShow({ params }: ProductProps) {
  const router = useRouter();
  const [product, setProduct] = useState<ProductType | undefined>();
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const product: ProductType = await fetch(
        `http://localhost:3000/products/${params.id}`
      ).then((res) => res.json());
      setProduct(product);
    };

    fetchProduct();
  }, []);

  const handleChange = (value: number) => {
    if (value > 0) {
      setCount(value);
    }
  };

  const handlePost = async (productId: number, count: number) => {
    try {
      await fetch("http://localhost:3000/cart_items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: productId, quantity: count }),
      });
      router.push("http://localhost:3001/cart_items");
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
          <h2 className="font-bold text-3xl mb-8 text-gray-800">商品詳細</h2>
          {product ? (
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
              <div className="flex justify-between items-center mb-4">
                <p className="text-2xl font-semibold text-black">
                  {product.name}
                </p>
                <p className="text-xl font-bold">
                  {Math.floor(product.price)}円
                </p>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <label className="text-gray-700 font-medium">数量：</label>
                <input
                  type="number"
                  min="1"
                  value={count}
                  onChange={(e) => handleChange(Number(e.target.value))}
                  className="w-16 px-2 py-1 border rounded"
                />
              </div>
              <button
                onClick={() => handlePost(product.id, count)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                カートに追加
              </button>
            </div>
          ) : (
            <div className="text-gray-700">Loading...</div>
          )}

          <Link
            href="/"
            className="inline-block mt-10 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            一覧に戻る
          </Link>
        </div>
      </main>

      <footer className="bg-blue-600 text-white py-6 mt-12">
        <div className="text-center">&copy; 2024 通販アプリ</div>
      </footer>
    </>
  );
}
