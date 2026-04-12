// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Menu, X } from "lucide-react";

// const navLinks = ["Explore Mentors", "How it Works", "For Mentors", "Resources"];

// const Navbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
//         <a href="/" className="font-display text-xl font-bold text-foreground tracking-tight">
//           Almatrail
//         </a>

//         <div className="hidden md:flex lg:flex items-center gap-8">
//           {navLinks.map((link) => (
//             <a
//               key={link}
//               href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
//               className="text-sm font-medium text-text-secondary transition-colors hover:text-foreground"
//             >
//               {link}
//             </a>
//           ))}
//         </div>

//         <div className="hidden md:flex lg:flex items-center gap-3">
//           <Button variant="default" size="default">Login</Button>
//         </div>

//         <button
//           className="md:hidden text-foreground"
//           onClick={() => setMobileOpen(!mobileOpen)}
//         >
//           {mobileOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {mobileOpen && (
//         <div className="border-t border-border bg-background px-4 py-4 md:hidden">
//           <div className="flex flex-col gap-3">
//             {navLinks.map((link) => (
//               <a
//                 key={link}
//                 href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
//                 className="text-sm font-medium text-text-secondary py-2"
//                 onClick={() => setMobileOpen(false)}
//               >
//                 {link}
//               </a>
//             ))}
//             <div className="flex gap-3 pt-2">
//               <Button variant="ghost" size="sm" className="flex-1">Login</Button>
//               <Button variant="default" size="sm" className="flex-1">Get Started</Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import AuthForm from "./AuthForm"; // adjust path if needed

const navLinks = ["Explore Mentors", "How it Works", "For Mentors", "Resources"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [type, setType] = useState<"login" | "signup">("login");

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAuthOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
          
          {/* Logo */}
          <a href="/" className="font-display text-xl font-bold text-foreground tracking-tight">
            Almatrail
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={() => {
                setType("login");
                setAuthOpen(true);
              }}
            >
              Login
            </Button>
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
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-medium text-muted-foreground py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </a>
              ))}

              <div className="flex gap-3 pt-2">
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => {
                    setType("login");
                    setAuthOpen(true);
                    setMobileOpen(false);
                  }}
                >
                  Login
                </Button>

                <Button
                  className="flex-1"
                  onClick={() => {
                    setType("signup");
                    setAuthOpen(true);
                    setMobileOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      {authOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setAuthOpen(false)}
        >
          <div
            className="w-full max-w-md bg-background border border-border rounded-3xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setAuthOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>

            {/* Form */}
            <AuthForm
              type={type}
              onSwitch={() =>
                setType((prev) => (prev === "login" ? "signup" : "login"))
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
