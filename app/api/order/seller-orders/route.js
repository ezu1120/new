import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Order from "@/models/Orders";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    // Check if the user is a seller
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({
        success: false,
        message: "not authorized",
      });
    }

    // Connect to the database
    await connectDB();

    // Fetch all orders and populate fields
    const orders = await Order.find({}).populate("address items.product");

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

// Order.find({}):
// This fetches all documents from the Order collection in the database.
// {} is an empty filter object, meaning it doesn't restrict the search by any conditions (i.e., fetches all orders).
// .populate('address'):
// The address field in the Order model likely stores a reference to another document (the Address model).
// populate('address') replaces the address field with the actual Address document. Instead of just an address ID, you get all the details of the address (e.g., street, city, etc.).
