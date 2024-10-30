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

  useEffect(() => {
    const fetchProduct = async () => {
      const product: ProductType = await fetch(
        `http://localhost:3000/products/${params.id}`
      ).then((res) => res.json());
      setProduct(product);
    };

    fetchProduct();
  }, []);

  return (
    <div className="my-8 mx-60">
      <div>商品詳細</div>
      {product ? (
        <div className="flex justify-between py-8 px-16 bg-white rounded-lg">
          <div>{product.name}</div>
          <div>{Math.floor(product.price)}円</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      <Link href="/" className="text-black mt-10">
        一覧に戻る
      </Link>
    </div>
  );
}
