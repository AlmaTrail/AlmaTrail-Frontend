"use client";

import { useState, FormEvent } from "react";
import { Mail, Phone, Target, AlertCircle, ChevronDown } from "lucide-react";

interface WaitlistFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const challengeOptions = [
  "Shortlisting universities",
  "SOP / LOR",
  "Visa process",
  "Budget / cost",
  "Not sure where to start",
  "All of the above",
];

const intakeOptions = [
  "Fall 2026",
  "Spring 2027",
  "Summer 2027",
  "Fall 2027",
  "Spring 2028",
  "Summer 2028",
];

export default function WaitlistForm({
  onClose,
  onSuccess,
}: WaitlistFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    targetCountry: "",
    targetIntake: "Fall 2026",
    biggestChallenge: "Not sure where to start",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.whatsapp) {
      setError("Please fill in all required fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!/^\d{10,}$/.test(formData.whatsapp.replace(/\D/g, ""))) {
      setError("Please enter a valid WhatsApp number");
      return;
    }

    setLoading(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzRthk6Rb_g6WJ4o_CickSt-C-K487YhKVhpPwWThGcbqrWG8hokEenN5mvm_G7h_bE/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "student",
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            targetCountry: formData.targetCountry,
            targetIntake: formData.targetIntake,
            biggestChallenge: formData.biggestChallenge,
          }),
        },
      );

      // 🔥 DO NOT read response
      onSuccess();
    } catch (err) {
      setError("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Join the Waitlist
        </h2>
        <p className="text-sm text-muted-foreground">
          Be the first to get access to our mentorship platform
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full bg-background border border-border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            Email *
          </label>
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"
              size={18}
            />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            WhatsApp Number *
          </label>
          <div className="relative">
            <Phone
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"
              size={18}
            />
            <input
              type="tel"
              name="whatsapp"
              required
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
        </div>

        {/* Target Country */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            Target Country
          </label>
          <input
            type="text"
            name="targetCountry"
            required
            value={formData.targetCountry}
            onChange={handleChange}
            placeholder="e.g. Germany, USA, Canada"
            className="w-full bg-background border border-border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
        </div>

        {/* Target Intake */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            Target Intake
          </label>
          <div className="relative">
            <Target
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"
              size={18}
            />
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none"
              size={18}
            />
            <select
              name="targetIntake"
              value={formData.targetIntake}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/30 transition appearance-none cursor-pointer"
            >
              {intakeOptions.map((intake) => (
                <option key={intake} value={intake}>
                  {intake}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Biggest Challenge */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            Biggest Challenge
          </label>
          <div className="relative">
            <AlertCircle
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"
              size={18}
            />
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none"
              size={18}
            />
            <select
              name="biggestChallenge"
              value={formData.biggestChallenge}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/30 transition appearance-none cursor-pointer"
            >
              {challengeOptions.map((challenge) => (
                <option key={challenge} value={challenge}>
                  {challenge}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-4 sticky bottom-0 bg-background">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-border rounded-xl font-semibold text-sm hover:bg-muted transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Joining..." : "Join Waitlist"}
          </button>
        </div>
      </form>
    </div>
  );
}
