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
            Last updated: May 2026
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-10 text-on-surface-variant leading-relaxed text-base">

          {/* Intro */}
          <section>
            <p>
              Welcome to{" "}
              <span className="font-semibold text-on-surface">
                AlmaTrail
              </span>.
              By accessing or using our platform, website, or services,
              you agree to comply with and be bound by these Terms &
              Conditions.
            </p>

            <p className="mt-4">
              If you do not agree with these terms, please do not use
              the platform.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              1. Eligibility
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                You must be at least 18 years old or use the platform
                with parental or guardian consent
              </li>

              <li>
                You agree to provide accurate and complete information
              </li>

              <li>
                You are responsible for maintaining the confidentiality
                of your account
              </li>

              <li>
                You are responsible for all activities conducted through
                your account
              </li>
            </ul>
          </section>

          {/* Platform */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              2. Platform Services
            </h2>

            <p>
              AlmaTrail is a mentorship platform that connects students
              and aspiring professionals with mentors for informational
              and guidance sessions.
            </p>

            <p className="mt-4">
              AlmaTrail does not guarantee admissions, internships,
              scholarships, jobs, visa approvals, or any specific
              outcomes from mentorship sessions.
            </p>
          </section>

          {/* Bookings */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              3. Bookings & Payments
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                All mentorship sessions must be booked through the platform
              </li>

              <li>
                Payments are securely processed through third-party
                payment providers
              </li>

              <li>
                Mentor pricing may vary depending on mentor profile,
                experience, and session type
              </li>

              <li>
                Users agree to pay all applicable fees before confirmation
                of bookings
              </li>
            </ul>
          </section>

          {/* Refunds */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              4. Cancellation & Refund Policy
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Cancellation and refund eligibility may depend on the
                timing of cancellation
              </li>

              <li>
                No-shows may not be eligible for refunds
              </li>

              <li>
                Refund timelines may vary depending on the payment provider
              </li>

              <li>
                AlmaTrail reserves the right to review disputes and make
                final decisions regarding refunds
              </li>
            </ul>
          </section>

          {/* Mentor */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              5. Mentor Responsibility
            </h2>

            <p>
              Mentors on AlmaTrail are independent individuals and are
              not employees or representatives of AlmaTrail.
            </p>

            <p className="mt-4">
              While we may verify certain mentor information, AlmaTrail
              does not guarantee the accuracy, completeness, or reliability
              of mentor advice or recommendations.
            </p>
          </section>

          {/* Conduct */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              6. User Conduct
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Users must communicate respectfully on the platform
              </li>

              <li>
                Harassment, abuse, discrimination, or inappropriate
                behavior is strictly prohibited
              </li>

              <li>
                Users may not upload or share illegal, harmful, or
                misleading content
              </li>

              <li>
                Violations may result in suspension or permanent account
                termination
              </li>
            </ul>
          </section>

          {/* IP */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              7. Intellectual Property
            </h2>

            <p>
              All platform content, branding, logos, text, graphics,
              and software are the property of AlmaTrail and may not
              be copied, reproduced, or distributed without permission.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              8. Privacy
            </h2>

            <p>
              Your use of the platform is also governed by our Privacy
              Policy. By using AlmaTrail, you consent to the collection
              and use of information as described in the Privacy Policy.
            </p>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              9. Limitation of Liability
            </h2>

            <p>
              AlmaTrail shall not be liable for any indirect, incidental,
              special, or consequential damages arising from the use of
              the platform or mentorship sessions.
            </p>

            <p className="mt-4">
              Users access and use the platform at their own discretion
              and risk.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              10. Account Suspension & Termination
            </h2>

            <p>
              AlmaTrail reserves the right to suspend or terminate
              accounts that violate these Terms & Conditions, engage
              in fraudulent activities, or harm the platform or other users.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              11. Changes to Terms
            </h2>

            <p>
              We may update these Terms & Conditions from time to time.
              Continued use of the platform after updates constitutes
              acceptance of the revised terms.
            </p>
          </section>

          {/* Governing law */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              12. Governing Law
            </h2>

            <p>
              These Terms & Conditions shall be governed by and interpreted
              in accordance with the laws of India.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              13. Contact Us
            </h2>

            <p>
              If you have any questions regarding these Terms &
              Conditions, please contact:
            </p>

            <p className="mt-2 font-semibold text-primary">
              adminalmatrail@gmail.com
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}