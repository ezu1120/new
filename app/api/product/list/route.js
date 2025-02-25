import connectDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
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
