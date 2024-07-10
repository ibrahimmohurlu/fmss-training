"use server"

import { revalidateTag } from "next/cache";

export async function clearUserCart() {
    await fetch("http://localhost:3000/api/cart", { method: "DELETE" });
    revalidateTag("cart");
}

export async function deleteItemFromUserCart(itemId: number) {
    await fetch(`http://localhost:3000/api/cart?item_id=${itemId}`, { method: "DELETE" });
    revalidateTag("cart");
}