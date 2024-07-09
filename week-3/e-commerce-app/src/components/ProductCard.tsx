import { addProductToCart } from "@/actions/product";
import { Product } from "@/data/products/types"
import Image from "next/image";
import Link from "next/link";
import { Component, ReactNode } from "react";

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const addProductToCartWithBindedProduct = addProductToCart.bind(null, product)
    return (

        <div className="w-full max-w-xs mx-auto mt-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/products/${product.id}`}>
                <div className="relative aspect-square w-60 mx-auto">
                    <Image fill={true} className="p-2 rounded-t-lg" src={product.thumbnail} alt="product image" />
                </div>
            </Link>
            <div className="px-5 pb-5">
                <Link className="hover:underline" href={`/products/${product.id}`}>
                    <h5 className="text-xl mb-2 font-semibold tracking-tight text-gray-900 dark:text-white">
                        {product.title}
                    </h5>
                </Link>

                <div className="flex flex-wrap">
                    {product.tags.map((tag, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{tag}</span>
                    ))}
                </div>


                <div className="flex items-center mt-2.5 mb-5">
                    <RenderRating rating={product.rating} />
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{product.rating}</span>
                </div>
                <form action={addProductToCartWithBindedProduct} className="flex items-center justify-between">
                    <input
                        type="number"
                        name="quantity"
                        hidden={true}
                        value={1}
                        required />
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                </form>
            </div>
        </div>

    )
}


function RenderRating(props: { rating: number }): ReactNode {
    const MAX_RATING = 5;
    const ratingArr: boolean[] = [];
    const flooredRating = Math.floor(props.rating);
    for (let i = 1; i <= MAX_RATING; i++) {
        ratingArr.push(i <= flooredRating ? true : false);
    }

    return (

        <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {ratingArr.map((r, idx) => {
                return (
                    <svg key={idx} className={`w-4 h-4 ${r ? "text-yellow-300" : "text-gray-200 dark:text-gray-600"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                )
            })}
        </div>

    )
}