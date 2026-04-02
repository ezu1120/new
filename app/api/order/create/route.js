import connectDB from "@/config/db";
import { inngest } from "@/config/inngest";
import Order from "@/models/Orders";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!address || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid data" });
    }

    await connectDB();

    // Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      amount += product.offerPrice * item.quantity;
    }

    // Add 2% processing fee
    const finalAmount = amount + Math.floor(amount * 0.02);

    const orderData = {
      userId,
      address,
      items,
      amount: finalAmount,
      date: Date.now(),
    };

    // Save order directly to DB
    await Order.create(orderData);

    // Also send to Inngest for any background processing
    await inngest.send({ name: "order/created", data: orderData });

    // Clear user cart
    await User.findByIdAndUpdate(userId, { cartItems: {} });

    return NextResponse.json({ success: true, message: "Order placed" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
