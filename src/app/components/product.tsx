"use client";

import Link from "next/link";
import type { ProductType } from "@/app/types/Product";
import { useRouter } from "next/navigation";

export default function Product({ id, name, price }: ProductType) {
  const router = useRouter();

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
      router.push(
        "http://localhost:3001/cart_items?message=カートに商品を追加しました"
      );
    } catch (e) {
      console.log("カートへの登録に失敗しました", e);
    }
  };

  return (
    <div className="border bg-white p-4 rounded-lg ">
      <Link href={`/products/${id}`} className="no-underline">
        <div className="text-black font-bold">{name}</div>
        <div className="text-black">{Math.floor(price)}円</div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handlePost(id);
          }}
          className="px-6 py-4 bg-blue-400 rounded-lg font-bold hover:bg-blue-600 transition-all duration-300 mt-2 text-black"
        >
          カートに追加
        </button>
      </Link>
    </div>
  );
}
