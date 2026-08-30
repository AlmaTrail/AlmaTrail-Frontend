"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import AuthForm from "./AuthForm";
import AuthSuccess from "./AuthSuccess";
import Cookies from "js-cookie";
import {
  AUTH_SESSION_EXPIRED_EVENT,
  clearStoredAuthSession,
} from "@/lib/auth-session";

const navLinks = [
  "Explore Mentors",
  "How it Works",
  "For Mentors",
  "Resources",
];

const parseJwt = (token: string) => {
  try {
    const base64Payload = token.split(".")[1];
    return JSON.parse(atob(base64Payload));
  } catch {
    return null;
  }
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [type, setType] = useState<"login" | "signup">("login");
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);

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
    const token = Cookies.get("token") || window.localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const payload = parseJwt(token);
      if (payload && Array.isArray(payload.roles)) {
        setRoles(payload.roles.map((role: string) => role.toUpperCase()));
      }
    }
  }, []);

  useEffect(() => {
    const handleAuthExpired = () => {
      setIsLoggedIn(false);
      setProfileOpen(false);
      setAuthOpen(false);
      setSuccess(false);
      setRoles([]);
    };

    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, handleAuthExpired);

    return () => {
      window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, handleAuthExpired);
    };
  }, []);

  const userHasMentorRole = roles.includes("MENTOR");
  const userHasMenteeRole = roles.includes("MENTEE");

  const accountMenu = userHasMentorRole
    ? [
        { label: "Profile", href: "/dashboard/mentor/profile" },
        { label: "Sessions", href: "/dashboard/mentor/sessions" },
        { label: "Wallet", href: "/dashboard/mentor/wallet" },
      ]
    : [
        { label: "Profile", href: "/dashboard/mentee" },
      ];

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
          <a
            href="/"
            className="font-display text-xl font-bold text-foreground tracking-tight"
          >
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

                {/* Dropdown menu */}
                {profileOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-full mt-3 w-72 rounded-[28px] border border-border bg-background shadow-2xl shadow-slate-900/10 p-4 text-sm z-50"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-on-surface-variant">
                          Account menu
                        </p>
                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {userHasMentorRole ? "Mentor" : "Mentee"}
                        </p>
                      </div>
                      <button
                        onClick={() => setProfileOpen(false)}
                        className="rounded-full p-2 text-on-surface-variant hover:bg-muted transition"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="mt-4 space-y-2">
                      {accountMenu.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="block rounded-2xl px-4 py-3 text-sm font-semibold text-on-surface hover:bg-surface-container-low transition"
                          onClick={() => setProfileOpen(false)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>

                    <div className="mt-4 border-t border-border pt-4">
                      <button
                        className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:opacity-95 transition"
                        onClick={() => {
                          clearStoredAuthSession();
                          setIsLoggedIn(false);
                          setProfileOpen(false);
                          setAuthOpen(false);
                          setSuccess(false);
                          setRoles([]);
                        }}
                      >
                        Logout
                      </button>
                    </div>
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

              {isLoggedIn ? (
                <div className="space-y-2 pt-2">
                  {accountMenu.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl border border-border px-4 py-3 text-sm font-semibold text-on-surface hover:bg-surface-container-low transition"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <button
                    className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:opacity-95 transition"
                    onClick={() => {
                      clearStoredAuthSession();
                      setIsLoggedIn(false);
                      setProfileOpen(false);
                      setAuthOpen(false);
                      setSuccess(false);
                      setRoles([]);
                      setMobileOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 pt-2">
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
              )}
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
