"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import countries from "../data/countryData.js";

const CountrySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === countries.length - 8 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? countries.length - 8 : prevIndex - 1
    );
  };

  return (
    <div className="pt-8 bg-zinc-950">
      <div className="flex items-center justify-center">
        <FaChevronLeft
          onClick={handlePrev}
          style={{ width: "50px", height: "100px" }}
          className="cursor-pointer text-white"
        />
        <div className="flex flex-wrap justify-center items-center">
          {countries
            .slice(activeIndex, activeIndex + 8)
            .map((country, index) => (
              <div key={index} className="relative">
                <img
                  src={country.imageUrl}
                  width={220}
                  height={220}
                  alt={`Flag of ${country.name}`}
                  className="rounded-full drop-shadow-2xl w-full h-full object-cover hover:opacity-0 transition duration-300 ease-in-out"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300 ease-in-out">
                  <p className="text-white text-6xl font-bold">{country.name}</p>
                </div>
              </div>
            ))}
        </div>
        <FaChevronRight
          onClick={handleNext}
          style={{ width: "50px", height: "100px" }}
          className="cursor-pointer text-white"
        />
      </div>
    </div>
  );
};

export default CountrySection;
