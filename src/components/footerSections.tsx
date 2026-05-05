"use client";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter, AiFillYoutube, AiFillLinkedin, AiOutlineInstagram } from "react-icons/ai";
import { BiLogoPinterestAlt } from "react-icons/bi";
import Link from "next/link";

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
                    <div className="flex flex-col md:flex-row justify-between items-start md:gap-[5rem] text-left gap-8 md:gap-0">
                        <div className="flex flex-col w-full md:w-1/2 p-0 gap-6">
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
                        </div>

                        <div className="flex flex-col gap-5 w-full md:w-auto">
                            <Link href="/privacy" className="text-[16px] text-white font-gilroy-semibold">
                                Privacy Policy
                            </Link>

                            <Link href="/terms" className="text-[16px] text-white font-gilroy-semibold">
                                Terms & Conditions
                            </Link>

                            <Link href="/contact" className="text-[16px] text-white font-gilroy-semibold">
                                Contact
                            </Link>

                            <Link href="/about" className="text-[16px] text-white font-gilroy-semibold">
                                About Us
                            </Link>
                        </div>
                    </div>
                    <div className="w-full md:w-auto text-center md:text-left">
                        <p className="text-[16px] font-medium text-white font-gilroy-semibold">
                            © {new Date().getFullYear()} AlmaTrail
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default FooterSection;
