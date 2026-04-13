"use client";

import { useState, FormEvent } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupSection({
  onSwitch,
  onSuccess,
}: {
  onSwitch: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_SIGNUP_ENDPOINT!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // ✅ optional: auto-login after signup
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
    console.log("FORM SUBMITTED");
  };

  return (
    <div className="space-y-6">
      {/* UI SAME */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Create your account</h2>
        <p className="text-sm text-muted-foreground">
          Start connecting with mentors
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2" size={18} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl py-3 pl-12 pr-4"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2" size={18} />
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl py-3 pl-12 pr-4"
          />
        </div>

        {/* Confirm */}
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2" size={18} />
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-xl py-3 pl-12 pr-4"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary text-primary-foreground rounded-xl py-3 flex items-center justify-center gap-2"
        >
          {loading ? "Creating..." : "Create Account"}
          <ArrowRight size={18} />
        </motion.button>
      </form>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <button onClick={onSwitch} className="text-primary hover:underline">
          Sign in
        </button>
      </p>
    </div>
  );
}