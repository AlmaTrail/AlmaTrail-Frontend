"use client";

import { useState } from "react";
import Footer from "@/components/footerSections";
import { motion } from "framer-motion";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent("New Query from Almatrail");
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );

    window.location.href = `mailto:support@almatrail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body">
      
      <main className="flex-grow max-w-3xl mx-auto px-6 py-16 w-full">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-outline-variant mb-4">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">
            Get in touch
          </h1>
          <p className="mt-4 text-on-surface-variant text-lg">
            Have a question, feedback, or need help? We’d love to hear from you.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 ambient-shadow"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold mb-2">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Write your message..."
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-xl text-lg transition-all shadow-lg shadow-primary/20 hover:scale-[1.01]"
          >
            Send Message
          </button>

          {/* Note */}
          <p className="text-xs text-center text-on-surface-variant">
            This will open your email client to send the message.
          </p>
        </motion.form>

        {/* Direct Email */}
        <div className="mt-10 text-center text-on-surface-variant">
          <p className="text-sm">Or reach us directly at</p>
          <p className="font-semibold text-primary mt-1">
            support@almatrail.com
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}