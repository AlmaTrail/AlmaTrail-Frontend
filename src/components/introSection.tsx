import Image from 'next/image'
import React from 'react'
import IntroImage from "../../public/images/introImage.jpg"
import { AiOutlineThunderbolt } from "react-icons/ai";

const IntroSection = () => {
    return (
        <div>
            <div className='flex flex-row p-8'>
                <Image src={IntroImage} className="w-1/2 h-2/3" alt="intro_image" />
                <div className='flex flex-col mt-12 w-5/12'>
                    <p className='text-3xl font-bold text-[#1d0828]'>We Provide you the best platform to start</p>
                    <p className='mt-7 text-slate-500 text-sm'>We offer you the best platform to make some side income while working you also got the satisfaction by helping the new dreamers
                        this is just the starting, we have lot more for you, this is the best oppurtunity for you we have some special offers for the
                        early participants. We will give the great offers to the early registeration. Stay tuned.</p>
                </div>
            </div>
            <div className='flex flex-row py-7 px-10 justify-center gap-16'>
                <div className='w-52'>
                    <div className="mt-3 flex flex-col ml-3 justify-center items-center">
                        <div className="text-[#1d0828] hover:text-white hover:bg-[#1d0828] border-2 border-[#1d0828] rounded-full p-4">
                            <AiOutlineThunderbolt className="w-10 h-10" />
                        </div>
                        <p className="font-bold mt-2">Money Making</p>
                        <p className="text-slate-500 text-sm mt-2 text-center">we give the platform the best to make money</p>
                    </div>
                </div>
                <div className='w-52'>
                    <div className="mt-3 flex flex-col ml-3 justify-center items-center">
                        <div className="text-[#1d0828] hover:text-white hover:bg-[#1d0828] border-2 border-[#1d0828] rounded-full p-4">
                            <AiOutlineThunderbolt className="w-10 h-10" />
                        </div>
                        <p className="font-bold mt-2">Money Making</p>
                        <p className="text-slate-500 text-sm mt-2 text-center">we give the platform the best to make money</p>
                    </div>
                </div>
                <div className='w-52'>
                    <div className="mt-3 flex flex-col ml-3 justify-center items-center">
                        <div className="text-[#1d0828] hover:text-white hover:bg-[#1d0828] border-2 border-[#1d0828] rounded-full p-4">
                            <AiOutlineThunderbolt className="w-10 h-10" />
                        </div>
                        <p className="font-bold mt-2">Money Making</p>
                        <p className="text-slate-500 text-sm mt-2 text-center">we give the platform the best to make money</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default IntroSection