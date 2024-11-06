"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CartItemType } from "@/app/types/CartItem";
import Header from "../components/header";
import Footer from "../components/footer";
import CartItem from "../components/cart_item";

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
      <Header />

      <main className="my-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-bold text-3xl mb-8 text-gray-800">
            あなたのカート
          </h2>
          <div className="grid gap-8">
            {cartItems.length > 0 ? (
              cartItems.map((cartItem: CartItemType) => (
                <CartItem
                  key={cartItem.id}
                  id={cartItem.id}
                  quantity={cartItem.quantity}
                  product={cartItem.product}
                ></CartItem>
              ))
            ) : (
              <div className="text-gray-700">カートは空です</div>
            )}
          </div>

          <div className="mt-8 text-xl font-semibold text-gray-800">
            合計：{calcSum()}円
          </div>
          <Link
            href="/"
            className="inline-block mt-10 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            一覧に戻る
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
