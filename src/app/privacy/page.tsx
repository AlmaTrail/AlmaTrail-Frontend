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
                Almatrail
              </span>
              . We value your privacy and are committed to protecting your
              personal information. This Privacy Policy explains how we collect,
              use, store, share, and safeguard your data when you use our
              platform, website, applications, and services.
            </p>

            <p className="mt-3">
              By accessing or using Almatrail, you agree to the practices
              described in this Privacy Policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              1. Information We Collect
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Personal details such as name, email address, phone number,
                country, and profile information
              </li>

              <li>
                Educational background, university preferences, work experience,
                and mentorship interests
              </li>

              <li>
                Mentor and mentee interaction data including bookings, messages,
                session history, and feedback
              </li>

              <li>
                Payment and billing information processed securely through
                third-party payment providers
              </li>

              <li>
                Device information, browser type, IP address, cookies, and
                analytics data
              </li>

              <li>
                Any information voluntarily submitted through forms, surveys,
                applications, or support requests
              </li>
            </ul>
          </section>

          {/* How We Use */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              2. How We Use Your Information
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                To connect students with mentors and facilitate mentorship
                sessions
              </li>

              <li>
                To manage bookings, scheduling, communication, and platform
                operations
              </li>

              <li>
                To personalize recommendations and improve user experience
              </li>

              <li>
                To process transactions and maintain financial records
              </li>

              <li>
                To monitor security, prevent fraud, abuse, or unauthorized
                activity
              </li>

              <li>
                To comply with legal obligations and enforce platform policies
              </li>

              <li>
                To send important updates, notifications, and service-related
                communications
              </li>
            </ul>
          </section>

          {/* Legal Basis */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              3. Legal Basis for Processing
            </h2>

            <p>
              We process personal information based on user consent, contractual
              necessity, legitimate business interests, legal compliance, and
              platform security requirements.
            </p>
          </section>

          {/* Sharing */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              4. Sharing of Information
            </h2>

            <p>
              We do not sell your personal data to third parties.
            </p>

            <p className="mt-3">
              We may share information with:
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                Mentors and mentees for session coordination and communication
              </li>

              <li>
                Trusted third-party service providers such as payment gateways,
                analytics tools, hosting providers, and authentication services
              </li>

              <li>
                Legal authorities or regulators when required by law or legal
                process
              </li>

              <li>
                Professional advisors, auditors, or affiliates assisting with
                business operations
              </li>
            </ul>
          </section>

          {/* Third Party Services */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              5. Third-Party Services
            </h2>

            <p>
              Almatrail may integrate with or use third-party services for
              payments, scheduling, communication, analytics, authentication,
              cloud storage, and infrastructure.
            </p>

            <p className="mt-3">
              These third-party providers operate under their own policies and
              terms. We are not responsible for the privacy practices, content,
              availability, or actions of external services or websites.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              6. Cookies & Tracking Technologies
            </h2>

            <p>
              We use cookies and similar technologies to improve functionality,
              remember preferences, analyze traffic, enhance security, and
              optimize user experience.
            </p>

            <p className="mt-3">
              Users may disable cookies through browser settings, although some
              platform features may not function properly.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              7. Data Security
            </h2>

            <p>
              We implement commercially reasonable technical, administrative,
              and organizational safeguards to protect personal information from
              unauthorized access, misuse, disclosure, alteration, or
              destruction.
            </p>

            <p className="mt-3">
              However, no internet-based platform or storage system is entirely
              secure, and we cannot guarantee absolute security of user data.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              8. International Data Transfers
            </h2>

            <p>
              Your information may be stored or processed in countries outside
              your jurisdiction where data protection laws may differ.
            </p>

            <p className="mt-3">
              By using Almatrail, you consent to such international transfers
              where necessary for platform operations and service delivery.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              9. Your Rights
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Access, update, or correct your information</li>

              <li>Request deletion of your account or personal data</li>

              <li>Opt out of non-essential communications</li>

              <li>Request information regarding stored personal data</li>

              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          {/* Retention */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              10. Data Retention
            </h2>

            <p>
              We retain personal information only for as long as reasonably
              necessary to provide services, comply with legal obligations,
              resolve disputes, enforce agreements, and maintain legitimate
              business operations.
            </p>
          </section>

          {/* Account Responsibility */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              11. Account Responsibility
            </h2>

            <p>
              Users are responsible for maintaining the confidentiality of their
              account credentials and for all activities conducted through their
              accounts.
            </p>

            <p className="mt-3">
              Almatrail shall not be liable for unauthorized access, data loss,
              or misuse resulting from weak passwords, credential sharing, or
              user negligence.
            </p>
          </section>

          {/* User Conduct */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              12. User Conduct
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Users must provide accurate and truthful information</li>

              <li>
                Users must not harass, abuse, threaten, or impersonate others
              </li>

              <li>
                Users must not upload harmful, unlawful, fraudulent, or
                misleading content
              </li>

              <li>
                Users must not attempt unauthorized access or misuse of the
                platform
              </li>

              <li>
                Users must comply with applicable laws and regulations
              </li>
            </ul>

            <p className="mt-3">
              We reserve the right to suspend, restrict, or terminate accounts
              that violate these rules or harm platform integrity.
            </p>
          </section>

          {/* Professional Disclaimer */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              13. No Professional Advice or Guaranteed Outcomes
            </h2>

            <p>
              Almatrail provides a platform for mentorship, informational
              guidance, and educational discussions only.
            </p>

            <p className="mt-3">
              We do not guarantee admissions, scholarships, internships, jobs,
              visas, academic success, career outcomes, or any specific results
              from mentorship sessions.
            </p>

            <p className="mt-3">
              Any advice, recommendations, opinions, or statements provided by
              mentors are solely their own and do not represent the views of
              Almatrail.
            </p>

            <p className="mt-3">
              Mentors on Almatrail are independent individuals and are not
              employees, agents, representatives, or partners of Almatrail
              unless explicitly stated otherwise.
            </p>
          </section>

          {/* Payments */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              14. Payments, Refunds & Transactions
            </h2>

            <p>
              Payments made through Almatrail are processed securely through
              authorized third-party payment providers.
            </p>

            <p className="mt-3">
              Refund eligibility, cancellations, rescheduling, and dispute
              handling may be subject to mentor policies, platform policies, or
              payment provider rules.
            </p>

            <p className="mt-3">
              Almatrail is not responsible for banking delays, payment gateway
              failures, technical interruptions, or third-party transaction
              issues beyond our reasonable control.
            </p>
          </section>

          {/* Limitation */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              15. Limitation of Liability
            </h2>

            <p>
              To the maximum extent permitted by law, Almatrail, its founders,
              employees, affiliates, advisors, partners, licensors, and service
              providers shall not be liable for any indirect, incidental,
              consequential, special, exemplary, or punitive damages.
            </p>

            <p className="mt-3">
              This includes, but is not limited to, loss of data, loss of
              profits, missed opportunities, academic outcomes, career
              decisions, visa outcomes, emotional distress, or reliance on
              mentorship advice or platform content.
            </p>

            <p className="mt-3">
              Users acknowledge that they use the platform and mentorship
              services at their own discretion and risk.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              16. Intellectual Property
            </h2>

            <p>
              All content, branding, trademarks, software, design elements,
              logos, graphics, text, and platform materials associated with
              Almatrail are protected under applicable intellectual property
              laws.
            </p>

            <p className="mt-3">
              Users may not reproduce, distribute, modify, copy, sell, or
              exploit platform materials without prior written permission.
            </p>
          </section>

          {/* Children */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              17. Children's Privacy
            </h2>

            <p>
              Almatrail is not intended for individuals under the age of 13 or
              the minimum legal age required under applicable laws.
            </p>

            <p className="mt-3">
              We do not knowingly collect personal information from children. If
              such information is identified, we will take reasonable steps to
              remove it promptly.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              18. Changes to This Privacy Policy
            </h2>

            <p>
              We may update or modify this Privacy Policy periodically to
              reflect legal, operational, or platform-related changes.
            </p>

            <p className="mt-3">
              Updated versions will be posted on this page with a revised
              effective date.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              19. Governing Law & Jurisdiction
            </h2>

            <p>
              This Privacy Policy shall be governed by and interpreted in
              accordance with the laws of India.
            </p>

            <p className="mt-3">
              Any disputes arising out of or relating to this Privacy Policy or
              the use of Almatrail shall be subject to the exclusive
              jurisdiction of the competent courts in India.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              20. Contact Us
            </h2>

            <p>
              If you have any questions, concerns, or privacy-related requests,
              you may contact us at:
            </p>

            <div className="mt-4 space-y-2">
              <p className="font-semibold text-primary">
                adminalmatrail@gmail.com
              </p>

              {/* <p className="font-semibold text-primary">
                privacy@almatrail.com
              </p>

              <p className="font-semibold text-primary">
                legal@almatrail.com
              </p> */}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}