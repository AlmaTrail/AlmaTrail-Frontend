"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";

const UpcomingSection = () => {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-slate-50 to-slate-100 py-4 bg-clip-text text-center text-5xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Coming Soon
      </motion.h1>
      <p className="text-white text-2xl font-bold">We are launching the user centeric website soon</p>
      <p className="text-white text-2xl flex justify-center items-center font-bold">We welcome you as a mentor   </p>
    </LampContainer>
  );
}

export default UpcomingSection;