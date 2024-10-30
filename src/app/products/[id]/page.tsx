import type { ProductType } from "@/types/Product";
import Link from "next/link";

type ProductProps = {
  params: {
    id: number;
  };
};

export default async function Product({ params }: ProductProps) {
  const product: ProductType = await fetch(
    `http://localhost:3000/products/${params.id}`
  ).then((res) => res.json());

  return (
    <div className="my-8 mx-60">
      <div className="flex justify-between py-8 px-16 bg-white rounded-lg">
        <div>{product.name}</div>
        <div>{Math.floor(product.price)}</div>
      </div>
      <Link href="/" className="text-black mt-10">
        一覧に戻る
      </Link>
    </div>
  );
}
