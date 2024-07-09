import { Product } from "../products/types";

export type CartItem = { product: Product, quantity: number };
export type UserCart = CartItem[];

export type UserCartResponse = { totalItemCount: number, userCart: UserCart }