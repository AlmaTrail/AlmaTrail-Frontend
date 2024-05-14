'use client';

import React from 'react'

const FeatureSection = () => {
    return (
        <div className='bg-[#1d0828] p-14'>
            <div className='flex justify-center items-center'>
                <h2 className='text-center text-4xl font-bold text-white'>Perks? HUH ✨</h2>
            </div>
            <div className='mt-12'>
                <div className='grid grid-cols-7 gap-4'>
                    <div className='col-start-2 col-span-3 h-64 bg-blue-800 rounded-lg shadow-2xl'>
                        <div className='flex justify-center font-bold p-5'>
                            <h3 className='text-white text-2xl leading-relaxed'>Boss Up Your Resume: Show off your leadership, communication, and global perspective with some serious mentor cred.</h3>
                        </div>
                    </div>
                    <div className='h-64 col-span-2 bg-blue-800 rounded-lg shadow-2xl'>
                        <div className='flex justify-center font-bold p-5'>
                            <h3 className='text-white text-2xl leading-relaxed'>Level Up Your Skills: Sharpen your communication and leadership chops by guiding mentees.</h3>
                        </div>
                    </div>
                    <div className='h-64 col-start-2 col-span-2 bg-blue-800 rounded-lg shadow-2xl'>
                        <div className='flex justify-center font-bold p-5'>
                            <h3 className='text-white text-2xl leading-relaxed'>Earn a side income: Fill up your cargo pockets with some extra cash you can make by just talking to students.</h3>
                        </div>
                    </div>
                    <div className='col-start-4 col-span-3 h-64 bg-blue-800 rounded-lg shadow-2xl'>
                        <div className='flex justify-center font-bold p-5'>
                            <h3 className='text-white text-2xl leading-relaxed'>{`Fulfillment Unlocked: Experience the satisfaction of knowing your mentorship has a lasting impact on a student's life and career.`}</h3>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FeatureSection