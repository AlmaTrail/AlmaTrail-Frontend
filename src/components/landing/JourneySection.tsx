"use client";
import { motion } from "framer-motion";
import { Lightbulb, ListChecks, Search, FileText, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: Lightbulb, title: "Clarity", desc: "Understand MS vs PhD and what's right for you" },
  { icon: ListChecks, title: "Shortlist", desc: "Build a personalized university list based on your profile" },
  { icon: Search, title: "Explore", desc: "Dive into labs, courses, and real student experiences" },
  { icon: FileText, title: "Apply", desc: "Get guidance on SOPs, LORs, and exam preparation" },
  { icon: CheckCircle2, title: "Decide", desc: "Final decision support with mentor insights" },
];

const JourneySection = () => (
  <section id="journey" className="bg-background py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          Almatrail helps you make the right decisions <span className="text-primary">at every step</span>
        </h2>
      </motion.div>

      <div className="relative mt-16">
        {/* Connector line */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />
        <div className="absolute left-6 top-0 block h-full w-px bg-border lg:hidden" />

        <div className="flex flex-col gap-8 lg:gap-0">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-start gap-6 lg:gap-0 ${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } lg:items-center`}
            >
              {/* Mobile dot */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                <s.icon size={20}  className="text-white"/>
              </div>

              <div className={`flex-1 rounded-2xl border border-border bg-card p-5 shadow-card lg:mx-auto lg:max-w-sm ${
                i % 2 === 0 ? "lg:mr-[calc(50%+2rem)]" : "lg:ml-[calc(50%+2rem)]"
              }`}>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">Step {i + 1}</span>
                <h3 className="mt-1 text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm text-text-secondary">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default JourneySection;
