"use client";
import { motion } from "framer-motion";
import { AlertTriangle, GraduationCap, HelpCircle, Clock, Users, BarChart3 } from "lucide-react";

const problems = [
  { icon: BarChart3, text: "Choosing universities based on rankings, not fit" },
  { icon: HelpCircle, text: "No clarity between MS vs PhD" },
  { icon: AlertTriangle, text: "Confusion about funding and research labs" },
  { icon: Clock, text: "Last-minute applications and weak SOPs" },
  { icon: Users, text: "No access to real students from target universities" },
];

const ProblemSection = () => (
  <section className="bg-surface py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          Most students get this <span className="text-destructive">wrong</span>
        </h2>
        <p className="mt-3 text-text-secondary">These mistakes cost students their dream admits every year.</p>
      </motion.div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-error-bg">
              <p.icon className="text-destructive" size={20} />
            </div>
            <p className="text-sm font-medium text-foreground leading-relaxed">{p.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
