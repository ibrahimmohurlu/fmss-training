import { clearUserCart, deleteItemFromUserCart, updateItemQuantityByProdcutId } from "@/actions/cart";
import { fetchUserCart } from "@/data/cart/cart"
import Image from "next/image";
import Link from "next/link";

export default async function CartPage() {
    const { totalItemCount, userCart, originalItemPrice, totalDiscount, shipmentFee, finalPrice } = await fetchUserCart();

    return (
        <div className="container mx-auto my-16 space-y-5">
            <div className="container grid grid-cols-3">
                <form action={clearUserCart} className="flex justify-between col-span-2 mb-8">
                    <h1 className="text-2xl font-bold">Cart</h1>
                    <div className="flex gap-4 items-center">
                        <h1 className="text-xl font-normal">Total Items: {totalItemCount}</h1>
                        <button type="submit" className="bg-red-700 hover:bg-red-800 px-2 py-1 rounded-lg">
                            Clear
                        </button>
                    </div>
                </form>
                <div className="col-span-1">{/* This is just a placeholder div */}</div>
                <div className="flex flex-col gap-4 col-span-2">

                    <div className="flex flex-col gap-4">
                        {userCart.map(item => {
                            return (
                                <div key={item.product.id} className="flex gap-8 rounded-xl items-center border bg-gray-800 px-4 py-2 border-gray-600">
                                    <div className="relative aspect-square min-w-32">
                                        <Image src={item.product.thumbnail} fill={true} alt="cart-items-thumbnail" />
                                    </div>
                                    <div className="w-full">
                                        <Link href={`/products/${item.product.id}`} className="hover:underline">
                                            <p className="text-base font-semibold">{item.product.title}</p>
                                        </Link>
                                        <p className="text-sm font-light">{item.product.brand}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <form method="PATCH" action={updateItemQuantityByProdcutId.bind(null, item.product.id, item.quantity - 1)}>
                                            <button type="submit" className="bg-gray-700 p-1 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                                </svg>
                                            </button>
                                        </form>
                                        <span className="text-lg">{item.quantity}</span>
                                        <form method="PATCH" action={updateItemQuantityByProdcutId.bind(null, item.product.id, item.quantity + 1)}>
                                            <button type="submit" className="bg-gray-700 p-1 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                </svg>
                                            </button>
                                        </form>
                                    </div>
                                    <div className="text-lg font-semibold">
                                        <p>${item.product.price}</p>
                                    </div>
                                    <form action={deleteItemFromUserCart.bind(null, item.product.id)} className="text-red-500">
                                        <button type="submit">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className=" mx-8 text-lg text-gray-300 font-normal px-6 py-4 space-y-2 bg-gray-800 border border-gray-600 rounded-xl">
                        <h1 className="text-xl font-semibold text-white mb-6">Order Summary</h1>
                        <div className="flex items-center justify-between">
                            <p>Original Price</p>
                            <p>${originalItemPrice}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Discount</p>
                            <p className="text-green-500">-${totalDiscount}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p>Shipment</p>
                            <p>${shipmentFee}</p>
                        </div>
                        <div className="h-px bg-gray-400" />
                        <div className="flex text-white font-semibold items-center justify-between">
                            <p>Total</p>
                            <p>${finalPrice}</p>
                        </div>
                        <div className="flex flex-col gap-2 text-base text-white items-center">
                            <button type="button" className="py-3 px-8 bg-blue-600 hover:bg-blue-700 rounded-lg">Proceed to Checkout</button>
                            <p className="text-gray-300">or <Link href={"/products"} className="text-blue-600 underline hover:no-underline">continue shopping</Link></p>
                        </div>
                    </div>

                    <div className="mt-8 mx-8 text-lg text-white font-normal px-6 py-4 bg-gray-800 border border-gray-600 rounded-xl">
                        <form className="flex flex-col gap-3 px-2">
                            <label htmlFor="coupon">Do you have a voucher or gift card?</label>
                            <input type="text" name="coupon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <button type="button" className="py-1 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg">Apply Code</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}