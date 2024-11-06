import type { ProductType } from "@/app/types/Product";

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductType;
}
