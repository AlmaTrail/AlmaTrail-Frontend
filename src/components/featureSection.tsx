'use client';

import { HoverEffect } from "../components/ui/card-hover-effect";

const FeatureSection = () => {
    const projects = [
        {
            title: "Monetary Compensation",
            description:
                "Earn money for your time and expertise by helping others achieve their academic and career goals.",
            link: "",
        },
        {
            title: "Flexible Schedule",
            description:
                "Enjoy the flexibility to set your own schedule and choose mentoring sessions that fit around your personal and academic commitments.",
            link: "",
        },
        {
            title: "Alumni Connections",
            description:
                " Build connections with alumni and other professionals from your dream college, providing additional networking and career opportunities.",
            link: "",
        },
        {
            title: "Personal Satisfaction and Fulfillment",
            description:
                "Experience the rewarding feeling of making a positive impact on someone else's journey and helping them reach their dream college.",
            link: "",
        },
    ];
    return (
        <div className="bg-[#1d0828] p-14">
            <div className='flex justify-center items-center'>
                <h2 className='text-center text-4xl font-gilroy-bold text-white'>Perks? HUH ✨</h2>
            </div>
            <div className="max-w-5xl mx-auto px-8">
                <HoverEffect items={projects} />
            </div>
        </div>

    );
}


export default FeatureSection;