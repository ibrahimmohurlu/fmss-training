import { userCart } from "@/data/cart/cart";
import { CartItem } from "@/data/cart/types";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ totalItemCount: userCart.length, userCart: userCart })
}

export async function POST(req: NextRequest) {
    const body = await req.json() as CartItem;
    userCart.push(body);
    revalidateTag("cart")
    return NextResponse.json(null, { status: 201 })
}