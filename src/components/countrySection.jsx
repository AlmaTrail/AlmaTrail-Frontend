import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const Card = ({ person }) => {
  return (
    <div className="flex justify-center items-center flex-shrink-0 cursor-pointer mx-2">
      <div className="relative group">
        <Image src={person.img} width={200} height={200} alt={person.name} />
      </div>
    </div>
  );
};
const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="flex items-center justify-center cursor-pointer absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={onClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    );
  };
  
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="flex items-center justify-center cursor-pointer absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 hover:text-gray-700 z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={onClick}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
    );
  };
  
const CountrySection = ({ data }) => {
  const settings = {
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="px-10 py-8">
      <Slider {...settings}>
        {data.map((person, index) => (
          <div key={index}>
            <Card person={person} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CountrySection;
