"use server"

import { CartItem } from "@/data/cart/types";
import { Product } from "@/data/products/types";
import { revalidateTag } from "next/cache";

export async function addProductToCart(product: Product, formData: FormData) {
    let payload: CartItem;
    const quantity = formData.get("quantity");
    if (quantity) {
        payload = { product, quantity: parseInt(quantity.toString()) }
    } else {
        payload = { product, quantity: 1 }
    }
    const res = await fetch("http://localhost:3000/api/cart", { method: "POST", body: JSON.stringify(payload) })
    revalidateTag("cart")

}