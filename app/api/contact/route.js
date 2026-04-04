import connectDB from "@/config/db";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "All fields are required" });
    }

    await connectDB();
    await Contact.create({ name, email, subject, message });

    return NextResponse.json({ success: true, message: "Message received" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
