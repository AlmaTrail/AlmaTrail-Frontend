"use-client"
import React from "react";
import SectionHeading from "./SectionHeading";

const Summary: React.FC = () => {
  return (
    <div>
      <SectionHeading
        title="Thank you!"
        desc="Thank you for filling out the form."
      />
      <div className="bg-[#f0f6ff] rounded-xl p-5 mb-5 flex justify-center items-center">
        <h2>Thank you for filling out the form!</h2>
      </div>
    </div>
  );
};

export default Summary;
