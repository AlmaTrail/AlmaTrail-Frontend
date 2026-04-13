"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import AuthForm from "./AuthForm";
import AuthSuccess from "./AuthSuccess";

const navLinks = ["Explore Mentors", "How it Works", "For Mentors", "Resources"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [type, setType] = useState<"login" | "signup">("login");
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // ESC close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAuthOpen(false);
        setSuccess(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Check token on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => setProfileOpen(false);

    if (profileOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => window.removeEventListener("click", handleClickOutside);
  }, [profileOpen]);

  const closeModal = () => {
    setAuthOpen(false);
    setSuccess(false);
  };

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
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileOpen((prev) => !prev);
                  }}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition"
                >
                  👤
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-2 w-40 bg-background border border-border rounded-xl shadow-lg p-2 z-50"
                  >
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        setIsLoggedIn(false);
                        setProfileOpen(false);
                        window.location.reload();
                      }}
                      className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => {
                  setType("login");
                  setAuthOpen(true);
                  setSuccess(false);
                }}
              >
                Login
              </Button>
            )}
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
                {isLoggedIn ? (
                  <button
                    className="flex-1 py-2 border rounded-xl"
                    onClick={() => {
                      localStorage.removeItem("token");
                      setIsLoggedIn(false);
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <Button
                    variant="ghost"
                    className="flex-1"
                    onClick={() => {
                      setType("login");
                      setAuthOpen(true);
                      setSuccess(false);
                      setMobileOpen(false);
                    }}
                  >
                    Login
                  </Button>
                )}

                <Button
                  className="flex-1"
                  onClick={() => {
                    setType("signup");
                    setAuthOpen(true);
                    setSuccess(false);
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
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md bg-background border border-border rounded-3xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>

            {success ? (
              <AuthSuccess />
            ) : (
              <AuthForm
                type={type}
                onSwitch={() =>
                  setType((prev) => (prev === "login" ? "signup" : "login"))
                }
                onSuccess={() => {
                  setSuccess(true);
                  setIsLoggedIn(true);
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;