import FooterSection from '@/components/footerSections';
import Navbar from '@/components/navbar';
import React from 'react';

const PolicyContent = [
    {
        heading: 'About',
        content: `These terms and conditions outline the rules and regulations for the use of Bluelearn Private Limited's Website, located at https://www.almatrail.com/. By accessing this website we assume you accept these terms and conditions. Do not continue to use Bluelearn if you do not agree to take all of the terms and conditions stated on this page.`
    },
    {
        heading: 'About',
        content: `These terms and conditions outline the rules and regulations for the use of Bluelearn Private Limited's Website, located at https://www.almatrail.com/. By accessing this website we assume you accept these terms and conditions. Do not continue to use Bluelearn if you do not agree to take all of the terms and conditions stated on this page.`
    },
    {
        heading: 'About',
        content: `These terms and conditions outline the rules and regulations for the use of Bluelearn Private Limited's Website, located at https://www.almatrail.com/. By accessing this website we assume you accept these terms and conditions. Do not continue to use Bluelearn if you do not agree to take all of the terms and conditions stated on this page.`,
        points: [
            'This is the main agenda',
            'The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party',
            'The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party'
        ]
    },
    {
        heading: 'About',
        content: `These terms and conditions outline the rules and regulations for the use of Bluelearn Private Limited's Website, located at https://www.almatrail.com/. By accessing this website we assume you accept these terms and conditions. Do not continue to use Bluelearn if you do not agree to take all of the terms and conditions stated on this page.`
    },
    {
        heading: 'About',
        content: `These terms and conditions outline the rules and regulations for the use of Bluelearn Private Limited's Website, located at https://www.almatrail.com/. By accessing this website we assume you accept these terms and conditions. Do not continue to use Bluelearn if you do not agree to take all of the terms and conditions stated on this page.`
    }
];

const Terms = () => {
    return (
        <div className='h-full'>
            <div className='bg-[#1d0828] flex justify-center pb-12'>
                <Navbar />
                <p className='text-white text-5xl font-gilroy-bold text-center pt-28'>Our Policies</p>
            </div>

            <div className='flex flex-col gap-2 mt-6 bg-white'>
                {PolicyContent.map((item, index) => (
                    <div className='' key={index}>
                        {
                            Object.keys(item).map((ele, index) => {
                                switch (ele) {
                                    case "heading":
                                        return <div key={index}>
                                            <p className='text-[#1d0828] text-gilroy-bold text-3xl ml-16 p-2 font-gilroy-bold'>{item[ele]}</p>
                                        </div>;
                                    case "content":
                                        return <div key={index} className='w-11/12'>
                                            <p className='text-[#1d0828] ml-16 p-2 font-gilroy-regular'>{item[ele]}</p>
                                        </div>;
                                    case 'points':
                                        return (
                                            <ul key={index} className='text-[#1d0828] ml-20 p-3 lg:w-11/12 list-disc list-outside'>
                                                {item[ele]?.map((point, idx) => (
                                                    <li className="font-gilroy-regular" key={idx}>{point}</li>
                                                ))}
                                            </ul>
                                        );
                                    default:
                                        return null;
                                }
                            })
                        }
                        {/* Add padding to the last element before the footer */}
                        {index === PolicyContent.length - 1 && (
                            <div className="pb-16" />
                        )}
                    </div>
                ))}
            </div>

            <FooterSection />
        </div>
    );
};

export default Terms;