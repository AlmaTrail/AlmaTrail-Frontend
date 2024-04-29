"use client";

import React from "react";
import Hero from "../../public/images/hero_1.png";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-5 mt-8">
      <div className="flex flex-col gap-4 sm:justify-center sm:items-center md:justify-center md:items-center lg:gap-10">
        <p className="text-2xl text-white font-bold sm:text-4xl sm:text-center md:text-center md:text-5xl lg:text-6xl">
          A Unique approach <br className="lg:flex hidden" /> to know about your{" "}
          <br className="lg:flex hidden text-blue-500" />{" "}
          <span className="text-blue-500">dream college.</span>.
        </p>
        <p className="text-3xl sm:text-base sm:text-center md:text-center text-white font-bold">
          We have the best mentors for you <br className="lg:flex hidden" />{" "}
          Connect Today..
        </p>
        <div className="flex">
          <button className="py-2 px-2 bg-white rounded-md text-[#3b0764] font-semibold shadow-sm transition duration-200 hover:bg-[#3b0764] hover:text-white border-2 border-transparent hover:border-white">
            <Link href={'/user_signup'}>Register As a Mentor </Link>
          </button>
        </div>
      </div>
      <Image
        className="hidden md:hidden lg:block lg:ml-16 w-96 h-96"
        src={Hero}
        alt=""
      />
    </div>
  );
};

export default HeroSection;
