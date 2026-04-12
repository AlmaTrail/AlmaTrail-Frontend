"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FinalCTA = () => {
  const router = useRouter();
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
          Start your journey with <span className="text-primary">clarity</span>
        </h2>
        <p className="mt-4 text-text-secondary text-lg">Your dream university is closer than you think.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            size="xl"
              onClick={() => router.push("/explore")}
            className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
            >
            Get Guidance
            </Button>
          <Button variant="hero-outline" size="xl">Find Mentors</Button>
        </div>
      </motion.div>
    </div>
  </section>
);
};

export default FinalCTA;
