"use client";

import { useState, FormEvent } from "react";
import {
  Mail,
  Phone,
  Building,
  BookOpen,
  MapPin,
  Zap,
  Link as LinkIcon,
  AlertCircle,
  DollarSign,
  ChevronDown,
} from "lucide-react";

interface MentorApplicationFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

const yearOptions = Array.from({ length: 10 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return year.toString();
});

export default function MentorApplicationForm({
  onClose,
  onSuccess,
}: MentorApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    currentUniversity: "",
    course: "",
    yearPassout: new Date().getFullYear().toString(),
    linkedinProfile: "",
    countryStudying: "",
    canProvideProof: "Yes",
    whyMentor: "",
    expectedPrice: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.whatsapp ||
      !formData.currentUniversity ||
      !formData.course ||
      !formData.countryStudying ||
      !formData.whyMentor ||
      !formData.expectedPrice
    ) {
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

    if (
      isNaN(Number(formData.expectedPrice)) ||
      Number(formData.expectedPrice) <= 0
    ) {
      setError("Please enter a valid price");
      return;
    }

    if (
      formData.linkedinProfile &&
      !formData.linkedinProfile.includes("linkedin.com")
    ) {
      setError("Please enter a valid LinkedIn URL");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "mentor",
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          currentUniversity: formData.currentUniversity,
          course: formData.course,
          yearPassout: formData.yearPassout,
          linkedinProfile: formData.linkedinProfile,
          countryStudying: formData.countryStudying,
          canProvideProof: formData.canProvideProof,
          whyMentor: formData.whyMentor,
          expectedPrice: formData.expectedPrice,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Submission failed");
      }

      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Become a Mentor
        </h2>
        <p className="text-sm text-muted-foreground">
          Join our community and guide the next generation
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
      >
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

        {/* Current University */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            Current/ Passed University *
          </label>
          <div className="relative">
            <Building
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"
              size={18}
            />
            <input
              type="text"
              name="currentUniversity"
              required
              value={formData.currentUniversity}
              onChange={handleChange}
              placeholder="Stanford University"
              className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
        </div>

        {/* Course */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            Course with Major *
          </label>
          <div className="relative">
            <BookOpen
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"
              size={18}
            />
            <input
              type="text"
              name="course"
              required
              value={formData.course}
              onChange={handleChange}
              placeholder="MS Computer Science"
              className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
        </div>

        {/* Year of Passout */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            Year (Passout)
          </label>
          <div className="relative">
            <ChevronDown
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none"
              size={18}
            />
            <input
              type="number"
              name="yearPassout"
              value={formData.yearPassout}
              onChange={handleChange}
              placeholder="2024"
              min="1990"
              max={new Date().getFullYear() + 5}
              className="w-full bg-background border border-border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
        </div>

        {/* LinkedIn Profile */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            LinkedIn Profile
          </label>
          <div className="relative">
            <LinkIcon
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"
              size={18}
            />
            <input
              type="url"
              name="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
        </div>

        {/* Country Studying In */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            Country Studying In *
          </label>
          <div className="relative">
            <MapPin
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"
              size={18}
            />
            <input
              type="text"
              name="countryStudying"
              required
              value={formData.countryStudying}
              onChange={handleChange}
              placeholder="USA"
              className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
          </div>
        </div>

        {/* Can You Provide Proof */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            Can You Provide Proof?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="canProvideProof"
                value="Yes"
                checked={formData.canProvideProof === "Yes"}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="canProvideProof"
                value="No"
                checked={formData.canProvideProof === "No"}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm">No</span>
            </label>
          </div>
        </div>

        {/* Why Mentor */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            Why Do You Want to Mentor? *
          </label>
          <textarea
            name="whyMentor"
            required
            value={formData.whyMentor}
            onChange={handleChange}
            placeholder="Tell us why you're passionate about mentoring..."
            rows={3}
            className="w-full bg-background border border-border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none"
          />
        </div>

        {/* Expected Price */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase text-muted-foreground ml-1">
            Expected Price Per Session *
          </label>
          <div className="relative">
            <DollarSign
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/60"
              size={18}
            />
            <input
              type="number"
              name="expectedPrice"
              required
              value={formData.expectedPrice}
              onChange={handleChange}
              placeholder="50"
              min="0"
              step="1"
              className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
            />
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
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
