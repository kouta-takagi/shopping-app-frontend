"use client";

import type { ProductType } from "@/app/types/Product";
import Link from "next/link";
import { useEffect, useState } from "react";

type ProductProps = {
  params: {
    id: number;
  };
};

export default function ProductShow({ params }: ProductProps) {
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

  const handleChange = (value: any) => {
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
      console.log("カートへの登録に成功しました");
    } catch (e) {
      console.log("カートへの登録に失敗しました", e);
    }
  };

  return (
    <div className="my-8 mx-60">
      <div>商品詳細</div>
      {product ? (
        <>
          <div className="flex justify-between py-8 px-16 bg-white rounded-lg">
            <div>{product.name}</div>
            <div>{Math.floor(product.price)}円</div>
            <p>
              数量：{" "}
              <input
                type="number"
                value={count}
                onChange={(e) => handleChange(e.target.value)}
              />
            </p>
            <button onClick={() => handlePost(product.id, count)}>
              カートに追加
            </button>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}

      <Link href="/" className="text-black mt-10">
        一覧に戻る
      </Link>
    </div>
  );
}
