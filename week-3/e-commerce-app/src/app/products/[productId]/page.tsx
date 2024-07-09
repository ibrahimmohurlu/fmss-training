
import { addProductToCart } from "@/actions/product";
import { fetchProductById } from "@/data/products/products"
import Image from "next/image";
import Link from "next/link";

type ProductDetailsPageProps = { params: { productId: string } }
export default async function ProductDetailPage({ params }: ProductDetailsPageProps) {
    const product = await fetchProductById(params.productId);

    const addProductToCartWithBindedProduct = addProductToCart.bind(null, product)

    return (
        <div className="container grid grid-cols-2  mx-auto mt-8">
            <div className="relative w-3/4 aspect-square mx-auto">
                <Image src={product.images[0]} alt="product-image" fill={true} />
            </div>
            <div className="my-auto">
                <span className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded ${product.availabilityStatus === "Low Stock" ? "bg-red-900 text-red-300" : "bg-green-900 text-green-300"}`}>{product.availabilityStatus}({product.stock})</span>
                <h1 className="text-4xl mb-6 font-bold ">
                    {product.title}
                </h1>
                <p className="text-xl font-light text-gray-200 mb-6">{product.description}</p>
                <div className="flex items-center justify-between mb-6">
                    <p className="text-4xl font-bold relative ">
                        ${product.price}
                        <span className="text-sm absolute -top-1/4 -right-1/2 rounded-lg  p-0.5 text-white font-bold bg-yellow-500 animate-pulse">%{product.discountPercentage}</span>
                    </p>
                    <div className=" flex items-center space-x-1 rtl:space-x-reverse gap-1">
                        {new Array(5).fill(0).map((r, idx) => {
                            return (
                                <svg key={idx} className={`w-4 h-4 ${idx < Math.floor(product.rating) ? "text-yellow-300" : "text-gray-200 dark:text-gray-600"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                            )
                        })}
                        <span className="text-xl text-gray-400">({product.rating})</span>
                        <Link href={"#reviews"} className="text-xl underline hover:no-underline">{product.reviews.length} Reviews</Link>
                    </div>
                </div>
                <form action={addProductToCartWithBindedProduct} className="flex justify-between">
                    <div className="inline-flex items-center justify-center gap-2">
                        <label htmlFor="number-input" className="block text-lg font-medium text-gray-900 dark:text-white">Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            min={1}
                            max={product.stock}
                            defaultValue={1}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required />
                    </div>
                    <button type="submit" className="inline-flex gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </span>
                        Add to cart
                    </button>
                </form>

            </div>

            <div id="reviews" className="col-span-2">
                <h1 className="text-4xl mb-6 font-bold ">Reviews</h1>
                <div className="flex flex-col gap-4">
                    {product.reviews.map((review, idx) => {
                        return (
                            <article key={idx} className="bg-gray-700 rounded-xl p-2">
                                <div className="flex items-center mb-4">
                                    <div className="bg-gray-700 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    </div>

                                    <div className="font-medium dark:text-white">
                                        <p>{review.reviewerName} <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">Commented on {new Date(review.date).toLocaleDateString()}</time></p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                    {new Array(5).fill(0).map((r, idx) => {
                                        return (
                                            <svg key={idx} className={`w-4 h-4 ${idx < Math.floor(review.rating) ? "text-yellow-300" : "text-gray-200 dark:text-gray-400"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                        )
                                    })}
                                </div>
                                <p className="text-white">{review.comment}</p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </div>

    )

}