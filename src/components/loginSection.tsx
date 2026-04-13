"use client";
console.log("COMPONENT RENDERED");
import { useState, FormEvent } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginSection({
  onSwitch,
  onSuccess,
}: {
  onSwitch: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Store JWT (basic)
      localStorage.setItem("token", data.token);

      onSuccess();
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
    console.log("FORM SUBMITTED");
  };

  return (
    <div className="space-y-6">
      {/* UI SAME */}
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <p className="text-sm text-muted-foreground">
          Sign in to continue your journey
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

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <motion.button
            type="submit"
            onClick={() => console.log("BUTTON CLICKED")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary text-primary-foreground rounded-xl py-3 flex items-center justify-center gap-2"
            >
            Sign In new
        </motion.button>
      </form>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <button onClick={onSwitch} className="text-primary hover:underline">
          Sign up
        </button>
      </p>
    </div>
  );
}