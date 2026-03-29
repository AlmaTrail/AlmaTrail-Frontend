import { useState } from "react";
import { Plus, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface TimeSlot {
  start: string;
  end: string;
}

export interface WeeklySchedule {
  [day: string]: TimeSlot[];
}

interface SchedulePickerProps {
  schedule: WeeklySchedule;
  onChange: (schedule: WeeklySchedule) => void;
}

const SchedulePicker = ({ schedule, onChange }: SchedulePickerProps) => {
  const addSlot = (day: string) => {
    const current = schedule[day] || [];
    onChange({
      ...schedule,
      [day]: [...current, { start: "09:00", end: "10:00" }],
    });
  };

  const removeSlot = (day: string, index: number) => {
    const current = [...(schedule[day] || [])];
    current.splice(index, 1);
    onChange({ ...schedule, [day]: current });
  };

  const updateSlot = (day: string, index: number, field: "start" | "end", value: string) => {
    const current = [...(schedule[day] || [])];
    current[index] = { ...current[index], [field]: value };
    onChange({ ...schedule, [day]: current });
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <Clock className="w-4 h-4 text-primary" />
        Weekly Availability
      </label>
      <div className="space-y-2">
        {DAYS.map((day) => {
          const slots = schedule[day] || [];
          return (
            <div
              key={day}
              className="bg-card border border-border rounded-lg p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium w-24">{day}</span>
                <div className="flex-1">
                  <AnimatePresence>
                    {slots.length === 0 && (
                      <span className="text-xs text-muted-foreground">No slots</span>
                    )}
                    {slots.map((slot, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 mb-1"
                      >
                        <input
                          type="time"
                          value={slot.start}
                          onChange={(e) => updateSlot(day, i, "start", e.target.value)}
                          className="bg-muted border border-input rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <span className="text-muted-foreground text-xs">to</span>
                        <input
                          type="time"
                          value={slot.end}
                          onChange={(e) => updateSlot(day, i, "end", e.target.value)}
                          className="bg-muted border border-input rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <button
                          type="button"
                          onClick={() => removeSlot(day, i)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0"
                  onClick={() => addSlot(day)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SchedulePicker;
