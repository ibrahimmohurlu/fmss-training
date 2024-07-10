"use server"

import { revalidateTag } from "next/cache";

export async function clearUserCart() {
    await fetch("http://localhost:3000/api/cart", { method: "DELETE" });
    revalidateTag("cart");
}