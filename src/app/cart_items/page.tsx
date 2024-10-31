"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CartItemType } from "@/app/types/CartItem";

export default function CartItemIndex() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cart_items = await fetch("http://localhost:3000/cart_items").then(
        (res) => res.json()
      );
      setCartItems(cart_items);
    };

    fetchCartItems();
  }, []);

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

  function calcSum() {
    const sum = cartItems.reduce(
      (sum, current) => sum + current.product.price * current.quantity,
      0
    );

    return sum;
  }

  return (
    <>
      <div className="mx-20 font-bold text-2xl">あなたのカート</div>
      <div>
        {cartItems.map((cart_item: CartItemType) => {
          return (
            <div
              key={cart_item.id}
              className="py-8 px-16 my-8 mx-60 bg-white hover:bg-slate-200 rounded-lg"
            >
              <Link
                href={`products/${cart_item.product.id}`}
                className="flex justify-between no-underline text-black"
              >
                <div>{cart_item.product.name}</div>
                <div>{Math.floor(cart_item.product.price)}円</div>
              </Link>
              <div>
                数量：{" "}
                <input
                  type="number"
                  value={cart_item.quantity}
                  onChange={(e) =>
                    handleChange(Number(e.target.value), cart_item.id)
                  }
                />
                個
              </div>
              <button onClick={() => handleDelete(cart_item.id)}>削除</button>
            </div>
          );
        })}
      </div>
      <div>合計：{calcSum()}円</div>
      <Link href="/" className="text-black mt-10">
        一覧に戻る
      </Link>
    </>
  );
}
