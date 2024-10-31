import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import type { ProductType } from "@/app/types/Product";

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

      <div className="my-20">
        <div className="mx-20 font-bold text-2xl">商品一覧</div>
        {products ? (
          products.map((product: ProductType) => {
            return (
              <div
                key={product.id}
                className="py-8 px-16 my-8 mx-60 bg-white hover:bg-slate-200 rounded-lg"
              >
                <Link
                  href={`products/${product.id}`}
                  className="flex justify-between no-underline text-black"
                >
                  <div>{product.name}</div>
                  <div>{Math.floor(product.price)}円</div>
                </Link>
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <footer></footer>
    </>
  );
}
