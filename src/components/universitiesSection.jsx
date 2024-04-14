"use client";
import React from 'react';
import Air from "../../public/images/airbnb.png";
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';

const UniversitiesSection = () => {
  const slides = [
    { src: Air, alt: 'Airbnb' },
    { src: Air, alt: 'Airbnb' },
    { src: Air, alt: 'Airbnb' },
    { src: Air, alt: 'Airbnb' },
  ];

  const duplicatedSlides = [...slides, ...slides];
  const controls = useAnimation();

  const animateScroll = async () => {
    const containerWidth = 100 * duplicatedSlides.length;

    await controls.start({
      x: [-containerWidth, 0], // Start from -containerWidth and end at 0
      transition: {
        ease: 'linear',
        duration: 4 * duplicatedSlides.length, // Adjust duration based on number of slides
        repeat: Infinity,
      },
    });
  };

  React.useEffect(() => {
    // Trigger the animation when the component mounts
    animateScroll();
  }, []); // Run only once when component mounts

  return (
    <div className='p-20'>
      <div className="relative h-full w-full overflow-hidden py-12 bg-white">
        <div className="absolute inset-0 z-20 before:absolute"></div>
        <div className="flex items-center justify-center text-4xl pb-8">
          OUR PARTNERS
        </div>
        <motion.div
          className="flex gap-4 p-20"
          animate={controls} // Use controls for animation
        >
          {duplicatedSlides.map((slide, index) => (
            <div key={index} style={{ width: `${100 / slides.length}%` }} className="flex-shrink-0">
              <div className="flex items-center justify-center border-y">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={200} // Adjust width according to your requirements
                  height={200} // Adjust height according to your requirements
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default UniversitiesSection;
