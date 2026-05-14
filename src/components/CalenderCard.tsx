"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { addDays, startOfToday, format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarCardProps {
  schedule: {
    [key: string]: Array<{
      start: string;
      end: string;
    }>;
  };
  onDateSelect: (date: Date | null) => void;
  selectedDate: Date | null;
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

export default function CalendarCard({ schedule, onDateSelect, selectedDate }: CalendarCardProps) {
  const today = startOfToday();
  const maxDate = addDays(today, 30);

  const isDateAvailable = (date: Date) => {
    const dayName = dayMap[date.getDay().toString()];
    return schedule && schedule[dayName] && schedule[dayName].length > 0;
  };

  return (
    <div className="bg-surface-container-low p-5 rounded-2xl w-full">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-2">
        <h3 className="text-base font-semibold text-on-surface">Select Date</h3>
      </div>

      {/* Calendar */}
      <DayPicker
        mode="single"
        selected={selectedDate || undefined}
        onSelect={(date) => onDateSelect(date || null)}
        fromDate={today}
        toDate={maxDate}
        fixedWeeks
        captionLayout="buttons"
        className="mx-auto max-w-sm"
        disabled={(date) => !isDateAvailable(date)}
        components={{
          IconLeft: (props) => <ChevronLeft {...props} size={18} />,
          IconRight: (props) => <ChevronRight {...props} size={18} />,
        }}
        classNames={{
          months: "flex justify-start",
          month: "w-full",

          caption: "flex items-center justify-between mb-2 pl-0 pr-1",
          caption_label: "text-lg font-semibold",

          nav: "flex items-center gap-1",
          nav_button:
            "h-7 w-7 flex items-center justify-center rounded-md hover:bg-muted",

          table: "w-full",

          head_row: "flex justify-between text-xs text-muted-foreground mb-1",
          head_cell: "w-10 text-center",

          row: "flex justify-between",
          cell: "w-10 h-10 flex items-center justify-center",

          day: "w-10 h-10 flex items-center justify-center rounded-full text-sm transition-all",

          day_selected:
            "!bg-primary !text-white !font-semibold hover:!bg-primary focus:!bg-primary",

          day_today: "border border-primary",

          day_disabled: "text-muted-foreground opacity-30 cursor-not-allowed",
        }}
      />

      {/* Selected Date */}
      {selectedDate && (
        <p className="mt-3 text-sm text-muted-foreground text-center">
          Selected: {format(selectedDate, "EEE, MMM d yyyy")}
        </p>
      )}
    </div>
  );
}
