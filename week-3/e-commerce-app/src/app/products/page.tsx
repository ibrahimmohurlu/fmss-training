import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/data/products/products"

export default async function ProductsPage() {
    const products = await fetchProducts();
    return (
        <div className="container flex flex-wrap border border-gray-700 mx-auto mt-8">
            {
                products.map(p => (<ProductCard key={p.id} product={p} />))
            }
        </div>
    )
}