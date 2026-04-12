"use client";

import Footer from "@/components/footerSections";
import { motion } from "framer-motion";

export default function AboutUs() {
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
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">
            Bridging Students with Real University Insights
          </h1>
          <p className="mt-4 text-on-surface-variant text-lg">
            Helping students make confident decisions about their future with guidance from those who’ve already been there.
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-12 text-on-surface-variant leading-relaxed text-base">

          {/* Who we are */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              Who We Are
            </h2>
            <p>
              <span className="font-semibold text-on-surface">Almatrail</span> is a platform built to connect aspiring students with mentors from their target universities. 
              We believe that the best guidance comes from real experiences, not generic information.
            </p>
          </section>

          {/* Mission */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              Our Mission
            </h2>
            <p>
              Our mission is to simplify the journey of higher education by giving students access to authentic, 
              first-hand insights. Whether it’s choosing the right university, preparing applications, or navigating life abroad, 
              we aim to make the process transparent and stress-free.
            </p>
          </section>

          {/* Problem */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              The Problem We’re Solving
            </h2>
            <p>
              Students often rely on scattered information, outdated blogs, or expensive consultants. 
              There’s a gap between what universities promote and what students actually experience.
            </p>
            <p className="mt-2">
              Almatrail bridges that gap by connecting you directly with people who have already walked the same path.
            </p>
          </section>

          {/* What we offer */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              What We Offer
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>1:1 mentorship sessions with students & alumni</li>
              <li>Real insights on universities, courses, and career paths</li>
              <li>Guidance on applications, resumes, and interviews</li>
              <li>Support for international students (visa, relocation, etc.)</li>
            </ul>
          </section>

          {/* Vision */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              Our Vision
            </h2>
            <p>
              We envision a world where every student has access to the right guidance, regardless of their background. 
              A world where decisions are made with clarity, confidence, and real understanding.
            </p>
          </section>

          {/* Why Almatrail */}
          <section>
            <h2 className="text-xl font-bold text-on-surface mb-3">
              Why Almatrail?
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Authentic insights from real students and alumni</li>
              <li>Personalized mentorship experience</li>
              <li>Transparent and trustworthy platform</li>
              <li>Built for students, by people who’ve been in their shoes</li>
            </ul>
          </section>

          {/* Closing */}
          <section>
            <p className="text-on-surface font-semibold">
              At Almatrail, we’re not just helping you choose a university — we’re helping you shape your future.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}