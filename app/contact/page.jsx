'use client'
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32">

        {/* Hero */}
        <div className="py-16 text-center space-y-3">
          <p className="text-orange-600 font-medium uppercase tracking-widest text-sm">Contact Us</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Get in Touch</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Have a question or need help? We're here for you. Fill out the form and we'll respond within 24 hours.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 pb-16">

          {/* Info */}
          <div className="flex-1 space-y-8">
            {[
              { label: "Phone", value: "+1-234-567-890" },
              { label: "Email", value: "contact@greatstack.dev" },
              { label: "Hours", value: "Mon–Fri, 9am – 6pm" },
              { label: "Address", value: "123 Main Street, City, State" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <span className="text-orange-600 font-bold text-xs">{item.label[0]}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{item.label}</p>
                  <p className="text-gray-500 text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-orange-400 transition"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-orange-400 transition"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                  className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-orange-400 transition"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-orange-400 transition resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 text-white py-2.5 rounded text-sm font-medium hover:bg-orange-700 transition disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
