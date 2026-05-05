"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <a
            href="/"
            className="font-display text-xl font-bold text-foreground tracking-tight"
          >
            Almatrail
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", href: "/" },
              { label: "How It Works", href: "/#journey" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA - Removed for Pre-Release */}
          <div className="hidden md:flex items-center gap-3">
            {/* Auth removed for pre-release */}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-border bg-background px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "How It Works", href: "/#journey" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" }
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>


    </>
  );
};

export default Navbar;
