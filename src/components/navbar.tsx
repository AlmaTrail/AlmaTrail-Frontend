'use client';
import Link from 'next/link';
import Image from 'next/image';
// Navbar.js
import { useState } from 'react';

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import SignupSection from './signupSection';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    {
      name: 'Home',
      href: '',
    },
    {
      name: 'Benefits',
      href: '#benefits-section',
    },
    {
      name: 'Universities',
      href: '/universities',
    },
    {
      name: 'About Us',
      href: '/about',
    },
    {
      name: 'FAQ',
      href: '#faq',
    },
  ];

  return (
    <div className="bg-white rounded-full py-2 fixed top-5 z-10">
      <div className="mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mr-40 lg:mr-80">
          <Image src="/android-chrome-192x192.png" alt="AlmaTrail Logo" width={24} height={24} className="mr-2" />
          <span className="text-black bg-auto font-gilroy-bold">AlmaTrail</span>
        </div>
        <div className="hidden lg:flex lg:items-center">
          <ul className="flex space-x-6">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm font-gilroy-bold text-[#1d0828]"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex">
          {/* <Link href={'/user_signup'}>Sign Up</Link> */}
          <Dialog>
            <DialogTrigger className='py-1 px-5 ml-5 bg-[#1d0828] rounded-md text-white font-gilroy-bold shadow-sm transition duration-200 hover:bg-white hover:text-[#3b0764] border-2 border-transparent hover:border-[#3b0764]'>Sign Up</DialogTrigger>
            <DialogContent className='m-0 p-0 rounded-xl'>
              <SignupSection />
            </DialogContent>
          </Dialog>
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="h-6 w-6 cursor-pointer">
            <HamburgerMenuIcon />
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute rounded-t-lg inset-x-0 top-full mt-1 z-10 bg-white border-b border-gray-200 lg:hidden rounded-b-lg overflow-hidden">
            <ul className="flex flex-col space-y-2 p-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block py-2 px-4 text-sm font-gilroy-bold text-[#1d0828]"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <button className="w-full bg-[#1d0828] rounded-md py-2 text-white font-gilroy-bold shadow-sm transition duration-200 hover:bg-white hover:text-[#1d0828] border-2 border-transparent hover:border-[#1d0828]">
              <Link href={'/user_signup'}>Sign up</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
