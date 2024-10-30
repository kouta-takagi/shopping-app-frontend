import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import type { ProductType } from "@/types/Product";

export default async function Home() {
  const products: ProductType[] = await fetch(
    "http://localhost:3000/products"
  ).then((res) => res.json());

  return (
    <>
      <header>
        <div className="flex justify-between w-full px-6 pt-4">
          <Link href="/" className="font-bold text-xl no-underline text-black">
            通販アプリ
          </Link>
          <Link href="/cart_items">
            <FontAwesomeIcon
              icon={faCartShopping}
              className="size-6 text-black"
            />
          </Link>
        </div>
      </header>
      <div>
        {products.map((product: ProductType) => {
          return (
            <li key={product.id}>
              <Link href={`products/${product.id}`}>
                {product.name}
                {product.price}
              </Link>
            </li>
          );
        })}
      </div>
      <footer></footer>
    </>
  );
}
