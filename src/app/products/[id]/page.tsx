import type { ProductType } from "@/types/Product";

export default async function Product({ params }) {
  const product: ProductType = await fetch(
    `http://localhost:3000/products/${params.id}`
  ).then((res) => res.json());

  return (
    <>
      <div>{product.name}</div>
      <div>{product.price}</div>
    </>
  );
}
