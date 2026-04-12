"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
  { text: "I didn't realize how important recommendation letters were until it was almost too late.", author: "Priya, MS applicant" },
  { text: "I applied too late and missed better universities that were actually a great fit for me.", author: "Daniel, CS student" },
  { text: "I didn't know how to evaluate research labs — I picked the wrong university and had to transfer.", author: "Yuki, PhD student" },
];

const SocialProof = () => (
  <section className="bg-surface py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          Built from <span className="text-primary">real student struggles</span>
        </h2>
      </motion.div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {quotes.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <Quote className="text-primary/30" size={28} />
            <p className="mt-4 text-sm text-foreground leading-relaxed italic">"{q.text}"</p>
            <p className="mt-4 text-xs font-semibold text-text-secondary">— {q.author}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
