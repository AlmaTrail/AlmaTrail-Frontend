import Image from 'next/image'
import React from 'react'
import IntroImage from "../../public/images/introImage.jpg"
import { AiOutlineThunderbolt } from "react-icons/ai";
import myImage from "../../public/images/check.png"
import flexibleTiming from "../../public/images/happy-hour.png"
import Interaction from "../../public/images/interactive.png"
const IntroSection = () => {
    return (
        <div>
            <div className='flex flex-row p-8'>
                <Image src={IntroImage} className="w-1/2 h-2/3" alt="intro_image" />
                <div className='flex flex-col mt-12 w-5/12'>
                    <p className='text-3xl font-gilroy-bold text-[#1d0828]'>We Provide you the best platform to start</p>
                    <p className='mt-7 text-slate-500 text-sm font-gilroy-regular'>We offer you the best platform to make some side income while working you also got the satisfaction by helping the new dreamers
                        this is just the starting, we have lot more for you, this is the best oppurtunity for you we have some special offers for the
                        early participants. We will give the great offers to the early registeration. Stay tuned.</p>
                </div>
            </div>
            <div className='flex flex-row py-7 px-10 justify-center gap-32'>
                <div className='w-52'>
                    <div className="mt-3 flex flex-col justify-center items-center">
                        <div>
                            <Image
                                src={myImage}
                                alt="Description of the image"
                                width={80}
                                height={80}
                                className="w-16 h-16"
                            />
                        </div>
                        <p className="font-bold mt-2 font-gilroy-bold">Seamless Onboarding</p>
                        <p className="text-slate-500 text-sm mt-1 text-center font-gilroy-light">Effortlessly become a mentor in just a few straightforward steps. Our simple process ensures you can get started quickly and easily.</p>
                    </div>
                </div>
                <div className='w-52'>
                    <div className="mt-3 flex flex-col justify-center items-center">
                        <div>
                            <Image
                                src={flexibleTiming}
                                alt="Description of the image"
                                width={80}
                                height={80}
                                className="w-16 h-16"
                            />
                        </div>
                        <p className="font-bold mt-2 font-gilroy-bold">Flexible Scheduling</p>
                        <p className="text-slate-500 text-sm mt-1 text-center font-gilroy-light">Choose convenient times to mentor students. Our platform fits your availability, making mentoring easy to schedule.</p>
                    </div>
                </div>
                <div className='w-52'>
                    <div className="mt-3 flex flex-col justify-center items-center">
                        <div>
                            <Image
                                src={Interaction}
                                alt="Description of the image"
                                width={80}
                                height={80}
                                className="w-16 h-16"
                            />
                        </div>
                        <p className="font-bold mt-2 font-gilroy-bold">Direct Interaction</p>
                        <p className="text-slate-500 text-sm mt-1 text-center font-gilroy-light">Engage with your future peers through one-on-one interactions. Build meaningful relationships.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default IntroSection