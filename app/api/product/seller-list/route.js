import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Authenticate user
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Check if user is a seller
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Not authorized" });
    }

    // Connect to database
    await connectDB();

    // Fetch all products
    const products = await Product.find({});

    // Return response
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error); // Log for debugging
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
