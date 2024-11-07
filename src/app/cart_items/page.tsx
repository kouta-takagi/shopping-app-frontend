"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CartItemType } from "@/app/types/CartItem";
import Header from "../components/header";
import Footer from "../components/footer";
import CartItem from "../components/cart_item";
// https://nextjs.org/docs/app/api-reference/functions/use-search-params#returns
import { useSearchParams } from "next/navigation";

export default function CartItemIndex() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

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

      <div className="mx-48">
        <h2 className="text-black">あなたのカート</h2>
        {message && <h3 className="text-black">{message}</h3>}
        <div className="border bg-white px-10 pt-10 pb-2 rounded-lg mt-10">
          {cartItems.length > 0 ? (
            cartItems.map((cartItem: CartItemType) => (
              <CartItem
                key={cartItem.id}
                id={cartItem.id}
                quantity={cartItem.quantity}
                product={cartItem.product}
                setCartItems={setCartItems}
              ></CartItem>
            ))
          ) : (
            <div className="text-black text-xl pb-8">カートは空です</div>
          )}
        </div>

        <div className="font-bold text-black my-10 text-lg">
          合計：{calcSum()}円
        </div>
        <Link
          href="/"
          className="px-6 py-4 bg-blue-400 rounded-lg font-bold hover:bg-blue-600 transition-all duration-300 mt-2 text-black mb-10 no-underline"
        >
          一覧に戻る
        </Link>
      </div>

      <Footer />
    </>
  );
}
