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
    <div>
      <Link
        href={`/products/${product.id}`}
        className="text-black no-underline"
      >
        <div className="text-xl mb-4 font-bold">{product.name}</div>
        <div className="text-lg mb-4">{Math.floor(product.price)}円</div>
      </Link>
      <div>
        <label>数量：</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => handleChange(Number(e.target.value), id)}
          className="input bg-white border border-black mb-2"
        />
        <br />
        <button
          onClick={() => handleDelete(id)}
          className="px-6 py-2 bg-red-500 rounded-lg font-bold hover:bg-red-700 transition-all duration-300 mt-2 text-black mb-10"
        >
          削除
        </button>
      </div>
    </div>
  );
}
