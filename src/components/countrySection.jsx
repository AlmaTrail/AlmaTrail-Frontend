"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import countries from "../data/countryData.js";

const CountrySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === countries.length - 6 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? countries.length - 6 : prevIndex - 1
    );
  };

  return (
    <div className='h-1/4 pt-12 bg-black'>
      <div className="flex items-center">
        <FaChevronLeft
          onClick={handlePrev}
          style={{ width: "50px", height: "50px" }} // Adjust width and height here
          className="cursor-pointer text-white"
        />
        <div className="flex flex-wrap justify-center items-center">
          {countries
            .slice(activeIndex, activeIndex + 6)
            .map((country, index) => (
              <img
                key={index}
                className="rounded-full drop-shadow-2xl"
                src={country.imageUrl}
                width={220}
                height={220}
                alt={`Flag of ${country.name}`}
              />
            ))}
        </div>
        <FaChevronRight
          onClick={handleNext}
          style={{ width: "50px", height: "50px" }} // Adjust width and height here
          className="cursor-pointer text-white"
        />
      </div>
    </div>
  );
};

export default CountrySection;
