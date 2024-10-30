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
                <div>数量：{cart_item.quantity}</div>
              </Link>
            </div>
          );
        })}
      </div>
      <div>合計：{calcSum()}</div>
    </>
  );
}
