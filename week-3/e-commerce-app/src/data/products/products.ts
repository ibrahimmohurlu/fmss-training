import { Product, ProductsResponse } from "./types";

export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch("https://dummyjson.com/products");
    const { products } = await res.json() as ProductsResponse;
    return products;
}