"use client";

import Link from "next/link";
import type { ProductType } from "@/app/types/Product";

export default function Product({ id, name, price }: ProductType) {
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
    <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
      <Link
        href={`/products/${id}`}
        className="flex flex-col h-full no-underline text-gray-900"
      >
        <div className="text-lg font-semibold mb-2">{name}</div>
        <div className="text-xl font-bold mb-4">{Math.floor(price)}円</div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handlePost(id);
          }}
          className="mt-auto py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          カートに追加
        </button>
      </Link>
    </div>
  );
}
