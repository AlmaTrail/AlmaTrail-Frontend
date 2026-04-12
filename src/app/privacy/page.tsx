"use client";

import Footer from "@/components/footerSections";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface font-body">
      
      <main className="flex-grow max-w-5xl mx-auto px-6 py-16 w-full">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-outline-variant mb-4">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-on-surface-variant text-lg">
            Last updated: April 2026
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-10 text-on-surface-variant leading-relaxed text-base">

          {/* Intro */}
          <section>
            <p>
              Welcome to <span className="font-semibold text-on-surface">Almatrail</span>. 
              We value your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, and safeguard your information 
              when you use our platform.
            </p>
          </section>

          {/* Info we collect */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal details (name, email, profile info)</li>
              <li>Educational background and preferences</li>
              <li>Mentor interaction data (sessions, messages)</li>
              <li>Payment and transaction details (processed securely via third-party providers)</li>
              <li>Usage data (device, browser, analytics)</li>
            </ul>
          </section>

          {/* How we use */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To connect students with relevant mentors</li>
              <li>To facilitate session bookings and communication</li>
              <li>To improve platform experience and recommendations</li>
              <li>To ensure security and prevent fraud</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Sharing */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              3. Sharing of Information
            </h2>
            <p>
              We do not sell your personal data. We may share information with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Mentors (for session coordination)</li>
              <li>Trusted service providers (payments, analytics)</li>
              <li>Legal authorities when required</li>
            </ul>
          </section>

          {/* Data security */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              4. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your data. 
              However, no system is completely secure, and we encourage users to take 
              precautions while sharing personal information.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              5. Cookies & Tracking
            </h2>
            <p>
              We use cookies and similar technologies to enhance user experience, 
              analyze traffic, and improve our services.
            </p>
          </section>

          {/* User rights */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              6. Your Rights
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access or update your data</li>
              <li>Request deletion of your account</li>
              <li>Opt-out of communications</li>
            </ul>
          </section>

          {/* Retention */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              7. Data Retention
            </h2>
            <p>
              We retain your data only as long as necessary to provide services 
              and comply with legal obligations.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be 
              posted on this page with an updated date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              9. Contact Us
            </h2>
            <p>
              If you have any questions, contact us at:
            </p>
            <p className="mt-2 font-semibold text-primary">
              support@almatrail.com
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}