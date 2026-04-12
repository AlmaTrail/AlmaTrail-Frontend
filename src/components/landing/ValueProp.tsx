"use client";
import { motion } from "framer-motion";

const ValueProp = () => (
  <section className="bg-surface py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
      <motion.blockquote
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-foreground leading-relaxed sm:text-3xl lg:text-4xl"
      >
        "One right conversation can save you months of confusion —{" "}
        <span className="text-primary">and a wrong admit.</span>"
      </motion.blockquote>
    </div>
  </section>
);

export default ValueProp;
