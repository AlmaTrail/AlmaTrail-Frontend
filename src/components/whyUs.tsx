"use client";
import React from "react";
import Hero from "../../public/images/hero_1.png";
import Image from "next/image";

const WhyUs = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-5 mt-8">
      <div className="flex flex-col gap-4 sm:justify-center sm:items-center md:justify-center md:items-center lg:gap-10">
        <p className="text-2xl text-white font-bold sm:text-4xl sm:text-center md:text-center md:text-5xl lg:text-6xl"> Why Us ? </p>
        <p className="text-2xl text-white font-bold sm:text-4xl sm:text-center md:text-center md:text-5xl lg:text-6xl">
          Catchy <br className="lg:flex hidden" /> Headline{" "}
          <br className="lg:flex hidden text-blue-500" />{" "}
          <span className="text-blue-500">dream college.</span>
        </p>
        <p className="text-3xl sm:text-base sm:text-center md:text-center text-white font-bold">
          We have the best mentors for you <br className="lg:flex hidden" />{" "}
          Connect Today..
        </p>
      </div>
      <Image
        className="hidden md:hidden lg:block lg:ml-16 w-96 h-96"
        src={Hero}
        alt=""
      />
    </div>
  );
};

export default WhyUs;
