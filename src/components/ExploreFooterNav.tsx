"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', icon: 'home', href: '/' },
  { label: 'Explore', icon: 'search', href: '/explore' },
  { label: 'Universities', icon: 'school', href: '/explore#universities' },
  { label: 'Profile', icon: 'person', href: '/mentor_profile' },
];

const ExploreFooterNav = () => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
      <div className="bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl rounded-full px-6 py-3 flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className="flex flex-col items-center gap-1 group"
            >
              <span 
                className={cn(
                  "material-symbols-outlined text-2xl transition-all duration-300",
                  isActive ? "text-indigo-600 font-variation-fill" : "text-slate-400 group-hover:text-slate-600"
                )}
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span 
                className={cn(
                  "text-[10px] font-bold uppercase tracking-tighter transition-colors duration-300",
                  isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default ExploreFooterNav;
