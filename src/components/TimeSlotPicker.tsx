"use client";

import { CheckCircle2, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function TimeSlotPicker() {
  const [duration, setDuration] = useState(30);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const slots = [
    { id: 0, type: "Morning Session", time: "10:00 AM - 10:30 AM" },
    { id: 1, type: "Morning Session", time: "10:45 AM - 11:15 AM" },
    { id: 2, type: "Afternoon Session", time: "02:00 PM - 02:30 PM" },
    { id: 3, type: "Afternoon Session", time: "03:30 PM - 04:00 PM" },
  ];

  return (
    <div className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl ambient-glow">
      
      {/* Duration Toggle */}
      <div className="mb-12">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-4 block">
          Select Duration
        </label>

        <div className="flex gap-2 p-1.5 bg-surface-container-low rounded-xl w-fit">
          {[30, 60].map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`px-8 py-3 rounded-lg font-semibold text-sm transition-all ${
                duration === d
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {d} Minutes
            </button>
          ))}
        </div>
      </div>

      {/* Time Slot Grid */}
      <div className="mb-12">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-4 block">
          Available Slots — Nov 10
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {slots.map((slot) => {
            const isSelected = selectedSlot === slot.id;

            return (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot.id)}
                className={`flex items-center justify-between p-6 rounded-xl border transition-all text-left group ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-transparent bg-surface-container-low hover:bg-white hover:scale-[1.01]"
                }`}
              >
                <div>
                  <p
                    className={`text-[10px] font-bold uppercase tracking-tight mb-1 ${
                      isSelected ? "text-primary" : "text-outline/60"
                    }`}
                  >
                    {slot.type}
                  </p>

                  <p
                    className={`font-headline font-bold text-lg ${
                      isSelected
                        ? "text-on-surface"
                        : "text-on-surface-variant group-hover:text-on-surface"
                    }`}
                  >
                    {slot.time}
                  </p>
                </div>

                {isSelected ? (
                  <CheckCircle2 className="text-primary" size={24} />
                ) : (
                  <PlusCircle
                    className="text-outline/40 opacity-0 group-hover:opacity-100 transition-opacity"
                    size={24}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price & Confirm */}
      <div className="pt-10 border-t border-outline-variant/15">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Price */}
          <div>
            <p className="text-on-surface-variant text-sm mb-1 font-medium">
              Total Investment
            </p>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-headline font-extrabold text-on-surface">
                $60.00
              </span>
              <span className="text-outline text-sm font-semibold">USD</span>
            </div>
          </div>

          {/* CTA */}
          <button
            disabled={!selectedSlot}
            className="w-full md:w-auto bg-primary text-white px-10 py-5 rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group"
          >
            Confirm and Pay
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-outline text-center md:text-left leading-relaxed">
          By confirming, you agree to our{" "}
          <a
            href="#"
            className="underline hover:text-primary transition-colors"
          >
            Cancellation Policy
          </a>
          . A secure checkout link will be generated.
        </p>
      </div>
    </div>
  );
}