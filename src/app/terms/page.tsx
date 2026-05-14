"use client";

import Footer from "@/components/footerSections";
import { motion } from "framer-motion";

export default function TermsAndConditions() {
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
            Terms & Conditions
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
              By accessing or using our platform, you agree to be bound by these Terms & Conditions. 
              If you do not agree, please do not use our services.
            </p>
          </section>

          {/* Use of platform */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              1. Use of the Platform
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 18 years old or have parental consent</li>
              <li>You agree to provide accurate and complete information</li>
              <li>You are responsible for maintaining account confidentiality</li>
              <li>You agree not to misuse the platform or engage in harmful activities</li>
            </ul>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              2. Services Offered
            </h2>
            <p>
              Almatrail connects students with mentors for informational sessions. 
              We do not guarantee admission, job placement, or specific outcomes.
            </p>
          </section>

          {/* Booking & payments */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              3. Bookings & Payments
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All sessions must be booked through the platform</li>
              <li>Payments are processed via secure third-party providers</li>
              <li>Prices are determined by mentors and may vary</li>
              <li>Once booked, sessions are subject to cancellation policies</li>
            </ul>
          </section>

          {/* Cancellation */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              4. Cancellation & Refunds
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Users may cancel sessions within the allowed timeframe</li>
              <li>Refund eligibility depends on timing and circumstances</li>
              <li>No-shows may not be eligible for refunds</li>
              <li>Almatrail reserves the right to resolve disputes fairly</li>
            </ul>
          </section>

          {/* Mentor responsibility */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              5. Mentor Responsibility
            </h2>
            <p>
              Mentors are independent individuals. While we verify profiles, 
              Almatrail is not responsible for the accuracy of advice or outcomes 
              resulting from mentorship sessions.
            </p>
          </section>

          {/* User conduct */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              6. User Conduct
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respectful communication is mandatory</li>
              <li>No harassment, abuse, or inappropriate behavior</li>
              <li>No sharing of illegal or harmful content</li>
              <li>Violation may result in account suspension</li>
            </ul>
          </section>

          {/* Intellectual property */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              7. Intellectual Property
            </h2>
            <p>
              All content, branding, and materials on Almatrail are owned by us 
              and may not be copied or reused without permission.
            </p>
          </section>

          {/* Limitation of liability */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              8. Limitation of Liability
            </h2>
            <p>
              Almatrail is not liable for any indirect, incidental, or consequential 
              damages arising from the use of our platform.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              9. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate 
              these terms or harm the platform.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              10. Changes to Terms
            </h2>
            <p>
              We may update these Terms & Conditions from time to time. Continued 
              use of the platform means you accept the updated terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              11. Contact Us
            </h2>
            <p>If you have any questions, contact us at:</p>
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