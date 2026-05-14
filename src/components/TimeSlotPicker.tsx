"use client";

import { CheckCircle2, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { format } from "date-fns";

interface TimeSlot {
  start: string;
  end: string;
}

interface TimeSlotPickerProps {
  mentorId: number;
  schedule: {
    [key: string]: TimeSlot[];
  };
  selectedDate: Date | null;
  prices: {
    halfHour: number;
    oneHour: number;
  };
}

const dayMap: { [key: string]: string } = {
  "0": "SUNDAY",
  "1": "MONDAY",
  "2": "TUESDAY",
  "3": "WEDNESDAY",
  "4": "THURSDAY",
  "5": "FRIDAY",
  "6": "SATURDAY"
};

interface GeneratedSlot {
  id: string;
  start: string;
  end: string;
  duration: 30 | 60;
}

export default function TimeSlotPicker({ mentorId, schedule, selectedDate, prices }: TimeSlotPickerProps) {
  const [duration, setDuration] = useState<30 | 60>(30);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  // Generate slots based on selected date and duration
  const availableSlots = useMemo(() => {
    if (!selectedDate || !schedule) return [];

    const dayName = dayMap[selectedDate.getDay().toString()];
    const daySlots = schedule[dayName];

    if (!daySlots || daySlots.length === 0) return [];

    const generated: GeneratedSlot[] = [];

    daySlots.forEach((slot) => {
      const startTime = slot.start.split(":"); // "09:00:00" -> ["09", "00", "00"]
      const endTime = slot.end.split(":");
      
      const startHours = parseInt(startTime[0]);
      const startMins = parseInt(startTime[1]);
      const endHours = parseInt(endTime[0]);
      const endMins = parseInt(endTime[1]);

      // Calculate total minutes for this slot
      const slotStartMins = startHours * 60 + startMins;
      const slotEndMins = endHours * 60 + endMins;
      const slotDurationMins = slotEndMins - slotStartMins;

      // Generate 30-min and 60-min slots
      if (slotDurationMins >= 30) {
        // 30-min slots
        for (let i = slotStartMins; i + 30 <= slotEndMins; i += 30) {
          const hh = Math.floor(i / 60);
          const mm = i % 60;
          const endHh = Math.floor((i + 30) / 60);
          const endMm = (i + 30) % 60;

          generated.push({
            id: `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}-30`,
            start: `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`,
            end: `${String(endHh).padStart(2, "0")}:${String(endMm).padStart(2, "0")}:00`,
            duration: 30,
          });
        }
      }

      if (slotDurationMins >= 60) {
        // 60-min slots
        for (let i = slotStartMins; i + 60 <= slotEndMins; i += 60) {
          const hh = Math.floor(i / 60);
          const mm = i % 60;
          const endHh = Math.floor((i + 60) / 60);
          const endMm = (i + 60) % 60;

          generated.push({
            id: `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}-60`,
            start: `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00`,
            end: `${String(endHh).padStart(2, "0")}:${String(endMm).padStart(2, "0")}:00`,
            duration: 60,
          });
        }
      }
    });

    return generated;
  }, [selectedDate, schedule]);

  // Filter slots by duration
  const filteredSlots = availableSlots.filter(slot => slot.duration === duration);

  // Paginate slots (show 4 at a time)
  const slotsPerPage = 4;
  const paginatedSlots = filteredSlots.slice(scrollIndex, scrollIndex + slotsPerPage);

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleConfirmBook = () => {
    if (!selectedSlot || !selectedDate) return;

    const slot = availableSlots.find(s => s.id === selectedSlot);
    if (!slot) return;

    const sessionData = {
      mentorId,
      userId: null, // Will need to get from Cookies later
      sessionStartTime: `${format(selectedDate, "yyyy-MM-dd")}T${slot.start}`,
      sessionEndTime: `${format(selectedDate, "yyyy-MM-dd")}T${slot.end}`,
      duration,
      price: duration === 30 ? prices.halfHour : prices.oneHour,
    };

    console.log("Session Booking Data:", sessionData);
    alert("Session booked! Check console for details.");
  };

  if (!selectedDate) {
    return (
      <div className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl ambient-glow text-center text-on-surface-variant">
        <p>Please select a date from the calendar to see available slots</p>
      </div>
    );
  }

  if (filteredSlots.length === 0) {
    return (
      <div className="bg-surface-container-lowest p-8 md:p-12 rounded-2xl ambient-glow text-center text-on-surface-variant">
        <p>No {duration}-minute slots available for {format(selectedDate, "EEEE, MMM d")}</p>
      </div>
    );
  }

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
              onClick={() => {
                setDuration(d as 30 | 60);
                setScrollIndex(0);
                setSelectedSlot(null);
              }}
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
          Available Slots — {format(selectedDate, "MMM d")}
        </label>

        <div className="flex items-center gap-4">
          {scrollIndex > 0 && (
            <button
              onClick={() => setScrollIndex(Math.max(0, scrollIndex - slotsPerPage))}
              className="p-2 hover:bg-surface-container-high rounded-lg transition-all"
            >
              <ChevronLeft size={20} className="text-primary" />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            {paginatedSlots.map((slot) => {
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
                      {duration} min Session
                    </p>

                    <p
                      className={`font-headline font-bold text-lg ${
                        isSelected
                          ? "text-on-surface"
                          : "text-on-surface-variant group-hover:text-on-surface"
                      }`}
                    >
                      {formatTime(slot.start)} - {formatTime(slot.end)}
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

          {scrollIndex + slotsPerPage < filteredSlots.length && (
            <button
              onClick={() => setScrollIndex(scrollIndex + slotsPerPage)}
              className="p-2 hover:bg-surface-container-high rounded-lg transition-all"
            >
              <ChevronRight size={20} className="text-primary" />
            </button>
          )}
        </div>
      </div>

      {/* Price & Confirm */}
      <div className="pt-10 border-t border-outline-variant/15">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="text-on-surface-variant text-sm mb-1">Price</p>
            <p className="text-3xl font-bold text-on-surface">
              ${duration === 30 ? prices.halfHour : prices.oneHour}
            </p>
          </div>

          <button
            onClick={handleConfirmBook}
            disabled={!selectedSlot}
            className={`px-10 py-3 rounded-xl font-semibold text-lg transition-all ${
              selectedSlot
                ? "bg-primary text-white hover:shadow-lg hover:shadow-primary/20"
                : "bg-outline/20 text-on-surface-variant cursor-not-allowed"
            }`}
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
}