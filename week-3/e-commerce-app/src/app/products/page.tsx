import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/data/products/products"
import Link from "next/link";
type ProductsPageProps = {
    searchParams: { [key: string]: string | undefined }
}
export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const search = searchParams["search"]
    const sortBy = searchParams["sortBy"]
    const order = searchParams["order"]
    const products = await fetchProducts(search, sortBy, order);
    return (
        <div className="container mx-auto my-8">
            <form className="mx-auto flex items-center gap-4">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" defaultValue={search} name="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products..." />
                </div>
                <div className="min-w-max">
                    <select name="sortBy" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value={""}>Sort By</option>
                        <option value="price">Price</option>
                        <option value="rating">Rating</option>
                        <option value="title">Title</option>
                    </select>
                </div>
                <div className="min-w-max">
                    <select name="order" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value={""}>Order By</option>
                        <option value="asc">ASC</option>
                        <option value="desc">DESC</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700">Search</button>
                    <Link href={`/products?${new URLSearchParams({ sortBy: "", order: "", search: "" }).toString()}`} className=" text-white bg-red-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700">Clear</Link>
                </div>
            </form>
            <div className="flex flex-wrap border border-gray-700 my-4">
                {
                    products.map(p => (<ProductCard key={p.id} product={p} />))
                }
            </div>
            
        </div>

    )
}