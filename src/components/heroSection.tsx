"use client";
import React from "react";
import Hero from "../../public/images/hero_1.png";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignupSection from "./signupSection";

const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row sm:p-8 lg:justify-between items-center gap-5 lg:mt-8">
      <div className="flex flex-col gap-4 sm:items-left md:justify-center md:items-center lg:gap-8">
        <p className="text-white font-gilroy-bold font-bold sm:text-4xl sm:text-left md:text-center md:text-5xl lg:text-6xl mt-10">
          Bridge the Gap<br /> Between<br className="flex" />Dream School and{" "}
          <br className="lg:flex hidden text-blue-500" />{" "}
          <span className="text-yellow-500"> Reality.<br /></span>
        </p>
        <p className="text-lg font-gilroy-regular sm:text-left md:text-center text-white font-medium mb-0">
          Turn your passion and knowledge into a thriving business.<br />Help your audience get ahead in life.<br />
        </p>
        <div className="flex sm:flex-col justify-around">
          <button className="py-2 w-full sm:my-4 bg-white rounded-md text-[#1d0828] font-gilroy-bold shadow-sm transition duration-200 hover:bg-[#1d0828] hover:text-white border-2 border-transparent hover:border-white mr-5">
            <div >
              <Link href={'/mentor_form'}>Register Here</Link>
            </div>
          </button>
          <Dialog>
            <DialogTrigger className="py-2 w-full sm:my-2 hover:bg-white rounded-md hover:text-[#1d0828] font-gilroy-bold shadow-sm transition duration-200 bg-[#1d0828] text-white border-2 border-white">
              Sign up
            </DialogTrigger>
            <DialogContent className='m-0 p-0 rounded-xl'>
              <SignupSection />
            </DialogContent>
          </Dialog>
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
