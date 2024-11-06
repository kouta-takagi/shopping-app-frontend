"use client";

import type { ProductType } from "@/app/types/Product";
import { useEffect, useState } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Product from "./components/product";

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetch("http://localhost:3000/products").then(
        (res) => res.json()
      );
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />

      <main className="my-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-bold text-3xl mb-8 text-gray-800">商品一覧</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products ? (
              products.map((product: ProductType) => (
                <Product
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                />
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
