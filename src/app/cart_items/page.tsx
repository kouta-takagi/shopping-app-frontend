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
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="flex justify-between items-center w-full max-w-5xl mx-auto px-6">
          <Link href="/" className="font-bold text-2xl">
            通販アプリ
          </Link>
          <Link href="/cart_items">
            <span className="text-lg">カート</span>
          </Link>
        </div>
      </header>

      <main className="my-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-bold text-3xl mb-8 text-gray-800">
            あなたのカート
          </h2>
          <div className="grid gap-8">
            {cartItems.length > 0 ? (
              cartItems.map((cartItem: CartItemType) => (
                <div
                  key={cartItem.id}
                  className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
                >
                  <Link
                    href={`/products/${cartItem.product.id}`}
                    className="flex justify-between items-center no-underline text-gray-900 mb-4"
                  >
                    <div className="text-lg font-semibold">
                      {cartItem.product.name}
                    </div>
                    <div className="text-xl font-bold">
                      {Math.floor(cartItem.product.price)}円
                    </div>
                  </Link>
                  <div className="flex items-center space-x-4">
                    <label className="text-gray-700 font-medium">数量：</label>
                    <input
                      type="number"
                      min="1"
                      value={cartItem.quantity}
                      onChange={(e) =>
                        handleChange(Number(e.target.value), cartItem.id)
                      }
                      className="w-16 px-2 py-1 border rounded"
                    />
                    <button
                      onClick={() => handleDelete(cartItem.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      削除
                    </button>
                  </div>
                </div>
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

      <footer className="bg-blue-600 text-white py-6 mt-12">
        <div className="text-center">&copy; 2024 通販アプリ</div>
      </footer>
    </>
  );
}
