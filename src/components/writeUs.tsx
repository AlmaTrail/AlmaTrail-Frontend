import React from "react";
import { Button } from "./ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const GetInTouch = () => {
  return (
    <section className="py-4">
      <div className="container mx-auto px-8 lg:px-16 mb-6">
        <p className="text-3xl font-gilroy-bold text-center mb-8">Get in touch</p>
        <div className="flex flex-wrap lg:flex-nowrap gap-8">
          <div className="flex-1 bg-white p-4 shadow-lg rounded-xl border-2 border-[#3b0764]">
            <p className="text-2xl font-gilroy-bold mb-3">Contact Us</p>
            <ul className="space-y-1">
              <li className="font-gilroy-regular text-xl"><i className="fas fa-envelope"></i> admin@almatrail.com</li>
            </ul>
          </div>
          <div className="flex-1 bg-white p-6 shadow-lg rounded-xl border-2 border-[#3b0764]">
            <p className="text-2xl font-gilroy-bold">Enroll in Our Newspaper</p>
            <div className="flex mt-2">
              <input type="text" id="subject" className="w-10/12 px-4 py-2 border rounded-lg font-gilroy-regular" placeholder="Enter your email" />
              <button
                className="bg-[#1d0828] shadow-md text-white px-3 ml-2 rounded-lg"
                onClick={() => {

                }}
              >
                <PaperPlaneIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
