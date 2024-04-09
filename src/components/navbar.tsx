'use client';
import Link from 'next/link';
// Navbar.js
import { useState } from 'react';
import { CiMenuFries } from "react-icons/ci";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    {
      name: 'Home',
      href: '#',
    },
    {
      name: 'Universities',
      href: '#',
    },
    {
      name: 'Join us a Mentor?',
      href: '#',
    },
    {
      name: 'About Us',
      href: '#',
    },
    {
      name: 'Contact',
      href: '#',
    },
  ];

  return (
    <div className="bg-white rounded-full py-2 fixed top-5 z-10">
      <div className="mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mr-40 lg:mr-80">
          <span className="text-white bg-auto bg-[#3b0764] font-bold">Alma</span>
          <span className="text-[#3b0764] font-bold">Trail</span>
        </div>
        <div className="hidden lg:flex lg:items-center">
          <ul className="flex space-x-6">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm font-semibold text-gray-800 hover:text-gray-900"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex">
          <button className="py-1 px-5 ml-5 bg-[#3b0764] rounded-md text-white font-semibold shadow-sm transition duration-200 hover:bg-white hover:text-[#3b0764] border-2 border-transparent hover:border-[#3b0764]">
          <Link href={'/user_signup'}>Sign Up</Link>
          </button>
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="h-6 w-6 cursor-pointer">
          <CiMenuFries />
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute rounded-t-lg inset-x-0 top-full mt-1 z-50 bg-white border-b border-gray-200 lg:hidden rounded-b-lg overflow-hidden">
            <ul className="flex flex-col space-y-2 p-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block py-2 px-4 text-sm font-semibold text-gray-800 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <button className="w-full bg-[#3b0764] rounded-md py-2 text-white font-semibold shadow-sm transition duration-200 hover:bg-white hover:text-[#3b0764] border-2 border-transparent hover:border-[#3b0764]">
            <Link href={'/user_signup'}>Sign Up</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
