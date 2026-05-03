"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { addDays, startOfToday, format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarCard() {
  const today = startOfToday();
  const maxDate = addDays(today, 30);

  const [selected, setSelected] = useState<Date | undefined>(today);

  return (
    <div className="bg-surface-container-low p-5 rounded-2xl w-full">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-2">
        <h3 className="text-base font-semibold text-on-surface">Select Date</h3>
      </div>

      {/* Calendar */}
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        fromDate={today}
        toDate={maxDate}
        fixedWeeks
        captionLayout="buttons"
        className="mx-auto max-w-sm"
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
      {selected && (
        <p className="mt-3 text-sm text-muted-foreground text-center">
          Selected: {format(selected, "EEE, MMM d yyyy")}
        </p>
      )}
    </div>
  );
}
