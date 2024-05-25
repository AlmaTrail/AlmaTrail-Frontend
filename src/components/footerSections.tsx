"use client";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter, AiFillYoutube, AiFillLinkedin, AiOutlineInstagram } from "react-icons/ai";
import { BiLogoPinterestAlt } from "react-icons/bi";

const FooterSection = () => {
    const iconsTab = [
        { icon: <FaFacebookF /> },
        { icon: <AiFillLinkedin /> },
        { icon: <AiOutlineInstagram /> },
        { icon: <AiFillYoutube /> },
    ];
    return (
        <>
            <footer className="bg-black shadow-lg">
                <div className="container mx-auto  pt-[2rem] pb-4">
                    <div className="flex justify-between flex-row items-start md:gap-[5rem] text-left">
                        <div className="flex flex-col w-1/2 p-0 gap-6">
                            <h1 className="text-6xl sm:text-4xl text-white font-gilroy-semibold">AlmaTrail</h1>
                            <p className="text-[15px] font-medium text-white font-gilroy-semibold">
                                Make your dreams come true
                            </p>
                            <div className="flex gap-7 sm:gap-4 text-[18px] text-[#646464] justify-start">
                                {iconsTab.map(({ icon }, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="text-2xl bg-[#efefef] p-2 rounded-full hover:bg-purple-950 hover:text-white"
                                            style={{ transition: "all 0.3s" }}
                                        >
                                            {icon}
                                        </div>
                                    );
                                })}
                            </div>
                            <p className="text-[16px] font-medium text-white font-gilroy-semibold">
                                Privacy Policy | © {new Date().getFullYear()} AlmaTrail <br />{" "}
                            </p>
                        </div>

                        <div className="flex flex-col gap-5 relative sm:hidden">
                            <p className="text-[16px] text-white font-gilroy-semibold">About Us</p>

                            <p className="text-[16px] text-white font-gilroy-semibold">
                                Mentor Registration
                            </p>

                            <p className="text-[16px] text-white font-gilroy-semibold">
                                Feedback
                            </p>
                            <p className="text-[16px] text-white font-gilroy-semibold">
                                Universities
                            </p>

                        </div>
                        <div className="flex flex-col gap-5 relative sm:ml-16">
                            <p className="text-[16px]  text-white font-gilroy-semibold">About Us</p>


                            <p className="text-[16px]  text-white font-gilroy-semibold">
                                Mentor Registration
                            </p>

                            <p className="text-[16px] text-white font-gilroy-semibold">
                                Feedback
                            </p>
                            <p className="text-[16px] text-white font-gilroy-semibold">
                                Privacy
                            </p>

                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default FooterSection;
