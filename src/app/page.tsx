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
      <main>
        <h2 className="text-black ml-32">商品一覧</h2>
        <div className="grid grid-cols-3 gap-8 mx-36">
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
      </main>

      <Footer />
    </>
  );
}
