import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        const { address, items } = await request.json();

        if (!address || items.length === 0) {
            return NextResponse.json({
                success: false,
                message: "Invalid data",
            });
        }

        // // Fetch all products in one query
        // const productIds = items.map((item) => item.product);
        // const products = await Product.find({ _id: { $in: productIds } });

        // // Create a product map for faster lookup
        // const productMap = new Map(products.map(product => [product._id.toString(), product]));

        // Calculate total amount
        const amount =await items.reduce(async(acc, item) => {
            const product = await Product.findById(item.product);
            return await acc + product.offerPrice * item.quantity;
        }, 0);

        // Add 2% processing fee
        const finalAmount = amount + Math.floor(amount * 0.02);

        // Send order creation event
        await inngest.send({
            name: "order/created",
            data: {
                userId,
                address,
                items,
                amount: finalAmount,
                date: Date.now(),
            },
        });

        //    clear user cart
        const user = await User.findById(userId)
        user.cartItems = {}
        await user.save()
        return NextResponse.json({
            success: true,
            message:'Order placed'
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message,
        });
    }
}
