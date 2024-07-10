import { Product, ProductsResponse } from "./types";

export async function fetchProducts(search?: string, sortBy?: string, order?: string): Promise<Product[]> {
    const searchParams = new URLSearchParams()
    searchParams.set("q", search ?? "")
    searchParams.set("sortBy", sortBy ?? "")
    searchParams.set("order", order ?? "")
    const res = await fetch(`https://dummyjson.com/products/search?${searchParams.toString()}`);
    const { products } = await res.json() as ProductsResponse;
    return products;
}

export async function fetchProductById(id: string): Promise<Product> {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await res.json() as Product;
    return product;
}