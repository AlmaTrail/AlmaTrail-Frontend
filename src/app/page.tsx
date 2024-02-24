'use client';
import Navbar from '@/components/navbar';
import Hero from "../../public/images/hero_1.png";
import Image from "next/image";

import CountrySection from '@/components/countrySection';


export default function Home() {
  const data = [
    {
      name: `John Morgan`,
      img: `https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: `Ellie Anderson`,
      img: `https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: `Nia Adebayo`,
      img: `https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: `Rigo Louie`,
      img: `https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
    {
      name: `Mia Williams`,
      img: `https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg`,
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    },
  ];
  return (
    <main>
      <div className="mx-auto bg-[#3b0764] flex justify-center pb-2 items-center relative z-0">
        <Navbar />
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-5 sm:mt-24 md:mt-24 lg:mt-24">
          <div className="flex flex-col gap-4 sm:justify-center sm:items-center md:justify-center md:items-center lg:gap-10">
            <p className="text-2xl text-white font-bold sm:text-4xl sm:text-center md:text-center md:text-5xl lg:text-6xl">
              A Unique approach <br className="lg:flex hidden" /> to know about your{" "}
              <br className="lg:flex hidden text-blue-500" />{" "}
              <span className="text-blue-500">dream college.</span>.
            </p>
            <p className="text-2xl sm:text-base sm:text-center md:text-center text-white font-bold">
              We have the best mentors for you <br className="lg:flex hidden" />{" "}
              Connect Today..
            </p>
            <button className="btn btn-sm lg:btn-lg bg-[#524fd5] text-white rounded-full py-2 w-36 lg:w-44 capitalize">
              Sign Up
            </button>
          </div>
          <Image
            className="hidden md:hidden lg:block lg:ml-16 w-96 h-96"
            src={Hero}
            alt=""
          />
        </div>
      </div>
      <div className='pt-12 bg-zinc-950'>
        <CountrySection data={data}/>
      </div>
    </main>
  );
}
