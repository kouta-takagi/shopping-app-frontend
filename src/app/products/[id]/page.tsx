"use client";

import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import type { ProductType } from "@/app/types/Product";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function ProductShow({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<ProductType | undefined>();
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const product: ProductType = await fetch(
        `http://localhost:3000/products/${id}`
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
      router.push(
        "http://localhost:3001/cart_items?message=カートに商品を追加しました"
      );
    } catch (e) {
      console.log("カートへの登録に失敗しました", e);
    }
  };

  return (
    <>
      <Header />

      <div>
        <h2 className="text-black ml-32">商品詳細</h2>
        {product ? (
          <div className="mx-36 border rounded-lg px-10 pt-6 pb-10 bg-white">
            <div className="font-bold">
              <p className="text-xl mb-4">{product.name}</p>
              <p className="text-lg mb-4">{Math.floor(product.price)}円</p>
            </div>
            <div className="">
              <label className="">数量：</label>
              <input
                type="number"
                min="1"
                value={count}
                onChange={(e) => handleChange(Number(e.target.value))}
                className="input bg-white border border-black mb-4"
              />
            </div>
            <button
              onClick={() => handlePost(product.id, count)}
              className="px-6 py-4 bg-blue-400 rounded-lg font-bold hover:bg-blue-600 transition-all duration-300 mt-2 text-black no-underline"
            >
              カートに追加
            </button>
          </div>
        ) : (
          <div className="text-black text-xl pb-8">Loading...</div>
        )}

        <div className="my-10">
          <Link
            href="/"
            className="mx-36 px-6 py-4 bg-blue-400 rounded-lg font-bold hover:bg-blue-600 transition-all duration-300 text-black no-underline"
          >
            一覧に戻る
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
