import type { CartItemType } from "@/app/types/CartItem";

export interface ProductType {
  id: number;
  name: string;
  price: number;
  cart_item?: CartItemType;
}
