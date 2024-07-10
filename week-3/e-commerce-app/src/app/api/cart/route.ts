import { userCart } from "@/data/cart/cart";
import { CartItem } from "@/data/cart/types";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

function toFixed(num: number, precision: number): number {
    return parseFloat(num.toFixed(precision));
}

export async function GET() {
    const SHIPMENT_FEE = 60;
    const originalItemPrice = toFixed(userCart.reduce((total, curr) => total + (curr.quantity * (curr.product.price + (curr.product.price * curr.product.discountPercentage / 100))), 0), 2);
    const totalDiscount = toFixed(userCart.reduce((total, curr) => total + (curr.quantity * curr.product.price * (curr.product.discountPercentage / 100)), 0), 2);
    const finalPrice = toFixed((originalItemPrice - totalDiscount + SHIPMENT_FEE), 2);
    return NextResponse.json({ totalItemCount: userCart.length, userCart: userCart, originalItemPrice, totalDiscount, shipmentFee: SHIPMENT_FEE, finalPrice })
}

export async function POST(req: NextRequest) {
    const body = await req.json() as CartItem;
    userCart.push(body);
    return NextResponse.json(null, { status: 201 })
}

export async function DELETE(req: NextRequest) {
    const itemId = req.nextUrl.searchParams.get("item_id")
    if (itemId) {
        const index = userCart.findIndex(cartItem => cartItem.product.id.toString() === itemId);
        if (index === -1) {
            return NextResponse.json(null, { status: 200 })
        }
        userCart.splice(index, 1);
        return NextResponse.json(null, { status: 200 })
    }
    userCart.length = 0;
    return NextResponse.json(null, { status: 200 })
}