"use client"
import React, { useEffect, useState } from "react";
import YourInfo from "./YourInfo";
import AcademicDetailsForm from "./AcademicDetails";
import Summary from "./Summary";
import Thankyou from "./Thankyou";
import Step from "./Step";

import BackgroundSidebar from "../../../public/images/bg-sidebar-desktop.svg";
import BackgroundSidebarMobile from "../../../public/images/bg-sidebar-mobile.svg";

const Form: React.FC = () => {
  const [stepNumber, setStepNumber] = useState<number>(1);
  const [goBackVisible, setGoBackVisible] = useState<string>("invisible");
  const [steps, setSteps] = useState<{ id: number; title: string; active: boolean }[]>([
    { id: 1, title: "YOUR INFO", active: true },
    { id: 2, title: "Academic", active: false },
    { id: 3, title: "SUMMARY", active: false },
  ]);

  const [yourInfo, setYourInfo] = useState<{ name: string; email: string; phone: string }>({
    name: "",
    email: "",
    phone: "",
  });

  const [myInfo, setMyInfo] = useState<{ country: string; college: string; course: string; language: string }>({
    country: "",
    college: "",
    course: "",
    language: ""
  });

  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [displayThankyou, setDisplayThankyou] = useState<boolean>(false);

  useEffect(() => {
    setSteps(prevSteps => {
      const updatedSteps = prevSteps.map(step => ({
        ...step,
        active: step.id === stepNumber
      }));
      return updatedSteps;
    });
    setGoBackVisible(stepNumber > 1 ? "visible" : "invisible");
  }, [stepNumber]);

  const nextStep = () => {
    if (stepNumber === 1 && (yourInfo.name === "" || yourInfo.email === "" || yourInfo.phone === "")) {
      setIsEmpty(true);
      return;
    } else if (stepNumber === 2 && (myInfo.country === "" || myInfo.college === "" || myInfo.course === "" || myInfo.language === "")) {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);
    setStepNumber(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    if (stepNumber > 1) {
      setStepNumber(prevStep => prevStep - 1);
    }
  };

  const changeYourInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYourInfo(prevInfo => ({ ...prevInfo, [event.target.name]: event.target.value }));
  };

  const changeMyInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMyInfo(prevInfo => ({ ...prevInfo, [event.target.name]: event.target.value }));
  };

  return (
    <div className="container">
      <div className="bg-[#d6d9e6] lg:bg-white rounded-xl lg:p-3 lg:flex justify-center">
        <div className="relative">
          <img className="hidden lg:block" src={BackgroundSidebar} alt="sidebar" />
          <img className="block lg:hidden w-full" src={BackgroundSidebarMobile} alt="topbar" />

          <div className="flex justify-center mt-8 absolute inset-0 space-x-10 lg:space-x-0 lg:mt-0 lg:pl-6 lg:pt-8 lg:space-y-7">
            {steps.map(step => (
              <Step key={step.id} number={step.id} title={step.title} active={step.active} />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between absolute top-40 w-[450px] lg:static mb-40 rounded-2xl mx-8 px-16 pt-10 pb-16 bg-white lg:px-0 lg:py-5 lg:mx-28 lg:w-100 lg:my-2">
          {displayThankyou ? (
            <Thankyou />
          ) : (
            <>
              {stepNumber === 1 && (
                <YourInfo
                  onChange={changeYourInfo}
                  yourInfo={yourInfo}
                  isEmpty={isEmpty}
                />
              )}
              {stepNumber === 2 && (
                <AcademicDetailsForm
                  academicDetails={myInfo}
                  onChange={changeMyInfo}
                  isEmpty={isEmpty}
                />
              )}
              {stepNumber === 3 && (
                <Summary/>
              )}
            </>
          )}
          <div className="flex justify-between fixed px-16 bottom-0 left-0 w-full bg-white p-5 lg:static lg:p-0 lg:static items-center w-[700px]]">
            <div
              onClick={prevStep}
              className={`font-medium text-[#9699ab] select-none cursor-pointer transition duration-100 hover:text-[#02295a] ${goBackVisible}`}
            >
              Go back
            </div>
            <div
              onClick={nextStep}
              className="font-medium bg-[#02295a] select-none text-white py-3 px-5 rounded-lg cursor-pointer transition duration-100 hover:opacity-90"
            >
              Next Step
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
