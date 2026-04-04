'use client'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32">

        {/* Hero */}
        <div className="flex flex-col md:flex-row items-center gap-10 py-16">
          <div className="flex-1 space-y-5">
            <p className="text-orange-600 font-medium uppercase tracking-widest text-sm">About Us</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
              We bring the best tech <br /> to your doorstep
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              QuickCart is your one-stop destination for premium electronics and accessories.
              We curate the finest products from top brands and deliver them fast, reliably,
              and at the best prices.
            </p>
            <Link
              href="/all-products"
              className="inline-block bg-orange-600 text-white text-sm px-6 py-2.5 rounded hover:bg-orange-700 transition"
            >
              Shop Now
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src={assets.boy_with_laptop_image}
              alt="about"
              className="w-full max-w-sm rounded-xl object-cover"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-t border-b border-gray-200">
          {[
            { value: "10K+", label: "Happy Customers" },
            { value: "500+", label: "Products" },
            { value: "50+", label: "Brands" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-1">
              <p className="text-2xl font-bold text-orange-600">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Why Us */}
        <div className="py-16 space-y-8">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Why Choose QuickCart?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Fast Delivery", desc: "Get your orders delivered to your doorstep quickly and reliably." },
              { title: "Genuine Products", desc: "Every product is sourced directly from authorized distributors." },
              { title: "Easy Returns", desc: "Not satisfied? Return within 30 days, no questions asked." },
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-6 space-y-3 hover:shadow-md transition">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="py-10 space-y-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Meet the Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Alex Johnson", role: "CEO & Founder" },
              { name: "Sarah Lee", role: "Head of Products" },
              { name: "Mark Davis", role: "Lead Developer" },
              { name: "Emily Chen", role: "Customer Success" },
            ].map((member, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-orange-100 mx-auto flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-lg">{member.name[0]}</span>
                </div>
                <p className="font-medium text-gray-800 text-sm">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default About;
