"use client";
import React from "react";
import Hero from "../../public/images/hero_1.png";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-5 mt-8">
      <div className="flex flex-col gap-4 sm:justify-center sm:items-center md:justify-center md:items-center lg:gap-8">
        <p className="text-2xl text-white font-bold sm:text-4xl sm:text-center md:text-center md:text-5xl lg:text-5xl">
          Bridge the Gap <br className="lg:flex hidden" /> Between Dream School{" "}
          <br className="lg:flex hidden text-blue-500" />{" "}
          <span className="text-yellow-500">and Reality.<br /></span>
        </p>
        <p className="text-lg sm:text-base sm:text-center md:text-center text-white font-medium mb-0">
          Turn your passion and knowledge into a thriving business.<br />Help your audience get ahead in life<br />
        </p>
        <p className="text-3xl text-white font-medium">{`Let's do it.`}</p>
        <div className="flex">
          <button className="py-2 px-2 bg-white rounded-md text-[#3b0764] font-semibold shadow-sm transition duration-200 hover:bg-[#3b0764] hover:text-white border-2 border-transparent hover:border-white">
            <div>
              <Link href={'/user_signup'}>Register Here</Link>
            </div>
          </button>
        </div>
      </div>
      <Image
        className="hidden md:hidden lg:block lg:ml-16 w-[420px] h-[400px]"
        src={Hero}
        alt=""
      />
    </div>
  );
};

export default HeroSection;
