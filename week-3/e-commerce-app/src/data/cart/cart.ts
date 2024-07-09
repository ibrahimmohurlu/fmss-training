import { UserCart, UserCartResponse } from "./types";

export const userCart: UserCart = [];

export async function fetchUserCart() {
    const res = await fetch("http://localhost:3000/api/cart", { next: { tags: ["cart"] } });
    const userCart = await res.json() as UserCartResponse;
    return userCart;
}