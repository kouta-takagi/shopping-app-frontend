"use client";

import Link from "next/link";
import type { CartItemType } from "@/app/types/CartItem";

type CartItemProps = CartItemType & {
  setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>;
};

export default function CartItem({
  id,
  quantity,
  product,
  setCartItems,
}: CartItemProps) {
  const handleChange = async (value: number, cartItemId: number) => {
    if (value > 0) {
      try {
        const res = await fetch(
          `http://localhost:3000/cart_items/${cartItemId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: cartItemId, quantity: value }),
          }
        );

        const data = await res.json();
        setCartItems(data);
      } catch (e) {
        console.log("カートへの編集に失敗しました", e);
      }
    }
  };

  const handleDelete = async (cartItemId: number) => {
    try {
      const res = await fetch(
        `http://localhost:3000/cart_items/${cartItemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: cartItemId }),
        }
      );

      const data = await res.json();
      setCartItems(data);
    } catch (e) {
      console.log("カート商品の削除に失敗しました", e);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
      <Link
        href={`/products/${product.id}`}
        className="flex justify-between items-center no-underline text-gray-900 mb-4"
      >
        <div className="text-lg font-semibold">{product.name}</div>
        <div className="text-xl font-bold">{Math.floor(product.price)}円</div>
      </Link>
      <div className="flex items-center space-x-4">
        <label className="text-gray-700 font-medium">数量：</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => handleChange(Number(e.target.value), id)}
          className="w-16 px-2 py-1 border rounded"
        />
        <button
          onClick={() => handleDelete(id)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          削除
        </button>
      </div>
    </div>
  );
}
