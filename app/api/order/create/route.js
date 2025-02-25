import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
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

    // Fetch all products in one query
    const productIds = items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    // Create a product map for faster lookup
    const productMap = new Map(
      products.map((product) => [product._id.toString(), product])
    );

    // Calculate total amount
    const amount = items.reduce((acc, item) => {
      const product = productMap.get(item.product.toString());
      if (!product)
        throw new Error(`Product with ID ${item.product} not found`);
      return acc + product.offerPrice * item.quantity;
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

    return NextResponse.json({
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
