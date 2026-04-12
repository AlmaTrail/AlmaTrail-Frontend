"use client";

import { useState, FormEvent } from "react";
import { Mail, Lock, ArrowRight, Github } from "lucide-react";
import { motion } from "framer-motion";

interface AuthFormProps {
  type: "login" | "signup";
  onSwitch: () => void;
}

export default function AuthForm({ type, onSwitch }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // ✅ Validation (only for signup)
    if (type === "signup" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      if (type === "login") {
        // 👉 Replace with your login API
        console.log("LOGIN:", { email, password });

      } else {
        // 👉 Replace with your signup API
        console.log("SIGNUP:", { email, password, confirmPassword });
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Heading */}
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          {type === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {type === "login"
            ? "Sign in to continue your journey"
            : "Start connecting with mentors"}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@example.com"
              className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
        </div>

        {/* Confirm Password (only signup) */}
        {type === "signup" && (
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60" size={18} />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
              />
            </div>
          </div>
        )}

        {/* Forgot */}
        {type === "login" && (
          <div className="flex justify-end">
            <button type="button" className="text-sm text-primary hover:underline">
              Forgot password?
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        {/* Submit */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          {type === "login" ? "Sign In" : "Create Account"}
          <ArrowRight size={18} />
        </motion.button>
      </form>

      {/* Divider */}
      <div className="relative py-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-3 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 py-2 border border-border rounded-xl hover:bg-muted transition text-sm">
          <img src="https://www.google.com/favicon.ico" className="w-4 h-4" />
          Google
        </button>

        <button className="flex items-center justify-center gap-2 py-2 border border-border rounded-xl hover:bg-muted transition text-sm">
          <Github className="w-4 h-4" />
          GitHub
        </button>
      </div>

      {/* Switch */}
      <p className="text-center text-sm text-muted-foreground">
        {type === "login"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <button
          onClick={onSwitch}
          className="text-primary font-medium hover:underline"
        >
          {type === "login" ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
}